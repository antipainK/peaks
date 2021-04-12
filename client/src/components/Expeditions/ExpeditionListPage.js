import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import ExpeditionsList from './ExpeditionsList';
import { dateTimeNow } from '../../utils/date';

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
  const [tab, setTab] = useState('upcoming');

  const { data, loading, error } = useQuery(EXPEDITIONS_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { expeditions } = data;

  const pastExpeditions = expeditions?.filter(
    (expedition) => expedition.date < dateTimeNow()
  );

  const upcomingExpeditions = expeditions
    ?.filter((expedition) => expedition.date > dateTimeNow())
    .reverse();

  const handleTabChange = (event, tab) => {
    setTab(tab);
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={3} className={classes.root}>
        <Grid item>
          <Typography variant="h5">Organizowane wyprawy</Typography>
        </Grid>
        <Grid item>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Nadchodzące" value="upcoming" />
            <Tab label="Minione" value="past" />
          </Tabs>
        </Grid>
        {tab === 'upcoming' ? (
          <Grid item>
            <ExpeditionsList expeditions={upcomingExpeditions} />
          </Grid>
        ) : (
          <Grid item>
            <ExpeditionsList expeditions={pastExpeditions} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
