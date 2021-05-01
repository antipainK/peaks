import { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { startOfToday } from 'date-fns';
import {
  MY_SENT_INVITES_QUERY,
  EXPEDITION_QUERY,
  SIGN_UP_MUTATION,
  SIGN_OFF_MUTATION,
} from './sharedQueries';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import ExpeditionTracking from './ExpeditionTracking/ExpeditionTracking';
import ExpeditionDetails from './ExpeditionDetails/ExpeditionDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
    },
  },
}));

const ExpeditionPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const detailsRef = useRef();

  const {
    data: expeditionData,
    loading: expeditionLoading,
    error: expeditionError,
  } = useQuery(EXPEDITION_QUERY, {
    variables: { id },
  });

  const { data: meData, loading: meLoading, error: meError } = useQuery(
    MY_SENT_INVITES_QUERY
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

  const isLoading = expeditionLoading || meLoading;
  const error = expeditionError || meError || signUpError || signOffError;

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const { expedition } = expeditionData;
  const { me } = meData;

  const expeditionDayOrLater = new Date(expedition.date) >= startOfToday();

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
        {expeditionDayOrLater && (
          <Grid item>
            <ExpeditionTracking expeditionId={expedition.id} />
          </Grid>
        )}
        <Grid item ref={detailsRef}>
          <ExpeditionDetails
            onSignUp={handleExpeditionSignUp}
            onSignOff={handleExpeditionSingOff}
            showExpeditionActions={expeditionDayOrLater}
            me={me}
            expedition={expedition}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpeditionPage;
