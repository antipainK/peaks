import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  commonEmptyPaper: {
    padding: theme.spacing(2),
  },
}));

export default function ListEmptyState({ text }) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.commonEmptyPaper} elevation={2}>
        <Typography variant="subtitle2">
          <Box color="text.secondary">{text}</Box>
        </Typography>
      </Paper>
    </Grid>
  );
}
