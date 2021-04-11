import { useQuery } from '@apollo/client';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
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

const ExpeditionInvitesPage = () => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(RECEIVED_INVITES_QUERY);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const receivedInvites = data?.me.receivedExpeditionInvites;

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} className={classes.root}>
        <Grid item>
          <Typography variant="h5">Otrzymane zaproszenia</Typography>
        </Grid>
        <Grid item>
          <ExpeditionInvitesList expeditionInvites={receivedInvites} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpeditionInvitesPage;
