import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Container, Typography } from '@material-ui/core';
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

export default function LandingPage() {
  // Example query
  const { data, loading, error } = useQuery(USER_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { me } = data;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h6">Hey {me.displayName}</Typography>
      </Box>
    </Container>
  );
}
