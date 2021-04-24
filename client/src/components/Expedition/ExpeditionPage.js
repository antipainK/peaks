import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const EXPEDITION_QUERY = gql`
  query Expedition($id: ID!) {
    expedition(id: $id) {
      id
      title
      author {
        id
      }
      participants {
        id
        displayName
      }
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SignUpForExpedition($expeditionId: ID!) {
    signUpForExpedition(expeditionId: $expeditionId) {
      id
    }
  }
`;

const SIGN_OFF_MUTATION = gql`
  mutation SignOffFromExpedition($expeditionId: ID!) {
    signOffFromExpedition(expeditionId: $expeditionId) {
      id
    }
  }
`;

const ExpeditionPage = () => {
  const classes = useStyles();
  const { id } = useParams();

  const {
    data: expeditionData,
    loading: expeditionLoading,
    error: expeditionError,
  } = useQuery(EXPEDITION_QUERY, {
    variables: { id },
  });

  const { data: meData, loading: meLoading, error: meError } = useQuery(
    ME_QUERY
  );

  const [signUpForExpedition, { error: signUpError }] = useMutation(
    SIGN_UP_MUTATION,
    {
      refetchQueries: [{ query: EXPEDITION_QUERY, variables: { id } }],
      onError: () => {},
    }
  );

  const [signOffFromExpedition, { error: signOffError }] = useMutation(
    SIGN_OFF_MUTATION,
    {
      refetchQueries: [{ query: EXPEDITION_QUERY, variables: { id } }],
      onError: () => {},
    }
  );

  if (expeditionLoading || meLoading) return <Loading />;
  if (expeditionError || meError || signUpError || signOffError)
    return <Error error={expeditionError || meError || signUpError || signOffError} />;

  const { expedition } = expeditionData;
  const { me } = meData;

  const currentUserIsParticipant = expedition.participants
    .map((p) => p.id)
    .includes(me.id);

  const handleExpeditionSignUp = () => {
    signUpForExpedition({ variables: { expeditionId: expedition.id } });
  };

  const handleExpeditionSingOff = () => {
    signOffFromExpedition({ variables: { expeditionId: expedition.id } });
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={3} className={classes.root}>
        <Grid item>
          <Typography variant="h5">{expedition.title}</Typography>
        </Grid>
        <Grid item>
          {currentUserIsParticipant ? (
            <Button
              variant="contained"
              onClick={handleExpeditionSingOff}
            >
              Zrezygnuj
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleExpeditionSignUp}
            >
              Weź udział
            </Button>
          )}
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ marginBottom: 10 }}>
            Uczestnicy
          </Typography>
          <List component={Paper}>
            {expedition.participants.map((p) => (
              <ListItem key={p.id}>
                <ListItemText
                  primary={p.displayName}
                  secondary={p.id === expedition.author.id ? 'Organizator' : ''}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpeditionPage;
