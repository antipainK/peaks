import { Button, Grid, makeStyles, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { serverUrl } from '../../../../utils/const';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
  imageIcon: {
    marginRight: theme.spacing(1),
  },
}));

const GalleryItemInfoDialog = ({ open, onClose, photo }) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle onClose={onClose} />
      <DialogContent>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h6">Lokalizacja</Typography>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <MapContainer
              center={[photo.latitude, photo.longitude]}
              zoom={12}
              style={{ height: 200 }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[photo.latitude, photo.longitude]}></Marker>
            </MapContainer>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              href={`${serverUrl}${photo.photoUrl}`}
              target="_blank"
            >
              <ImageIcon className={classes.imageIcon} />
              Zobacz zdjęcie w pełnej rozdzielczości
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryItemInfoDialog;
