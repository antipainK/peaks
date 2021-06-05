import { Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: theme.spacing(2, 3),
  },
  infoHeader: {
    marginBottom: theme.spacing(1),
  },
  infoContent: {
    fontWeight: 500,
  },
}));

export default function UserStatistics({ statistics }) {
  const classes = useStyles();

  const peaksProgress = Math.round(
    (100 * statistics.howManyPeaksFinished.finishedPeaks) /
      statistics.howManyPeaksFinished.allPeaks
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Paper elevation={1}>
          <div className={classes.cardRoot}>
            <Typography className={classes.infoHeader}>
              Ukończone szczyty
            </Typography>
            <Typography className={classes.infoContent}>
              {statistics.howManyPeaksFinished.finishedPeaks} z{' '}
              {statistics.howManyPeaksFinished.allPeaks}
            </Typography>
          </div>
          <LinearProgress variant="determinate" value={peaksProgress} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper elevation={1}>
          <div className={classes.cardRoot}>
            <Typography className={classes.infoHeader}>
              Ukończone wyprawy
            </Typography>
            <Typography className={classes.infoContent}>
              {statistics.howManyExpeditionsFinished.finishedExpeditions}
            </Typography>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
