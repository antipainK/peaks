import {
  List,
  Paper,
  Typography,
  Box,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Message from '../../Chat/Conversation/Message';

const useStyles = makeStyles((theme) => ({
  commentsList: {
    maxHeight: 400,
    overflowY: 'auto',
    padding: theme.spacing(2),
  },
}));

export default function CommentsList({ comments, isLoading }) {
  const classes = useStyles();
  return (
    <Paper elevation={2}>
      <List className={classes.commentsList}>
        {isLoading && <LoadingState />}
        {!isLoading && comments.length === 0 ? (
          <EmptyState />
        ) : (
          comments.map((comment) => (
            <Message
              key={comment.id}
              {...comment}
              isMine={false}
              disableGutters
            />
          ))
        )}
      </List>
    </Paper>
  );
}

const LoadingState = () =>
  Array(3)
    .fill('key')
    .map((val, idx) => (
      <ListItem key={val + idx}>
        <Skeleton width={200} />
      </ListItem>
    ));

const EmptyState = () => (
  <Typography variant="subtitle2">
    <Box color="text.secondary">Brak komentarzy...</Box>
  </Typography>
);
