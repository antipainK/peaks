import { Grid, makeStyles } from '@material-ui/core';
import Actions from './Actions';
import Description from './Description';
import Participants from './Participants';

const useStyles = makeStyles((theme) => ({
  actionSection: {
    paddingBottom: theme.spacing(1.5),
  },
  descriptionSection: {
    paddingBottom: theme.spacing(3),
  },
}));

const ExpeditionDetails = (props) => {
  const { showExpeditionActions, expedition } = props;
  const classes = useStyles();
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
      <Grid item>
        <Participants expedition={expedition} />
      </Grid>
    </>
  );
};

export default ExpeditionDetails;
