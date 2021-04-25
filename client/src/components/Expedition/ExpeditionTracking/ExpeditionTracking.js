import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpeditionMap from './ExpeditionMap';
import TracksList from './TracksList';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function ExpeditionTracking() {
  const classes = useStyles();
  const [track, setTrack] = useState(null);

  const peak = {
    "longitude": 19.529444,
    "latitude": 49.573334,
  };

  const tracks = [
    {
      id: "1",
      user: {
        displayName: "Jonatan Kłosko",
        photoUrl: "https://lh3.googleusercontent.com/a-/AOh14GibS3CFDpdQARedJkb9kE7z1LCt5YfWX70DnV7w=s96-c",
      },
      locations: [
        {latitude: 49.573334, longitude: 19.529444},
        {latitude: 49.571817, longitude: 19.529444},
        {latitude: 49.570000, longitude: 19.529444},
        {latitude: 49.568500, longitude: 19.529444},
        {latitude: 49.567000, longitude: 19.529444},
      ],
    },
    {
      id: "2",
      user: {
        displayName: "Rick Sanchez",
        photoUrl: "https://lh3.googleusercontent.com/a-/AOh14GibS3CFDpdQARedJkb9kE7z1LCt5YfWX70DnV7w=s96-c",
      },
      locations: [
        {latitude: 49.573334, longitude: 19.529444},
        {latitude: 49.573334, longitude: 19.528444},
        {latitude: 49.573034, longitude: 19.527044},
        {latitude: 49.572534, longitude: 19.525044},
      ],
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="outlined" color="primary">
          Rozpocznij
        </Button>
      </Grid>
      <Grid item className={classes.grow} xs={12} md="auto">
        <ExpeditionMap peak={peak} track={track} height={400} />
      </Grid>
      {tracks.length > 0 && (
        <Grid item xs={12} md="auto">
          <TracksList tracks={tracks} selectedTrack={track} onTrackSelected={setTrack} />
        </Grid>
      )}
    </Grid>
  );
}
