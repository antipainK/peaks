import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ThreadListItem from './ThreadListItem';

const useStyles = makeStyles((theme) => ({
  threadsList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    overflow: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      borderBottom: 0,
    },
  },
}));

export default function ThreadsListCell({ threads }) {
  const classes = useStyles();

  return (
    <List className={classes.threadsList}>
      {threads.map((thread) => (
        <ThreadListItem
          key={thread.id}
          userName={thread.name}
          isActive={thread.isActive}
          isUnread={thread.isUnread}
        />
      ))}
    </List>
  );
}
