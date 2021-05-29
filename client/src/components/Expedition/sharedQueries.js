import { gql } from '@apollo/client';

export const MY_SENT_INVITES_QUERY = gql`
  query MyInvites {
    me {
      id
      sentExpeditionInvites {
        id
        to {
          id
        }
        expedition {
          id
        }
      }
    }
  }
`;

export const EXPEDITION_QUERY = gql`
  query Expedition($id: ID!) {
    expedition(id: $id) {
      id
      title
      description
      date
      maxParticipants
      author {
        id
      }
      participants {
        id
        displayName
      }
      peak {
        id
      }
      tracks {
        id
        user {
          id
          displayName
          photoUrl
        }
        photos {
          id
          latitude
          longitude
          timestamp
          photoUrl
          description
        }
      }
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUpForExpedition($expeditionId: ID!) {
    signUpForExpedition(expeditionId: $expeditionId) {
      id
    }
  }
`;

export const SIGN_OFF_MUTATION = gql`
  mutation SignOffFromExpedition($expeditionId: ID!) {
    signOffFromExpedition(expeditionId: $expeditionId) {
      id
    }
  }
`;

export const EXPEDITION_TRACKING_QUERY = gql`
  query ExpeditionTracking($expeditionId: ID!) {
    me {
      id
    }

    expedition(id: $expeditionId) {
      id
      date
      peak {
        id
        latitude
        longitude
      }
      tracks {
        id
        started
        startedAt
        user {
          id
          photoUrl
          displayName
        }
        locations {
          id
          latitude
          longitude
        }
      }
    }
  }
`;
