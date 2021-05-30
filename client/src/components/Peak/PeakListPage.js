import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import PeaksMap from './PeaksMap';
import PeaksList from './PeaksList';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const PEAKS_QUERY = gql`
  query Peaks {
    peaks {
      id
      name
      absHeight
      mountainRange
      latitude
      longitude
    }
  }
`;

export default function PeakListPage() {
  const classes = useStyles();

  const { data, loading, error } = useQuery(PEAKS_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { peaks } = data;

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item>
          <Typography variant="h5">Szczyty Korony Gór</Typography>
        </Grid>
        <Grid item>
          <PeaksMap peaks={peaks} height={500} />
        </Grid>
        <Grid item>
          <Box pt={4}>
            <PeaksList peaks={peaks} withSearch />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
