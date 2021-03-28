import { Button, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';

function EditUserForm({ initialValue, onSubmit, disabled, apiError }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        {disabled && (
          <Grid item>
            <div>loading...</div>
          </Grid>
        )}
        {apiError && (
          <Grid item>
            <Alert severity="error">error...</Alert>
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
        <Grid item container justify="center">
          <Grid item>
            <Button
              variant="outlined"
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
