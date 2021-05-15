import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router';
import { uploadUrl } from '../../utils/const';
import { getLocation } from '../../utils/geolocation';
import UploadField from './UploadField';
import { apolloErrorToMessage } from '../../utils/errors';

const UploadForm = ({ apiError, disabled, onSubmit }) => {
  const { register, control, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const formDisabled = disabled || !location;

  useEffect(() => {
    getLocation()
      .then((location) => setLocation(location))
      .catch((err) => setError('Nie udało się pobrać pozycji'));
  }, []);

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

  const handleValidSubmit = (data) => {
    onSubmit({ ...data, ...location });
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <Grid container direction="column" spacing={2}>
        {error && (
          <Grid item>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {apiError && (
          <Grid item>
            <Alert severity="error">{apolloErrorToMessage(apiError)}</Alert>
          </Grid>
        )}
        {location && (
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography>Lokalizacja zdjęcia</Typography>
              </Grid>
              <Grid item>
                <MapContainer
                  center={[location.latitude, location.longitude]}
                  zoom={12}
                  style={{ height: 200 }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[location.latitude, location.longitude]}
                  ></Marker>
                </MapContainer>
              </Grid>
            </Grid>
          </Grid>
        )}
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
                disabled={formDisabled}
              />
            )}
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
            label="Opis"
            inputRef={register}
            disabled={formDisabled}
          />
        </Grid>
        <Grid item>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={disabled}
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
                disabled={formDisabled}
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
