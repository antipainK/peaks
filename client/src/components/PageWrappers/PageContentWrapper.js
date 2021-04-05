import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LEFT_MENU_WIDTH } from '../../utils/const';

const useStyles = makeStyles((theme) => ({
  pageContentWrapper: (props) => ({
    maxHeight: `calc(100% - ${theme.spacing(7)}px)`,
    flex: '1 1 auto',
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up('sm')]: {
      marginLeft: props.isAuth ? LEFT_MENU_WIDTH : 0,
      maxHeight: `calc(100% - ${theme.spacing(8)}px)`,
    },
  }),
}));

export default function PageContentWrapper(props) {
  const classes = useStyles(props);

  return <div className={classes.pageContentWrapper}>{props.children}</div>;
}
