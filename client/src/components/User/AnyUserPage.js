import React from 'react';
import { useParams } from 'react-router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import UserPage, { USER_FRAGMENT } from './UserPage';

const USER_QUERY = gql`
  query User($id: ID!) {
    me {
      id
      following {
        id
      }
    }
    user(id: $id) {
      id
      ...userPageUserFragment
    }
  }

  ${USER_FRAGMENT}
`;

const FOLLOW_MUTATION = gql`
  mutation FollowUser($id: ID!) {
    followUser(id: $id) {
      id
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;

const UNFOLLOW_MUTATION = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(id: $id) {
      id
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;

export default function AnyUserPage() {
  const { id } = useParams();

  const { error: queryError, loading, data } = useQuery(USER_QUERY, {
    variables: { id },
  });

  const [followUser, { error: followError }] = useMutation(FOLLOW_MUTATION, {
    onError: () => {},
    refetchQueries: [{ query: USER_QUERY, variables: { id } }],
  });

  const [unfollowUser, { error: unfollowError }] = useMutation(
    UNFOLLOW_MUTATION,
    {
      onError: () => {},
      refetchQueries: [{ query: USER_QUERY, variables: { id } }],
    }
  );

  if (queryError || followError || unfollowError)
    return <Error error={queryError || followError || unfollowError} />;
  if (loading) return <Loading />;

  const { user } = data;
  const myself = data.me?.id === data.user?.id;
  const followedByMe = data.me?.following.some(
    (followedUser) => followedUser.id === id
  );

  const handleUserFollow = () => {
    followUser({ variables: { id } });
  };

  const handleUserUnfollow = () => {
    unfollowUser({ variables: { id } });
  };

  return (
    <UserPage
      user={user}
      myself={myself}
      followed={followedByMe}
      onFollow={handleUserFollow}
      onUnfollow={handleUserUnfollow}
    />
  );
}
