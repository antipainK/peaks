import { Grid, makeStyles } from '@material-ui/core';
import Actions from './Actions';
import Description from './Description';
import Gallery from './Gallery/Gallery';
import Participants from './Participants';

const useStyles = makeStyles((theme) => ({
  actionSection: {
    paddingBottom: theme.spacing(1.5),
  },
  descriptionSection: {
    paddingBottom: theme.spacing(3),
  },
  participantsSection: {
    paddingBottom: theme.spacing(3),
  },
  gallerySection: {
    paddingBottom: theme.spacing(3),
  },
}));

const ExpeditionDetails = (props) => {
  const { showExpeditionActions, expedition } = props;
  const classes = useStyles();

  const expeditionPhotos = expedition.tracks.flatMap((track) =>
    track.photos.map((photo) => ({ ...photo, user: track.user }))
  );

  return (
    <>
      {showExpeditionActions && (
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          spacing={1}
          className={classes.actionSection}
        >
          <Actions {...props} />
        </Grid>
      )}
      <Grid item className={classes.descriptionSection}>
        <Description description={expedition.description} />
      </Grid>
      <Grid item className={classes.participantsSection}>
        <Participants expedition={expedition} />
      </Grid>
      <Grid item className={classes.gallerySection}>
        <Gallery photos={expeditionPhotos} />
      </Grid>
    </>
  );
};

export default ExpeditionDetails;
