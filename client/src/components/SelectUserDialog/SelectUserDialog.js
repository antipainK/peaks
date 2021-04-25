import { useState } from 'react';
import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from '../UserAvatar/UserAvatar';

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
      <TextField
        id="search-dialog-users"
        className={classes.search}
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Szukaj..."
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
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
