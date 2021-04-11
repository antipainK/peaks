import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import Message from './Message';
import useCurrentThreadId from '../useCurrentThreadId';

const useStyles = makeStyles(() => ({
  messagesList: {
    flex: '1 1 auto',
    overflowY: 'auto',
  },
}));

const mockMessages = [
  {
    id: '1',
    text: 'Stachu?',
    date: '9:30',
    author: 'marian',
  },
  {
    id: '2',
    text: 'Słucham',
    date: '9:31',
    author: 'essa',
  },
  {
    id: '3',
    text: 'Jest Stachu w domu?',
    date: '10:30',
    author: 'marian',
  },
  {
    id: '4',
    text: 'Stachu?',
    date: '9:30',
    author: 'marian',
  },
  {
    id: '5',
    text: 'Słucham',
    date: '9:31',
    author: 'essa',
  },
  {
    id: '6',
    text: 'Jest Stachu w domu?',
    date: '10:30',
    author: 'marian',
  },
  {
    id: '11',
    text: 'Stachu?',
    date: '9:30',
    author: 'marian',
  },
  {
    id: '12',
    text: 'Słucham',
    date: '9:31',
    author: 'essa',
  },
  {
    id: '13',
    text: 'Jest Stachu w domu?',
    date: '10:30',
    author: 'marian',
  },
  {
    id: '14',
    text: 'Stachu?',
    date: '9:30',
    author: 'marian',
  },
  {
    id: '15',
    text: 'Słucham',
    date: '9:31',
    author: 'essa',
  },
  {
    id: '16',
    text: 'Jest Stachu w domu?',
    date: '10:30',
    author: 'marian',
  },
];

export default function MessagesCell() {
  const classes = useStyles();
  const listRef = useRef();
  const currentThreadId = useCurrentThreadId();
  const messages = mockMessages; // TODO: replace with messages from API

  const scrollToBottom = () => {
    const listEl = listRef.current;
    if (listEl) {
      const scroll = listEl.scrollHeight - listEl.clientHeight;
      listEl.scrollTo(0, scroll);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentThreadId]); // TODO: consider also scrolling down to new messages

  return (
    <List className={classes.messagesList} ref={listRef}>
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          date={message.date}
          isMine={message.author === 'marian'} // TODO: replace with comparison to current user
        />
      ))}
    </List>
  );
}
