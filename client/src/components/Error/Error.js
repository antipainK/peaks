import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import errorImage from './error.svg';
import { apolloErrorToMessage } from '../../utils/errors';

export default function Error({ error = null }) {
  const message = apolloErrorToMessage(error);

  return (
    <Box p={3} width="100%">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h5">Whoops!</Typography>
        </Grid>
        <Grid item>
          <img
            src={errorImage}
            height="300"
            alt="error"
            style={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{message}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
