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
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import UserInfo from './UserInfo';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

const ME = gql`
  query {
    me {
      id
      email
      displayName
      city
      contact
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
}));

export default function UserPage() {
  const classes = useStyles();
  const [tab, setTab] = useState('trips');

  const { error, loading, data } = useQuery(ME);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const user = data?.me;

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
