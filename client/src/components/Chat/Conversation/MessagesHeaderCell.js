import { useQuery } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import useCurrentThreadId from '../useCurrentThreadId';
import { THREADS_QUERY } from '../sharedQueries';
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

export default function MessagesHeaderCell() {
  const classes = useStyles();
  const currentThreadId = useCurrentThreadId();
  const { data = {}, loading } = useQuery(THREADS_QUERY);

  const threads = loading ? [] : data.me.chats;
  const currentName = loading ? '' : data.me.displayName;
  const threadName =
    threads.find((thread) => thread.id === currentThreadId)?.name || '';

  return (
    <Grid item className={classes.messagesHeader}>
      <Typography component="h2" variant="h4">
        {loading ? <Skeleton /> : getSecondUserName(threadName, currentName)}
      </Typography>
    </Grid>
  );
}
