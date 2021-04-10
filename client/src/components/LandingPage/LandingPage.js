import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import mountainsImage from './mountains.jpg';

const USER_QUERY = gql`
  query {
    me {
      email
      displayName
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  const { data, loading, error } = useQuery(USER_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { me } = data;

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Typography variant="h6" align="center">
          Witaj {me.displayName}
        </Typography>
      </Box>
      <img src={mountainsImage} alt="" className={classes.image} />
    </Container>
  );
}
