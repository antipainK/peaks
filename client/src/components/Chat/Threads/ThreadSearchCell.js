import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
      <TextField
        id="search-chat-users"
        value={value || ''}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Szukaj..."
        variant="outlined"
        fullWidth
        size="small"
        className={classes.search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}
