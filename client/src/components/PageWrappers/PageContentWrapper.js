import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageContentWrapper: {
    flex: '1 1 auto',
    backgroundColor: theme.palette.background.default,
  },
}));

export default function PageContentWrapper(props) {
  const classes = useStyles();

  return <div className={classes.pageContentWrapper}>{props.children}</div>;
}
