import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpeditionMap from './ExpeditionMap';
import TracksList from './TracksList';
import Loading from '../../Loading/Loading';
import Error from '../../Error/Error';
import TrackActions from './TrackActions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export const EXPEDITION_TRACKING_QUERY = gql`
  query ExpeditionTracking($expeditionId: ID!) {
    me {
      id
    }
    expedition(id: $expeditionId) {
      id
      peak {
        id
        latitude
        longitude
      }
      tracks {
        id
        started
        startedAt
        user {
          id
          photoUrl
          displayName
        }
        locations {
          id
          latitude
          longitude
        }
      }
    }
  }
`;

export default function ExpeditionTracking({ expeditionId }) {
  const classes = useStyles();
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const { data, loading, error } = useQuery(EXPEDITION_TRACKING_QUERY, {
    variables: { expeditionId },
  });

  const me = data?.me;
  const expedition = data?.expedition;
  const peak = expedition?.peak;
  const tracks = expedition?.tracks?.filter(
    (track) => track.startedAt && track.locations.length > 0
  );
  const myTrack =
    me && expedition?.tracks?.find((track) => track.user.id === me.id);
  const selectedTrack = tracks?.find((track) => track.id === selectedTrackId);

  useEffect(() => {
    if (myTrack?.id) {
      setSelectedTrackId(myTrack?.id);
    }
  }, [myTrack?.id]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} justify="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              onClick={(event) => setSelectedTrackId(null)}
            >
              Pokaż szczyt
            </Button>
          </Grid>
          <Grid item>{myTrack && <TrackActions track={myTrack} />}</Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.grow} xs={12} md="auto">
        <ExpeditionMap peak={peak} track={selectedTrack} height={400} />
      </Grid>
      {tracks.length > 0 && (
        <Grid item xs={12} md="auto">
          <TracksList
            tracks={tracks}
            selectedTrack={selectedTrack}
            onTrackSelected={(track) => setSelectedTrackId(track.id)}
          />
        </Grid>
      )}
    </Grid>
  );
}
