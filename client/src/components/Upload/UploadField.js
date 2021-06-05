import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ImagePreviewButton from './ImagePreviewButton';

const useStyles = makeStyles((theme) => ({
  fileInput: {
    display: 'none',
  },
}));

const UploadField = ({ onUpload, onChange, ...props }) => {
  const classes = useStyles();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    if (event.target.files.length === 0) return;
    const [file] = event.target.files;

    setUploading(true);
    setError('');

    try {
      const path = await onUpload(file);
      onChange(path);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      {error && (
        <Grid item>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid item>
        <TextField
          {...props}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    className={classes.fileInput}
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <ImagePreviewButton imageUrl={props.value} />
                  <IconButton
                    component="span"
                    disabled={uploading || props.disabled}
                  >
                    {uploading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <CloudUploadIcon />
                    )}
                  </IconButton>
                </label>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default UploadField;
