import {
  Grid,
  ListItemText,
  Paper,
  Typography,
  makeStyles,
  Box,
  ButtonBase,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  participantPaper: {
    padding: theme.spacing(0.5, 2),
  },
  participantEmptyPaper: {
    padding: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
}));

const Participants = ({ expedition }) => {
  const { participants, maxParticipants, author } = expedition;
  const classes = useStyles();
  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Uczestnicy wyprawy {`(${participants.length}/${maxParticipants})`}
      </Typography>
      <Grid container spacing={2}>
        {participants.length === 0 ? (
          <ParticipantsEmptyState />
        ) : (
          participants.map((p) => (
            <Grid key={p.id} item xs={12} sm={12} md={6} lg={4}>
              <ButtonBase
                className={classes.fullWidth}
                component={RouterLink}
                to={`/users/${p.id}`}
              >
                <Paper
                  className={`${classes.participantPaper} ${classes.fullWidth}`}
                  elevation={2}
                >
                  <ListItemText
                    primary={p.displayName}
                    secondary={p.id === author.id ? 'Organizator' : 'Uczestnik'}
                  />
                </Paper>
              </ButtonBase>
            </Grid>
          ))
        )}
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
