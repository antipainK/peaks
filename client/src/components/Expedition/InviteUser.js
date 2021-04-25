import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import gql from 'graphql-tag';
import { useState } from 'react';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import SelectUserDialog from '../SelectUserDialog/SelectUserDialog';
import { MY_SENT_INVITES_QUERY } from './ExpeditionPage';

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      displayName
    }
  }
`;

const INVITE_MUTATION = gql`
  mutation CreateExpeditionInvite($input: CreateExpeditionInviteInput!) {
    createExpeditionInvite(input: $input) {
      id
    }
  }
`;

const InviteUser = ({ me, expedition }) => {
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(USERS_QUERY);

  const [inviteUser, { error: inviteError }] = useMutation(INVITE_MUTATION, {
    refetchQueries: [{ query: MY_SENT_INVITES_QUERY }],
    onCompleted: () => setUser(null),
    onError: () => {},
  });

  if (usersLoading) return <Loading />;
  if (usersError || inviteError)
    return <Error error={usersError || inviteError} />;

  const { users } = usersData;

  const participantsIds = expedition.participants.map((p) => p.id);
  const notParticipatingUsers = users.filter(
    (u) => !participantsIds.includes(u.id)
  );

  const userIdsInvitedByMe = me.sentExpeditionInvites
    .filter((invite) => invite.expedition.id === expedition.id)
    .map((invite) => invite.to.id);
  const notAlreadyInvitedUsers = notParticipatingUsers.filter(
    (u) => !userIdsInvitedByMe.includes(u.id)
  );

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSelectUser = (user) => {
    setUser(user);
    handleDialogClose();
  };

  const handleInviteUser = () => {
    inviteUser({
      variables: {
        input: {
          toId: user.id,
          expeditionId: expedition.id,
        },
      },
    });
  };

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <IconButton color="primary" onClick={handleDialogOpen}>
            <PersonIcon />
          </IconButton>
        </Grid>
        <Grid item>
          {user ? (
            <Button onClick={handleInviteUser}>
              Invite {user.displayName}
            </Button>
          ) : (
            <Typography>
              Jeżeli nie widzisz danej osoby, to znaczy, że bierze już udział
              lub otrzymała już Twoje zaproszenie
            </Typography>
          )}
        </Grid>
      </Grid>
      <SelectUserDialog
        isOpen={dialogOpen}
        title="Wybierz osobę, którą chcesz zaprosić"
        users={notAlreadyInvitedUsers}
        onClose={handleDialogClose}
        onSelect={handleSelectUser}
      />
    </>
  );
};

export default InviteUser;
