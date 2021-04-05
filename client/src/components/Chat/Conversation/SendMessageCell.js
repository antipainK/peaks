import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  sendMessageCell: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  textField: {
    flex: '1 1 auto',
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function SendMessageCell({ onSend }) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSend)}>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.sendMessageCell}
      >
        <TextField
          id="send-message-input"
          className={classes.textField}
          size="small"
          multiline
          rowsMax={5}
          label="Napisz wiadomość..."
          variant="outlined"
          name="message"
          inputRef={register({
            required: true,
          })}
        />

        <Fab color="primary" aria-label="send" size="small" type="submit">
          <SendIcon />
        </Fab>
      </Grid>
    </form>
  );
}
