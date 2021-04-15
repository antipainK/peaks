import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useQuery } from '@apollo/client';
import ThreadSearchCell from './ThreadSearchCell';
import ThreadsListCell from './ThreadsListCell';
import useCurrentThreadId from '../useCurrentThreadId';
import { THREADS_QUERY } from '../sharedQueries';
import getSecondUserName from '../getSecondUserName';

const useStyles = makeStyles((theme) => ({
  threadsSection: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'default',
      borderRight: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: 'auto',
    },
  },
}));

export default function ThreadsSection() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const currentThreadId = useCurrentThreadId();
  const { data, loading, error } = useQuery(THREADS_QUERY);

  const threads = loading ? [] : data.me.chats;

  const filteredThreads = threads.filter((thread) =>
    thread.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const shapedThread = filteredThreads.map((thread) => ({
    ...thread,
    name: getSecondUserName(thread.name, data.me.displayName),
    isActive: thread.id === currentThreadId,
  }));

  return (
    <Grid item xs={12} lg={3} className={classes.threadsSection}>
      <ThreadSearchCell value={searchQuery} onSearch={setSearchQuery} />
      {error && (
        <Alert severity="error">Wystąpił błąd wczytywania konwersacji</Alert>
      )}
      <ThreadsListCell threads={shapedThread} isLoading={loading} />
    </Grid>
  );
}
