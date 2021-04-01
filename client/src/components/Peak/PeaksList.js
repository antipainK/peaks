import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardButton: {
    width: '100%',
  },
  cardPaper: {
    padding: theme.spacing(2),
    width: '100%',
  },
}));

export default function PeaksList({ peaks }) {
  const classes = useStyles();

  const sortedPeaks = peaks
    .slice()
    .sort((x, y) => x.name.localeCompare(y.name));

  return (
    <Grid container spacing={3}>
      {sortedPeaks.map((peak) => (
        <Grid key={peak.id} item xs={12} sm={6} md={4}>
          <ButtonBase
            className={classes.cardButton}
            component={RouterLink}
            to={`/peaks/${peak.id}`}
          >
            <Paper elevation={2} className={classes.cardPaper}>
              <Typography variant="subtitle2" gutterBottom>
                {peak.name}
              </Typography>
              <Typography variant="body2">{peak.mountainRange}</Typography>
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
}
