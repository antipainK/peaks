import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import EventIcon from '@material-ui/icons/Event';
import { formatDate } from '../../utils/date';

const useStyles = makeStyles((theme) => ({
  cardButton: {
    width: '100%',
  },
  cardPaper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  title: {
    fontWeight: 500,
  },
}));

export default function ExpeditionsList({ expeditions, hidePeak = false }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {expeditions.map((expedition) => (
        <Grid key={expedition.id} item xs={12} sm={6} md={4}>
          <ButtonBase
            className={classes.cardButton}
            component={RouterLink}
            to={`/expeditions/${expedition.id}`}
          >
            <Paper elevation={2} className={classes.cardPaper}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1" className={classes.title}>
                    {expedition.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Organizator: {expedition.author.displayName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Limit uczestników: {expedition.maxParticipants}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={3} alignItems="center">
                    {hidePeak || (
                      <Grid item>
                        <FlagIcon
                          fontSize="small"
                          color="action"
                          className={classes.icon}
                        />
                        <Typography variant="body2" component="span">
                          {expedition.peak.name}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item>
                      <EventIcon
                        fontSize="small"
                        color="action"
                        className={classes.icon}
                      />
                      <Typography variant="body2" component="span">
                        {formatDate(expedition.date)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
}
