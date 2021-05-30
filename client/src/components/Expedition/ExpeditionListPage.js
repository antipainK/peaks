import { useState } from 'react';
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
import { startOfToday } from 'date-fns';
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
  const [tab, setTab] = useState('current');

  const { data, loading, error } = useQuery(EXPEDITIONS_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { expeditions } = data;

  const pastExpeditions = expeditions?.filter(
    (expedition) => new Date(expedition.date) < startOfToday()
  );

  const currentExpeditions = expeditions
    ?.filter((expedition) => new Date(expedition.date) >= startOfToday())
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
            <Tab label="Aktualne" value="current" />
            <Tab label="Minione" value="past" />
          </Tabs>
        </Grid>
        {tab === 'current' ? (
          <Grid item>
            <ExpeditionsList
              key="currentExpeditionsSearch"
              expeditions={currentExpeditions}
              withSearch
              searchId="currentExpeditionsSearch"
            />
          </Grid>
        ) : (
          <Grid item>
            <ExpeditionsList
              key="pastExpeditionsSearch"
              expeditions={pastExpeditions}
              withSearch
              searchId="pastExpeditionsSearch"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
