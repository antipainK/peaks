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
  ButtonBase,
} from '@material-ui/core';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import UserInfo from './UserInfo';
import ExpeditionsList from '../Expedition/ExpeditionsList';
import UserAchievements from './UserAchievements';
import SelectUserDialog from '../SelectUserDialog/SelectUserDialog';
import UserStatistics from './UserStatistics';

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
    statistics {
      howManyPeaksFinished {
        finishedPeaks
        allPeaks
      }
      howManyExpeditionsFinished {
        finishedExpeditions
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
  fullWidth: {
    width: '100%',
  },
  followersContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  followersButton: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export default function UserPage({
  user,
  myself,
  followed = false,
  onFollow,
  onUnfollow,
}) {
  const classes = useStyles();
  const history = useHistory();
  const queryParams = useQueryParams();

  const [tab, setTab] = useState(queryParams.get('tab') || 'trips');
  const [followersDialogType, setFollowersDialogType] = useState('followers');
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false);

  const sortedExpeditions = user.participatedExpeditions
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  const handleTabChange = (event, tab) => {
    setTab(tab);
  };

  const handleFollowersDialogOpen = (type) => {
    setFollowersDialogType(type);
    setFollowersDialogOpen(true);
  };

  const handleFollowersDialogSelect = (user) => {
    setFollowersDialogOpen(false);
    history.push(`/users/${user.id}`);
  };

  const handleFollowersDialogClose = () => {
    setFollowersDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5">{user.displayName}</Typography>
          </Grid>
          {!myself && (
            <Grid item>
              {!followed ? (
                <Tooltip title="Zaboserwuj">
                  <IconButton onClick={onFollow}>
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Przestań obserwować">
                  <IconButton onClick={onUnfollow}>
                    <PersonAddDisabledIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          )}
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
          className={classes.followersContainer}
        >
          <Grid item>
            <ButtonBase
              className={classes.followersButton}
              onClick={() => handleFollowersDialogOpen('followers')}
              disabled={user.followers.length === 0}
            >
              <Typography>
                Obserwujący: <strong>{user.followers.length}</strong>
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item>|</Grid>
          <Grid item>
            <ButtonBase
              className={classes.followersButton}
              onClick={() => handleFollowersDialogOpen('following')}
              disabled={user.following.length === 0}
            >
              <Typography>
                Obserwowani: <strong>{user.following.length}</strong>
              </Typography>
            </ButtonBase>
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
        <Grid item className={classes.fullWidth}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Wyprawy" value="trips" />
            <Tab label="Odznaczenia" value="badges" />
            <Tab label="Statystyki" value="statistics" />
          </Tabs>
        </Grid>
        <Grid item>
          <Box pt={2}>
            {tab === 'trips' && (
              <ExpeditionsList expeditions={sortedExpeditions} withSearch />
            )}
            {tab === 'badges' && <UserAchievements userId={user.id} />}
            {tab === 'statistics' && (
              <UserStatistics statistics={user.statistics} />
            )}
          </Box>
        </Grid>
      </Grid>
      <SelectUserDialog
        isOpen={followersDialogOpen}
        title={
          followersDialogType === 'followers' ? 'Obserwujący' : 'Obserwowani'
        }
        users={
          followersDialogType === 'followers' ? user.followers : user.following
        }
        onSelect={handleFollowersDialogSelect}
        onClose={handleFollowersDialogClose}
      />
    </Container>
  );
}

// from react router docs
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}
