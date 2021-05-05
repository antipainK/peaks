import { Button, Grid } from '@material-ui/core';
import InviteUser from '../InviteUser';

const Actions = ({ onSignUp, onSignOff, me, expedition }) => {
  const isParticipant = expedition.participants
    .map((p) => p.id)
    .includes(me.id);

  const canSignup = expedition.participants.length < expedition.maxParticipants;

  return (
    <>
      <Grid item>
        <InviteUser me={me} expedition={expedition} />
      </Grid>
      <Grid item>
        {isParticipant ? (
          <Button variant="contained" onClick={onSignOff}>
            Zrezygnuj
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={onSignUp}
            disabled={!canSignup}
          >
            Weź udział
          </Button>
        )}
      </Grid>
    </>
  );
};

export default Actions;
