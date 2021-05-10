import { gql, useQuery, useMutation } from '@apollo/client';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CommentsList from './CommentsList';
import SendMessageCell from '../../Chat/Conversation/SendMessageCell';

const useStyles = makeStyles((theme) => ({
  commentsListSection: {
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const COMMENTS_QUERY = gql`
  query Expedition($id: ID!) {
    expedition(id: $id) {
      chat {
        id
        messages {
          id
          user {
            id
            displayName
            photoUrl
          }
          content
          time
        }
      }
    }
  }
`;

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($chatId: ID!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      id
    }
  }
`;

export default function CommentsSection({ expeditionId }) {
  const classes = useStyles();
  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
  } = useQuery(COMMENTS_QUERY, {
    variables: { id: expeditionId },
  });

  const [addComment, { loading: addCommentsLoading }] = useMutation(
    ADD_COMMENT_MUTATION,
    {
      refetchQueries: [
        { query: COMMENTS_QUERY, variables: { id: expeditionId } },
      ],
      onError: () => {},
    }
  );

  const isLoading = commentsLoading || addCommentsLoading;
  const comments = commentsData?.expedition.chat.messages || [];
  const chatId = commentsData?.expedition.chat.id || '';

  const handleAddComment = (comment) => {
    if (comment && chatId) {
      addComment({ variables: { chatId, message: comment } });
    }
  };

  const shapedComments = comments
    .map((comment) => ({
      ...comment,
      author: comment.user,
      text: comment.content,
      date: comment.time,
    }))
    .reverse();

  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Komentarze ({comments.length})
      </Typography>
      <Grid container direction="column" wrap="nowrap">
        <Grid item className={classes.commentsListSection}>
          {commentsError ? (
            <Alert severity="error">
              Wystąpił błąd podczas wczytywania komentarzy
            </Alert>
          ) : (
            <CommentsList comments={shapedComments} isLoading={isLoading} />
          )}
        </Grid>
        <Grid item>
          <SendMessageCell
            onSend={({ message }) => handleAddComment(message)}
            placeholder="Napisz komentarz..."
            noGutter
            disabled={isLoading || commentsError}
          />
        </Grid>
      </Grid>
    </>
  );
}
