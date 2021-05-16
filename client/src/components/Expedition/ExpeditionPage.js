import { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { startOfToday, format } from 'date-fns';
import pl from 'date-fns/locale/pl';
import {
  MY_SENT_INVITES_QUERY,
  EXPEDITION_QUERY,
  SIGN_UP_MUTATION,
  SIGN_OFF_MUTATION,
  EXPEDITION_TRACKING_QUERY,
} from './sharedQueries';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import ExpeditionTracking from './ExpeditionTracking/ExpeditionTracking';
import ExpeditionDetails from './ExpeditionDetails/ExpeditionDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
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
      refetchQueries: [
        { query: EXPEDITION_QUERY, variables: { id } },
        { query: EXPEDITION_TRACKING_QUERY, variables: { expeditionId: id } },
      ],
      onError: () => {},
    }
  );

  const [signOffFromExpedition, { error: signOffError }] = useMutation(
    SIGN_OFF_MUTATION,
    {
      refetchQueries: [
        { query: EXPEDITION_QUERY, variables: { id } },
        { query: EXPEDITION_TRACKING_QUERY, variables: { expeditionId: id } },
      ],
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
  const isOrganiser = me.id === expedition.author.id;

  const handleExpeditionSignUp = () => {
    signUpForExpedition({ variables: { expeditionId: expedition.id } });
  };

  const handleExpeditionSingOff = () => {
    signOffFromExpedition({ variables: { expeditionId: expedition.id } });
  };

  const onScrollToDetails = () => {
    const detailsEl = detailsRef.current;
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={4} className={classes.root}>
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          wrap="nowrap"
          className={classes.header}
          spacing={1}
        >
          <Grid item>
            <Typography component="h1" variant="h4">
              {expedition.title}
            </Typography>
            <Typography variant="subtitle1">
              <Box color="text.secondary">
                {format(new Date(expedition.date), 'do MMMM yyyy, H:mm', {
                  locale: pl,
                })}
              </Box>
            </Typography>
          </Grid>
          {isOrganiser && expeditionDayOrLater && (
            <Grid item>
              <Tooltip title="Edytuj wyprawę jako organizator">
                <IconButton
                  component={RouterLink}
                  to={`/expeditions/edit/${expedition.id}`}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
        {expeditionDayOrLater && (
          <Grid item>
            <ExpeditionTracking
              expeditionId={expedition.id}
              scrollToDetails={onScrollToDetails}
            />
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
