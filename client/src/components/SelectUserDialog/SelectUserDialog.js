import { useState } from 'react';
import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import SearchField from '../SearchField/SearchField';

const useStyles = makeStyles((theme) => ({
  search: {
    padding: theme.spacing(0, 2),
  },
}));

export default function SelectUserDialog({
  isOpen,
  title,
  users,
  onClose,
  onSelect,
}) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = users.filter((user) =>
    user.displayName?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <Dialog onClose={onClose} aria-labelledby={title} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <SearchField
        className={classes.search}
        value={searchQuery}
        onSearch={setSearchQuery}
      />
      <List>
        {filteredUsers.length === 0 ? (
          <EmptyState />
        ) : (
          filteredUsers.map((user) => (
            <ListItem button onClick={() => onSelect(user)} key={user.id}>
              <ListItemAvatar>
                <UserAvatar displayName={user.displayName} />
              </ListItemAvatar>
              <ListItemText primary={user.displayName} />
            </ListItem>
          ))
        )}
      </List>
    </Dialog>
  );
}

const EmptyState = () => (
  <ListItem>
    <ListItemText primary="Brak użytkowników" />
  </ListItem>
);
