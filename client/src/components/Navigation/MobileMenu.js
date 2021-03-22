import React from 'react';
import { Divider, Drawer, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuContent from './MenuContent';
import { LEFT_MENU_WIDTH } from '../../utils/const';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: LEFT_MENU_WIDTH,
  },
}));

export default function MobileMenu({ isOpen, onClose }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div>
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MenuContent />
      </div>
    </Drawer>
  );
}
