import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import MessagesHeaderCell from './MessagesHeaderCell';
import MessagesCell from './MessagesCell';
import SendMessageCell from './SendMessageCell';

const useStyles = makeStyles(() => ({
  conversationSection: {
    flexWrap: 'noWrap',
    overflow: 'hidden',
  },
}));

export default function ConversationSection() {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      lg={9}
      container
      direction="column"
      className={classes.conversationSection}
    >
      <MessagesHeaderCell name="Scrum Master" />
      <Divider />
      <MessagesCell />
      <Divider />
      {/* eslint-disable-next-line no-console */}
      <SendMessageCell onSend={(formData) => console.log(formData)} />
    </Grid>
  );
}
