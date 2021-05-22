import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import UserPage, { USER_FRAGMENT } from './UserPage';

const ME = gql`
  query {
    me {
      id
      ...userPageUserFragment
    }
  }

  ${USER_FRAGMENT}
`;

export default function ProfilePage() {
  const { error, loading, data } = useQuery(ME);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const user = data?.me;

  return <UserPage user={user} myself={true} />;
}
