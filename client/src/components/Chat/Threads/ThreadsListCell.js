import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ThreadListItem from './ThreadListItem';
import AddThreadItem from './AddThreadItem';

const useStyles = makeStyles((theme) => ({
  threadsList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    overflow: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: 57,
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      borderBottom: 0,
    },
  },
}));

export default function ThreadsListCell({ threads, isLoading }) {
  const classes = useStyles();

  return (
    <List className={classes.threadsList}>
      <AddThreadItem />
      {isLoading && <LoadingState />}
      {!isLoading && threads.length === 0 ? (
        <EmptyState />
      ) : (
        threads.map((thread) => (
          <ThreadListItem
            key={thread.id}
            href={`/messages/thread/${thread.id}`}
            userName={thread.name}
            isActive={thread.isActive}
            isUnread={thread.isUnread}
          />
        ))
      )}
    </List>
  );
}

const LoadingState = () =>
  Array(3).fill(
    <ListItem>
      <Skeleton>
        <Avatar />
      </Skeleton>
    </ListItem>
  );
const EmptyState = () => <ListItem>Brak dostępnych konwersacji</ListItem>;
