import { useQuery } from '@apollo/client';
import { Container, Grid, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
  grow: {
    flexGrow: 1,
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
        {receivedInvites.map(({ id, from, expedition }) => (
          <Grid item key={id}>
            od {from.displayName} na {expedition.title}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExpeditionInvitesPage;
