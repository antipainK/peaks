import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const ENTER_KEY = 'Enter';

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
  const { register, handleSubmit, reset } = useForm();

  const handleSend = (message) => {
    onSend(message);
    reset();
  };

  const handleKeyDown = (e) => {
    if (e.key === ENTER_KEY && !e.shiftKey) {
      const submitFunction = handleSubmit(handleSend);
      submitFunction(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSend)}>
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
          onKeyDown={handleKeyDown}
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
