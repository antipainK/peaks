import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import ExpeditionsList from './ExpeditionsList';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const EXPEDITIONS_QUERY = gql`
  query Expeditions {
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
`;

export default function ExpeditionListPage() {
  const classes = useStyles();

  const { data, loading, error } = useQuery(EXPEDITIONS_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { expeditions } = data;

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item>
          <Typography variant="h5">Organizowane wyprawy</Typography>
        </Grid>
        <Grid item>
          <ExpeditionsList expeditions={expeditions} />
        </Grid>
      </Grid>
    </Container>
  );
}
