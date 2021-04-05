import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ThreadSearchCell from './ThreadSearchCell';
import ThreadsListCell from './ThreadsListCell';

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
    isActive: false,
  },
  {
    id: 'essasito',
    name: 'xD2 essa',
    isUnread: true,
    isActive: false,
  },
  {
    id: 'essa2',
    name: 'Mikolaj Zatorski',
    isUnread: false,
    isActive: false,
  },
  {
    id: 'costam',
    name: 'Scrum Master',
    isUnread: false,
    isActive: true,
  },
];

export default function ThreadsSection() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState(''); // TO DO: REPLACE WITH REAL SEARCH

  const filteredThreads = mockThreads.filter((thread) =>
    thread.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <Grid item xs={12} lg={3} className={classes.threadsSection}>
      <ThreadSearchCell value={searchQuery} onSearch={setSearchQuery} />
      <ThreadsListCell threads={filteredThreads} />
    </Grid>
  );
}
