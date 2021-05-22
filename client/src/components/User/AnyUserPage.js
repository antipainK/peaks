import React from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import UserPage, { USER_FRAGMENT } from './UserPage';

const USER_QUERY = gql`
  query User($id: ID!) {
    me {
      id
    }
    user(id: $id) {
      id
      ...userPageUserFragment
    }
  }

  ${USER_FRAGMENT}
`;

export default function AnyUserPage() {
  const { id } = useParams();
  const { error, loading, data } = useQuery(USER_QUERY, {
    variables: { id },
  });

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const { user } = data;
  const myself = data.me?.id === data.user?.id;

  return <UserPage user={user} myself={myself} />;
}
