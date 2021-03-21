import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  pageWrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function PageWrapper(props) {
  const classes = useStyles();

  return <div className={classes.pageWrapper}>{props.children}</div>;
}
