import {
  Grid,
  ListItemText,
  Paper,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  participantPaper: {
    padding: theme.spacing(0.5, 2),
  },
  participantEmptyPaper: {
    padding: theme.spacing(2),
  },
}));

const Participants = ({ expedition }) => {
  const { participants, maxParticipants, author } = expedition;
  const classes = useStyles();
  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Uczestnicy {`(${participants.length}/${maxParticipants})`}
      </Typography>
      <Grid container spacing={2}>
        {participants.length === 0 && <ParticipantsEmptyState />}
        {participants.length > 0 &&
          participants.map((p) => (
            <Grid key={p.id} item xs={12} sm={12} md={6} lg={4}>
              <Paper className={classes.participantPaper} elevation={2}>
                <ListItemText
                  primary={p.displayName}
                  secondary={p.id === author.id ? 'Organizator' : ''}
                />
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Participants;

const ParticipantsEmptyState = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.participantEmptyPaper} elevation={2}>
        <Typography variant="subtitle2">
          <Box color="text.secondary">
            Aktualnie brak uczestników. Kliknij "Weź udział" wyżej i zostań
            pierwszym uczestnikiem wyprawy!
          </Box>
        </Typography>
      </Paper>
    </Grid>
  );
};
