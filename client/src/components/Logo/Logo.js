import React from 'react';
import { Typography } from '@material-ui/core';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // TODO: set some nice font family for the logo
  },
  logoIcon: {
    verticalAlign: 'text-bottom',
    margin: theme.spacing(0, 0.5),
  },
}));

export default function Logo(props) {
  const classes = useStyles();

  return (
    <Typography {...props} className={classes.root}>
      Peaks
      <FilterHdrIcon
        color="inherit"
        fontSize="inherit"
        className={classes.logoIcon}
      />
    </Typography>
  );
}
