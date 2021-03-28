import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LEFT_MENU_WIDTH } from '../../utils/const';

const useStyles = makeStyles((theme) => ({
  pageContentWrapper: (props) => ({
    [theme.breakpoints.up('sm')]: {
      marginLeft: props.isAuth ? LEFT_MENU_WIDTH : 0,
    },
    flex: '1 1 auto',
    backgroundColor: theme.palette.background.default,
  }),
}));

export default function PageContentWrapper(props) {
  const classes = useStyles(props);

  return <div className={classes.pageContentWrapper}>{props.children}</div>;
}
