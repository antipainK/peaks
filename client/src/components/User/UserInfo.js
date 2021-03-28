import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 3),
  },
  infoHeader: {
    marginBottom: theme.spacing(1),
  },
  infoContent: {
    fontWeight: 500,
  },
}));

export default function UserInfo({ user }) {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md>
          <Typography className={classes.infoHeader}>Miasto</Typography>
          <Typography className={classes.infoContent}>{user.city}</Typography>
        </Grid>
        <Grid item xs={12} md>
          <Typography className={classes.infoHeader}>Kontakt</Typography>
          <Typography className={classes.infoContent}>
            {user.contact}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
