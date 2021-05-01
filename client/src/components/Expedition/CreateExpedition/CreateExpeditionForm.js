import { Button, Grid, TextField, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router';
import { DateTimePicker } from '@material-ui/pickers';
import { addDays, set } from 'date-fns';

export default function CreateExpeditionForm({
  availablePeaks,
  onSubmit,
  disabled,
  apiError,
}) {
  const { control, register, handleSubmit, errors } = useForm({
    // default starting date set to next day 8:00am seems most reasonable
    defaultValues: { date: getTomorrowMorning(), peakId: '' },
  });
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
          <Controller
            as={
              <TextField
                fullWidth
                select
                variant="outlined"
                label="Zdobywany szczyt"
                error={!!errors.peakId}
                helperText={errors.peakId?.message}
                disabled={disabled}
              >
                {availablePeaks.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            }
            control={control}
            name="peakId"
            rules={{
              required: 'To pole jest wymagane',
            }}
          />
        </Grid>
        <Grid item>
          <Controller
            as={
              <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="Data wyprawy"
                ampm={false}
                format="dd MMMM yyyy, HH:mm"
                disablePast
                error={!!errors.date}
                helperText={errors.date?.message}
                disabled={disabled}
                cancelLabel="Anuluj"
              />
            }
            control={control}
            name="date"
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
              valueAsNumber: true,
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

const getTomorrowMorning = () =>
  set(addDays(new Date(), 1), {
    hours: 8,
    minutes: 0,
  });
