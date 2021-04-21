import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import Loading from '../../Loading/Loading';
import Message from './Message';
import useCurrentThreadId from '../useCurrentThreadId';
import useMessagesScroll from './useMessagesScroll';

const useStyles = makeStyles(() => ({
  messagesList: {
    flex: '1 1 auto',
    overflowY: 'auto',
  },
}));

const MESSAGES_SUBSCRIPTION = gql`
  subscription messageSent($chatId: ID!) {
    messageSent(chatId: $chatId) {
      id
      user {
        id
      }
      content
      time
    }
  }
`;

const MESSAGES_QUERY = gql`
  query chat($chatId: ID!) {
    me {
      id
    }
    chat(chatId: $chatId) {
      messages {
        id
        user {
          id
        }
        content
        time
      }
    }
  }
`;

export default function MessagesCell() {
  const classes = useStyles();
  const history = useHistory();
  const currentThreadId = useCurrentThreadId();

  const { data, loading, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { chatId: currentThreadId },
    onError: () => history.push('/messages'),
  });

  const { listRef } = useMessagesScroll(
    currentThreadId,
    data?.chat?.messages,
    loading
  );

  useEffect(() => {
    if (subscribeToMore) {
      const unsubscribe = subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { chatId: currentThreadId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.messageSent;
          return {
            ...prev,
            chat: {
              messages: [...prev.chat.messages, newMessage],
            },
          };
        },
      });
      return () => unsubscribe();
    }
  }, [currentThreadId, subscribeToMore]);

  if (loading) <Loading />;

  const shapedMessages =
    data?.chat?.messages.map((message) => ({
      ...message,
      text: message.content,
      isMine: message.user.id === data?.me?.id,
      date: message.time,
    })) || [];

  return (
    <List className={classes.messagesList} ref={listRef}>
      {shapedMessages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </List>
  );
}
