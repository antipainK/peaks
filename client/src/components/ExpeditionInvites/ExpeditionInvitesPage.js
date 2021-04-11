import { useMutation, useQuery } from '@apollo/client';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { dateTimeNow } from '../../utils/date';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import ExpeditionInvitesList from './ExpeditionInvitesList';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const RECEIVED_INVITES_QUERY = gql`
  query ReceivedInvites {
    me {
      id
      receivedExpeditionInvites {
        id
        from {
          id
          displayName
        }
        timestamp
        expedition {
          id
          title
          date
          peak {
            id
            name
          }
          author {
            id
            displayName
          }
        }
      }
    }
  }
`;

const DELETE_INVITE_MUTATION = gql`
  mutation DeleteExpeditionInvite($id: ID!) {
    deleteExpeditionInvite(id: $id) {
      id
    }
  }
`;

const ExpeditionInvitesPage = () => {
  const classes = useStyles();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(RECEIVED_INVITES_QUERY);

  const [deleteInvite, { error: deleteError }] = useMutation(
    DELETE_INVITE_MUTATION,
    {
      refetchQueries: [{ query: RECEIVED_INVITES_QUERY }],
      onError: () => {},
    }
  );

  if (queryError || deleteError)
    return <Error error={queryError || deleteError} />;
  if (queryLoading) return <Loading />;

  const receivedInvites = queryData?.me.receivedExpeditionInvites;

  const invitesForUpcomingExpeditions = receivedInvites?.filter(
    ({ expedition }) => expedition.date > dateTimeNow()
  );

  const handleRejectInvite = (e, id) => {
    e.preventDefault();
    deleteInvite({ variables: { id } });
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item>
          <Typography variant="h5">Otrzymane zaproszenia</Typography>
        </Grid>
        <Grid item>
          <ExpeditionInvitesList
            expeditionInvites={invitesForUpcomingExpeditions}
            onRejectInvite={handleRejectInvite}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpeditionInvitesPage;
