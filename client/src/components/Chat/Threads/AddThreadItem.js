import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import SelectUserDialog from '../../SelectUserDialog/SelectUserDialog';
import { THREADS_QUERY } from '../sharedQueries';

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    width: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: theme.spacing(8),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const USERS_QUERY = gql`
  query Users {
    users {
      id
      displayName
    }
    me {
      id
      chats {
        users {
          id
        }
      }
    }
  }
`;

const ADD_THREAD = gql`
  mutation AddedThread($id: ID!) {
    createChat(otherUserId: $id) {
      id
    }
  }
`;

export default function AddThreadItem() {
  const classes = useStyles();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data = {}, loading, error: queryError } = useQuery(USERS_QUERY);

  const [addThread] = useMutation(ADD_THREAD, {
    refetchQueries: [{ query: THREADS_QUERY }],
    onCompleted: ({ createChat }) => {
      if (createChat?.id) history.push(`/messages/thread/${createChat?.id}`);
    },
    onError: () => {},
  });

  const openModal = () => setIsModalOpen(true);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onSelect = (user) => {
    if (user?.id) {
      addThread({ variables: { id: user.id } });
    }
    onClose();
  };

  const { me, users } = data;

  const currentUserId = me?.id || '';

  const filteredUsers =
    users?.filter(
      (user) => user.id !== currentUserId && !haveCommonChat(me, user)
    ) || [];

  return (
    <>
      <ListItem
        button
        onClick={openModal}
        className={classes.listItem}
        disabled={loading || queryError}
      >
        <Hidden lgUp>
          <Avatar alt="Rozpocznij nową konwersację" className={classes.avatar}>
            <AddIcon />
          </Avatar>
        </Hidden>
        <Hidden mdDown>
          <ListItemAvatar>
            <Avatar alt="Rozpocznij konwersację" className={classes.avatar}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Rozpocznij konwersację" />
        </Hidden>
      </ListItem>
      <SelectUserDialog
        isOpen={isModalOpen}
        title="Wybierz z kim chcesz porozmawiać"
        users={filteredUsers}
        onClose={onClose}
        onSelect={onSelect}
      />
    </>
  );
}

const haveCommonChat = (me, otherUser) =>
  me?.chats?.some((chat) =>
    chat.users.some((user) => user.id === otherUser.id)
  );
