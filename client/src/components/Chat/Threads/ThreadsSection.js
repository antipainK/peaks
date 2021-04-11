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
  // TODO: GET FROM API
  {
    id: '1',
    name: 'Mateusz Benecki',
    isUnread: false,
  },
  {
    id: '2',
    name: 'Jonatan Kłosko',
    isUnread: false,
  },
  {
    id: '3',
    name: 'Wojtek Kosztyła',
    isUnread: false,
  },
  {
    id: '4',
    name: 'Paweł Kiełbasa',
    isUnread: false,
  },
  {
    id: '5',
    name: 'Mikołaj Zatorski',
    isUnread: false,
  },
];

export default function ThreadsSection() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState(''); // TODO: REPLACE WITH REAL SEARCH
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
