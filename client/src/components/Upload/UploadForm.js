import { Button, Grid } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { uploadUrl } from '../../utils/const';
import UploadField from './UploadField';

const UploadForm = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForm();
  const history = useHistory();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    try {
      const data = await response.json();

      if (data.error) throw new Error(data.error);
      return data.path;
    } catch (err) {
      throw new Error('Nie udało się dodać zdjęcia');
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Controller
            name="photoUrl"
            control={control}
            rules={{ required: 'Zdjęcie jest wymagane.' }}
            defaultValue={''}
            render={(props) => (
              <UploadField
                {...props}
                fullWidth
                variant="outlined"
                label="Zdjęcie"
                error={!!errors.photoUrl}
                helperText={errors.photoUrl?.message}
                onUpload={handleUpload}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={handleCancel}>
                Anuluj
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                type="submit"
              >
                Zapisz
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UploadForm;
