import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid, IconButton, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import gql from 'graphql-tag';
import { useState } from 'react';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import SelectUserDialog from '../SelectUserDialog/SelectUserDialog';
import { MY_SENT_INVITES_QUERY } from './sharedQueries';

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(USERS_QUERY);

  const [inviteUser, { error: inviteError }] = useMutation(INVITE_MUTATION, {
    refetchQueries: [{ query: MY_SENT_INVITES_QUERY }],
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
    handleInviteUser(user);
    handleDialogClose();
  };

  const handleInviteUser = (user) => {
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
      <Grid container alignItems="center">
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDialogOpen}
            endIcon={<PersonIcon />}
          >
            Zaproś
          </Button>
          <Tooltip
            title="Jeżeli nie widzisz danej osoby, to znaczy, że bierze już udział
              lub otrzymała już Twoje zaproszenie"
          >
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
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
