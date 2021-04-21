import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';
import MessagesHeaderCell from './MessagesHeaderCell';
import MessagesCell from './MessagesCell';
import SendMessageCell from './SendMessageCell';
import useCurrentThreadId from '../useCurrentThreadId';

const useStyles = makeStyles((theme) => ({
  conversationSection: {
    flexWrap: 'noWrap',
    overflow: 'hidden',
  },
  emptyState: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
    },
  },
}));

const ADD_MESSAGE = gql`
  mutation SentMessage($chatId: ID!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      id
    }
  }
`;

export default function ConversationSection() {
  const classes = useStyles();
  const currentThreadId = useCurrentThreadId();
  const [sendMessage] = useMutation(ADD_MESSAGE, {
    onError: () => {},
  });

  const handleSendMessage = ({ message }) => {
    sendMessage({ variables: { chatId: currentThreadId, message } });
  };

  return (
    <Grid
      item
      xs={12}
      lg={9}
      container
      direction="column"
      className={classes.conversationSection}
    >
      {!currentThreadId ? (
        <EmptyState />
      ) : (
        <>
          <MessagesHeaderCell />
          <Divider />
          <MessagesCell />
          <Divider />
          <SendMessageCell onSend={handleSendMessage} />
        </>
      )}
    </Grid>
  );
}

const EmptyState = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.emptyState} align="center" variant="h5">
      Wybierz z kim chcesz porozmawiać lub rozpocznij nową konwersację.
    </Typography>
  );
};
