import React, { useState } from 'react';
import { gql } from '@apollo/client';
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
import ExpeditionsList from '../Expedition/ExpeditionsList';
import UserAchievements from './UserAchievements';

export const USER_FRAGMENT = gql`
  fragment userPageUserFragment on User {
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
    followers {
      id
      displayName
    }
    following {
      id
      displayName
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
  followers: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

export default function UserPage({ user, myself }) {
  const classes = useStyles();
  const queryParams = useQueryParams();
  const [tab, setTab] = useState(queryParams.get('tab') || 'trips');

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
          {myself && (
            <Grid item>
              <Tooltip title="Edytuj profil">
                <IconButton component={RouterLink} to="/profile/edit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          container
          spacing={1}
          alignItems="center"
          className={classes.followers}
        >
          <Grid item>
            Obserwujący: <strong>{user.followers.length}</strong>
          </Grid>
          <Grid item>|</Grid>
          <Grid item>
            Obserwowani: <strong>{user.following.length}</strong>
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
        {tab === 'badges' && (
          <Grid item>
            <Box pt={2}>
              <UserAchievements />
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
