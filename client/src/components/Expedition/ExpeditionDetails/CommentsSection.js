import { Typography, Grid, makeStyles } from '@material-ui/core';
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

const comments = [];

export default function CommentsSection({ expeditionId }) {
  const classes = useStyles();
  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Komentarze ({comments.length})
      </Typography>
      <Grid container direction="column" wrap="nowrap">
        <Grid item className={classes.commentsListSection}>
          <CommentsList comments={comments} isLoading={true} />
        </Grid>
        <Grid item>
          <SendMessageCell
            onSend={(data) => console.log(data)}
            placeholder="Napisz komentarz..."
            noGutter
          />
        </Grid>
      </Grid>
    </>
  );
}
