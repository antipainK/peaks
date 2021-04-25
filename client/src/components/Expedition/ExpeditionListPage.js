import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const EXPEDITIONS_QUERY = gql`
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
        <Grid item className={classes.header}>
          <Typography variant="h5">Organizowane wyprawy</Typography>
          <Hidden smDown>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/expeditions/create"
            >
              Zaplanuj wyprawę
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Tooltip title="Zaplanuj wyprawę">
              <IconButton
                color="primary"
                component={RouterLink}
                to="/expeditions/create"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
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
