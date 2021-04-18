import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import useCurrentThreadId from '../useCurrentThreadId';
import getSecondUserName from '../getSecondUserName';

const useStyles = makeStyles((theme) => ({
  messagesHeader: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(8),
      padding: theme.spacing(1.5, 3),
    },
  },
}));

const THREAD_NAME_QUERY = gql`
  query chat($chatId: ID!) {
    me {
      displayName
    }
    chat(chatId: $chatId) {
      name
    }
  }
`;

export default function MessagesHeaderCell() {
  const classes = useStyles();
  const currentThreadId = useCurrentThreadId();
  const { data = {}, loading } = useQuery(THREAD_NAME_QUERY, {
    variables: { chatId: currentThreadId },
  });

  const threadName = data?.chat?.name || '';
  const currentUserName = data?.me?.displayName || '';

  return (
    <Grid item className={classes.messagesHeader}>
      <Typography component="h2" variant="h4">
        {loading ? (
          <Skeleton />
        ) : (
          getSecondUserName(threadName, currentUserName)
        )}
      </Typography>
    </Grid>
  );
}
