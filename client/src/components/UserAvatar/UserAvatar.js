import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import getUserInitials from '../../utils/getUserInitials';

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: indigo[400],
    color: theme.palette.primary.contrastText,
  },
}));

export default function UserAvatar({ displayName }) {
  const classes = useStyles();
  const userInitials = getUserInitials(displayName);
  return (
    <Avatar alt={userInitials} className={classes.avatar}>
      {userInitials}
    </Avatar>
  );
}
