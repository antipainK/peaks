import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  messagesHeader: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(8),
      padding: theme.spacing(1.5, 3),
    },
  },
}));

export default function MessagesHeaderCell({ name }) {
  const classes = useStyles();
  return (
    <Grid item className={classes.messagesHeader}>
      <Typography component="h2" variant="h4">
        {name}
      </Typography>
    </Grid>
  );
}
