import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { serverUrl } from '../../../utils/const';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 500,
    width: '100%',
  },
  infoIcon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Gallery = ({ photos }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography component="h2" variant="h6" gutterBottom>
          Galeria
        </Typography>
      </Grid>
      <Grid item className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={1}>
          {photos.map((photo) => (
            <GridListTile key={photo.id} cols={1}>
              <img
                src={`${serverUrl}${photo.photoUrl}`}
                alt={photo.description}
              />
              <GridListTileBar
                title={photo.user.displayName}
                subtitle={photo.description.split('.')[0]}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${photo.user.displayName}'s photo`}
                    className={classes.infoIcon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </Grid>
  );
};

export default Gallery;
