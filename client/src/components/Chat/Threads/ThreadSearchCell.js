import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SearchField from '../../SearchField/SearchField';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1.5),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  search: {
    backgroundColor: theme.palette.common.white,
  },
}));

export default function ThreadSearchCell({ value, onSearch }) {
  const classes = useStyles();

  return (
    <Grid item className={classes.searchContainer}>
      <SearchField value={value} onSearch={onSearch} />
    </Grid>
  );
}
