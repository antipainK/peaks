import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
      <Typography variant="h6">Hey {me.displayName}</Typography>
      <IconButton edge="end" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
    </>
  );
}
