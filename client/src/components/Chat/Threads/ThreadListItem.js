import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    width: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(8),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  listItemText: {
    fontWeight: (props) => (props.isUnread ? 600 : 400),
  },
  unreadIconContainer: {
    display: 'flex',
  },
}));

export default function ThreadListItem({
  userName,
  isUnread,
  isActive,
  onClick,
}) {
  const classes = useStyles({ isUnread, isActive });
  const userInitials = getInitials(userName);
  return (
    <ListItem
      button
      selected={isActive}
      onClick={onClick}
      className={classes.listItem}
    >
      <Hidden lgUp>
        <Avatar alt={userInitials} className={classes.avatar}>
          {userInitials}
        </Avatar>
      </Hidden>
      <Hidden mdDown>
        <ListItemAvatar>
          <Avatar alt={userInitials} className={classes.avatar}>
            {userInitials}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={userName}
          primaryTypographyProps={{
            className: classes.listItemText,
          }}
        />
        {isUnread && (
          <ListItemSecondaryAction className={classes.unreadIconContainer}>
            <FiberManualRecordIcon color="primary" />
          </ListItemSecondaryAction>
        )}
      </Hidden>
    </ListItem>
  );
}

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
