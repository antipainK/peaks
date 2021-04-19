import gql from 'graphql-tag';

export const THREADS_QUERY = gql`
  query Threads {
    me {
      id
      displayName
      chats {
        id
        name
        users {
          id
          displayName
        }
      }
    }
  }
`;
