import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
} from '@material-ui/core';

export default function TracksList({ tracks, selectedTrack, onTrackSelected }) {
  return (
    <Paper>
      <List subheader={<ListSubheader>Relacje</ListSubheader>}>
        {tracks.map((track) => (
          <ListItem
            key={track.id}
            button
            onClick={(event) => onTrackSelected(track)}
            selected={selectedTrack && track.id === selectedTrack.id}
          >
            <ListItemAvatar>
              <Avatar src={track.user.photoUrl} />
            </ListItemAvatar>
            <ListItemText primary={track.user.displayName} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
