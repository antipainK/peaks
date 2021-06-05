import {
  List,
  Paper,
  Typography,
  Box,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Comment from './Comment';

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
        {!isLoading && comments.length === 0 && <EmptyState />}
        {!isLoading &&
          comments.length > 0 &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
      </List>
    </Paper>
  );
}

const LoadingState = () =>
  Array(4)
    .fill('key')
    .map((val, idx) => (
      <ListItem key={val + idx}>
        <Skeleton height={80} width={200} />
      </ListItem>
    ));

const EmptyState = () => (
  <Typography variant="subtitle2">
    <Box color="text.secondary">Brak komentarzy...</Box>
  </Typography>
);
