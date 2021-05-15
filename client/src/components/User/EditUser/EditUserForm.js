import { Button, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { apolloErrorToMessage } from '../../../utils/errors';

function EditUserForm({ initialValue, onSubmit, disabled, apiError }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialValue,
  });
  const history = useHistory();

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        {apiError && (
          <Grid item>
            <Alert severity="error">{apolloErrorToMessage(apiError)}</Alert>
          </Grid>
        )}
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="displayName"
            label="Nazwa wyświetlana"
            inputRef={register({
              required: 'To pole jest wymagane',
            })}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="email"
            label="Email"
            inputRef={register}
            disabled={true}
            helperText="Ten email pochodzi z Twojego konta Google"
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="city"
            label="Miasto"
            inputRef={register}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            name="contact"
            label="Kontakt"
            inputRef={register}
            disabled={disabled}
          />
        </Grid>
        <Grid item container justify="center" spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              disabled={disabled}
              onClick={handleCancel}
            >
              Anuluj
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              disabled={disabled}
            >
              Zapisz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditUserForm;
