import React, { useState } from 'react';
import {
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

export default function UserPage() {
  const classes = useStyles();
  const [tab, setTab] = useState('trips');

  // TODO: load user data
  const user = {
    id: 1,
    email: 'sherlock@holmes.com',
    displayName: 'Sherlock Holmes',
    city: 'Kraków',
    contact: '+48 191 911 451 lub @sherlock na Twitterze',
  };

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
        <Grid item>
          <UserInfo user={user} />
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
      </Grid>
    </Container>
  );
}
