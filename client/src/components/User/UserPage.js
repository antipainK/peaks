import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Box,
} from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import UserInfo from './UserInfo';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import ExpeditionsList from '../Expedition/ExpeditionsList';

const ME = gql`
  query {
    me {
      id
      email
      displayName
      city
      contact
      photoUrl
      participatedExpeditions {
        id
        title
        date
        maxParticipants
        author {
          id
          displayName
        }
        peak {
          id
          name
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    display: 'block',
    margin: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function UserPage() {
  const classes = useStyles();
  const queryParams = useQueryParams();
  const [tab, setTab] = useState(paramsQuery.get('tab') || 'trips');

  const { error, loading, data } = useQuery(ME);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const user = data?.me;
  const expeditions = user.participatedExpeditions.slice();

  const handleTabChange = (event, tab) => {
    setTab(tab);
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5">{user.displayName}</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Edytuj profil">
              <IconButton component={RouterLink} to="/profile/edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={12} md="auto">
            <img src={user.photoUrl} alt="avatar" className={classes.photo} />
          </Grid>
          <Grid item className={classes.grow}>
            <UserInfo user={user} />
          </Grid>
        </Grid>
        <Grid item>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Wyprawy" value="trips" />
            <Tab label="Odznaczenia" value="badges" />
            <Tab label="Statystyki" value="statistics" />
          </Tabs>
        </Grid>
        {tab === 'trips' && (
          <Grid item>
            <Box pt={2}>
              <ExpeditionsList expeditions={expeditions} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

// from react router docs
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}
