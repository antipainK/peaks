import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { formatRelative } from 'date-fns';
import pl from 'date-fns/locale/pl';

const useStyles = makeStyles((theme) => ({
  messageText: {
    width: 'fit-content',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1, 1, 1, 0),
  },
  mineMessageText: {
    width: 'fit-content',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1, 1, 0),
    textAlign: 'left',
  },
  messageDate: {
    marginTop: theme.spacing(1),
  },
}));

export default function Message({ text, date, isMine, disableGutters }) {
  const classes = useStyles();

  return (
    <ListItem disableGutters={disableGutters}>
      <ListItemText
        align={isMine ? 'right' : 'left'}
        primary={
          <div
            className={isMine ? classes.mineMessageText : classes.messageText}
          >
            {text}
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
