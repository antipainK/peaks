import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import UserAvatar from '../../UserAvatar/UserAvatar';

const useStyles = makeStyles((theme) => ({
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
  href,
}) {
  const classes = useStyles({ isUnread, isActive });
  return (
    <ListItem
      button
      selected={isActive}
      onClick={onClick}
      className={classes.listItem}
      component={RouterLink}
      to={href}
    >
      <Hidden lgUp>
        <UserAvatar displayName={userName} />
      </Hidden>
      <Hidden mdDown>
        <ListItemAvatar>
          <UserAvatar displayName={userName} />
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
