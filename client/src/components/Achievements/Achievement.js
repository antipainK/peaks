import React from 'react';
import { Grid, Typography, Box, makeStyles } from '@material-ui/core';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

const useStyles = makeStyles((theme) => ({
  achievement: {
    width: 100,
    height: 100,
    padding: theme.spacing(1),
    border: ({ achieved }) =>
      `${theme.spacing(1)}px solid ${
        achieved ? theme.palette.primary.main : theme.palette.grey[400]
      }`,
    color: ({ achieved }) => (achieved ? 'inherit' : theme.palette.grey[400]),
    borderRadius: '50%',
  },
}));

export default function Achievement({ achieved, title }) {
  const classes = useStyles({ achieved });

  return (
    <Grid container direction="column" wrap="nowrap" alignItems="center">
      <FilterHdrIcon fontSize="large" className={classes.achievement} />
      <Typography align="center" variant="subtitle2">
        <Box color={achieved ? 'text.primary' : 'text.secondary'}>{title}</Box>
      </Typography>
    </Grid>
  );
}
