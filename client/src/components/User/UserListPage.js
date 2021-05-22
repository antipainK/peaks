import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  InputBase,
  IconButton,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
  searchBox: {
    padding: '2px 2px 2px 16px',
    display: 'inline-block',
  },
  input: {
    width: '100%',
  },
}));

const USERS_QUERY = gql`
  query Users {
    users {
      id
      displayName
      photoUrl
      city
    }
  }
`;

export default function UserListPage() {
  const classes = useStyles();

  const [search, setSearch] = useState('');

  const { data, loading, error } = useQuery(USERS_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { users } = data;

  const filteredUsers = searchUsers(users, search).sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item>
          <Typography variant="h5">Użytkownicy</Typography>
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Paper className={classes.searchBox}>
            <InputBase
              autoFocus
              value={search}
              placeholder="Wyszukaj"
              onChange={(event) => setSearch(event.target.value)}
            />
            <IconButton disabled>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={1}>
            {filteredUsers.length > 0 ? (
              <UserList users={filteredUsers} />
            ) : (
              <Box p={2}>
                <Typography variant="subtitle1">
                  Nie znaleziono pasujących osób
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function UserList({ users }) {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id} button component={RouterLink} to={`/users/${user.id}`}>
          <ListItemAvatar>
            <Avatar src={user.photoUrl} alt={user.displayName} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} secondary={user.city} />
        </ListItem>
      ))}
    </List>
  );
}

function searchUsers(users, search) {
  const searchParts = search.toLowerCase().split(/\s+/);
  return users.filter((user) =>
    searchParts.every((part) => user.displayName.toLowerCase().includes(part))
  );
}
