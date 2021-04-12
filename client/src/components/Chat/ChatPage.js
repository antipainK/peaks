import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import ThreadsSection from './Threads/ThreadsSection';
import ConversationSection from './Conversation/ConversationSection';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
}));

export default function ChatPage() {
  const classes = useStyles();

  return (
    <Grid container component={Paper} className={classes.root}>
      <ThreadsSection />
      <ConversationSection />
    </Grid>
  );
}
