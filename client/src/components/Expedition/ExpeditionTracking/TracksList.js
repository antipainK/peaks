import { useState } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Box,
} from '@material-ui/core';
import SearchField from '../../SearchField/SearchField';
import { matchQuery } from '../../../utils/localSearch';

export default function TracksList({
  tracks,
  selectedTrack,
  onTrackSelected,
  withSearch,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTracks = tracks.filter((track) =>
    matchQuery(track.user.displayName, searchQuery)
  );
  return (
    <Paper>
      <List subheader={<ListSubheader>Relacje</ListSubheader>}>
        {withSearch && (
          <Box pb={1}>
            <SearchField
              id="tracksSearch"
              value={searchQuery}
              onSearch={setSearchQuery}
            />
          </Box>
        )}
        {filteredTracks.length === 0 ? (
          <EmptyState />
        ) : (
          filteredTracks.map((track) => (
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
          ))
        )}
      </List>
    </Paper>
  );
}

const EmptyState = () => (
  <ListItem>
    <ListItemText secondary="Brak relacji" />
  </ListItem>
);
