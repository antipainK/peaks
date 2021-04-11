import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import useCurrentThreadId from '../useCurrentThreadId';

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

const mockNames = {
  1: 'Mateusz Benecki',
  2: 'Jonatan Kłosko',
  3: 'Wojtek Kosztyła',
  4: 'Paweł Kiełbasa',
  5: 'Mikołaj Zatorski',
};

export default function MessagesHeaderCell() {
  const classes = useStyles();
  const currentThreadId = useCurrentThreadId();

  const name = mockNames[currentThreadId]; // TODO: Get this from API
  return (
    <Grid item className={classes.messagesHeader}>
      <Typography component="h2" variant="h4">
        {name}
      </Typography>
    </Grid>
  );
}
