import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import PeakMap from './PeakMap';
import ExpeditionsList from '../Expeditions/ExpeditionsList';
import { dateTimeNow } from '../../utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const PEAK_QUERY = gql`
  query Peak($id: ID!) {
    peak(id: $id) {
      id
      name
      absHeight
      description
      mountainRange
      latitude
      longitude
      expeditions {
        id
        title
        date
        maxParticipants
        peak {
          id
          name
        }
        author {
          id
          displayName
        }
      }
    }
  }
`;

export default function PeakPage() {
  const classes = useStyles();
  const params = useParams();

  const { data, loading, error } = useQuery(PEAK_QUERY, {
    variables: { id: params.id },
  });

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { peak } = data;

  const upcomingExpeditions = peak.expeditions.filter(
    (expedition) => expedition.date > dateTimeNow()
  );

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={3} className={classes.root}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              {peak.name} ({peak.absHeight} m)
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {peak.mountainRange}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <PeakMap height={400} peak={peak} />
        </Grid>
        <Grid item>{peak.description}</Grid>
        {upcomingExpeditions.length > 0 && (
          <Grid item>
            <Typography variant="h5">Nadchodzące wyprawy</Typography>
            <Box pt={2}>
              <ExpeditionsList
                expeditions={upcomingExpeditions.reverse()}
                hidePeak
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
