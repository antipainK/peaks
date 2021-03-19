import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import LandingPage from '../LandingPage/LandingPage';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

const USER_QUERY = gql`
  query {
    me {
      email
      displayName
    }
  }
`;

export default function Navigation() {
  // Example query
  const { data, loading, error } = useQuery(USER_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { me } = data;

  return (
    <>
      {/* TODO: setup layout and navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Hey {me.displayName}</Typography>
        </Toolbar>
      </AppBar>
      <LandingPage />
    </>
  );
}
