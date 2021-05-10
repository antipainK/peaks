import {
  Avatar,
  ListItemAvatar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ListItem, ListItemText } from '@material-ui/core';
import { formatRelative } from 'date-fns';
import pl from 'date-fns/locale/pl';

const useStyles = makeStyles((theme) => ({
  commentsText: {
    width: 'fit-content',
    maxWidth: 800,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
  },
  messageDate: {
    marginTop: theme.spacing(0.25),
  },
}));

export default function Comment({ text, date, author }) {
  const classes = useStyles();
  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar alt={author.displayName} src={author.photoUrl} />
      </ListItemAvatar>
      <ListItemText
        align={'left'}
        primary={
          <div>
            <Typography variant="subtitle2">{author.displayName}</Typography>
            <div className={classes.commentsText}>{text}</div>
          </div>
        }
        secondary={
          date && formatRelative(new Date(date), new Date(), { locale: pl })
        }
        secondaryTypographyProps={{
          className: classes.messageDate,
        }}
      />
    </ListItem>
  );
}
