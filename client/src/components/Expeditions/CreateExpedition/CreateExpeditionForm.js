import { Button, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router';

export default function CreateExpeditionForm({
  availablePeaks,
  onSubmit,
  disabled,
  apiError,
}) {
  const { register, handleSubmit, errors } = useForm({});
  const history = useHistory();

  const handleCancel = () => {
    history.push('/expeditions');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        {apiError && (
          <Grid item>
            <Alert severity="error">Wystąpił błąd formularza</Alert>
          </Grid>
        )}
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="title"
            label="Tytuł wyprawy"
            inputRef={register({
              required: 'To pole jest wymagane',
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="peakId"
            label="Zdobywany szczyt"
            inputRef={register({
              required: 'To pole jest wymagane',
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            name="date"
            label="Data wyprawy"
            inputRef={register({
              required: 'To pole jest wymagane',
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            name="maxParticipants"
            label="Maksymalna liczba uczestników"
            inputRef={register({
              required: 'To pole jest wymagane',
              min: {
                value: 1,
                message: 'Liczba uczestników musi być większa od 0',
              },
              max: {
                value: 500,
                message: 'Liczba uczestników nie może przekraczać 500',
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.maxParticipants}
            helperText={errors.maxParticipants?.message}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            multiline
            rows={3}
            rowsMax={5}
            variant="outlined"
            name="description"
            label="Opis wyprawy"
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
              Stwórz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
