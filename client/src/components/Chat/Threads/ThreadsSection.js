import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ThreadSearchCell from './ThreadSearchCell';
import ThreadsListCell from './ThreadsListCell';
import useCurrentThreadId from '../useCurrentThreadId';

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

const mockThreads = [
  // TO DO: GET FROM API
  {
    id: 'essa',
    name: 'essa xD',
    isUnread: true,
  },
  {
    id: 'essasito',
    name: 'xD2 essa',
    isUnread: true,
  },
  {
    id: 'essa2',
    name: 'Mikolaj Zatorski',
    isUnread: false,
  },
  {
    id: 'costam',
    name: 'Scrum Master',
    isUnread: false,
  },
];

export default function ThreadsSection() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState(''); // TO DO: REPLACE WITH REAL SEARCH
  const currentThreadId = useCurrentThreadId();

  const filteredThreads = mockThreads.filter((thread) =>
    thread.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const shapedThread = filteredThreads.map((thread) => ({
    ...thread,
    isActive: thread.id === currentThreadId,
  }));

  return (
    <Grid item xs={12} lg={3} className={classes.threadsSection}>
      <ThreadSearchCell value={searchQuery} onSearch={setSearchQuery} />
      <ThreadsListCell threads={shapedThread} />
    </Grid>
  );
}
