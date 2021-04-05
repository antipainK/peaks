import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  messageText: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1, 1, 1, 0),
  },
  mineMessageText: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1, 1, 0),
  },
  messageDate: {
    marginTop: theme.spacing(1),
  },
}));

export default function Message({ text, date, isMine }) {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemText
        align={isMine ? 'right' : 'left'}
        primary={
          <span
            className={isMine ? classes.mineMessageText : classes.messageText}
          >
            {text}
          </span>
        }
        secondary={date}
        secondaryTypographyProps={{
          className: classes.messageDate,
        }}
      />
    </ListItem>
  );
}
