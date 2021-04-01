import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Grid, Typography } from '@material-ui/core';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const PEAK_QUERY = gql`
  query PeakQuery($id: ID!) {
    peak(id: $id) {
      id
      name
      absHeight
      description
      mountainRange
    }
  }
`;

export default function UserPage() {
  const classes = useStyles();
  const params = useParams();

  const { data, loading, error } = useQuery(PEAK_QUERY, {
    variables: { id: params.id },
  });

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { peak } = data;

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom>{peak.name} ({peak.absHeight} m)</Typography>
            <Typography variant="subtitle1" gutterBottom>{peak.mountainRange}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          {peak.description}
        </Grid>
      </Grid>
    </Container>
  );
}
