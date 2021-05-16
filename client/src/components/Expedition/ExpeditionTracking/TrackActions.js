import React, { useCallback, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import {
  distanceKm,
  geolocationAvailable,
  getLocation,
} from '../../../utils/geolocation';

const UPDATE_INTERVAL_MS = 10_000;

const START_TRACK_MUTATION = gql`
  mutation StartTrack($trackId: ID!) {
    startTrack(id: $trackId) {
      id
      started
      startedAt
      stoppedAt
    }
  }
`;

const STOP_TRACK_MUTATION = gql`
  mutation StopTrack($trackId: ID!) {
    stopTrack(id: $trackId) {
      id
      started
      startedAt
      stoppedAt
    }
  }
`;

const ADD_TRACK_LOCATION_MUTATION = gql`
  mutation AddTrackLocation($input: AddTrackLocationInput!) {
    addTrackLocation(input: $input) {
      id
      track {
        id
        locations {
          id
          latitude
          longitude
        }
      }
    }
  }
`;

export default function TrackActions({ track }) {
  const [startTrack, { loading: startLoading }] = useMutation(
    START_TRACK_MUTATION,
    {
      variables: { trackId: track.id },
      onError: () => {},
    }
  );

  const [stopTrack, { loading: stopLoading }] = useMutation(
    STOP_TRACK_MUTATION,
    {
      variables: { trackId: track.id },
      onError: () => {},
    }
  );

  const [addTrackLocation] = useMutation(ADD_TRACK_LOCATION_MUTATION, {
    onError: () => {},
  });

  const isLoading = startLoading || stopLoading;

  const isNewLocation = useCallback(
    (newLocation) => {
      if (track.locations.length === 0) {
        return true;
      }
      const lastLocation = track.locations[track.locations.length - 1];
      const km = distanceKm(
        lastLocation.latitude,
        lastLocation.longitude,
        newLocation.latitude,
        newLocation.longitude
      );
      return km > 0.01;
    },
    [track.locations]
  );

  const maybeUpdateLocation = useCallback(
    () =>
      getLocation().then((location) => {
        if (isNewLocation(location)) {
          const input = { trackId: track.id, ...location };
          addTrackLocation({ variables: { input } });
        }
      }),
    [track.id, isNewLocation, addTrackLocation]
  );

  function handleStopClick(event) {
    stopTrack();
  }

  function handleStartClick(event) {
    getLocation()
      .then(() => {
        startTrack().then(() => maybeUpdateLocation());
      })
      .catch(() => {
        // TODO: show error snackbar
      });
  }

  useEffect(() => {
    if (track.started) {
      const interval = setInterval(() => {
        maybeUpdateLocation();
      }, UPDATE_INTERVAL_MS);

      return () => clearInterval(interval);
    }
  }, [track.started, maybeUpdateLocation]);

  if (isLoading) {
    return <CircularProgress size={32} />;
  }

  if (track.started) {
    return (
      <Button variant="contained" onClick={handleStopClick}>
        Zatrzymaj
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartClick}
        disabled={!geolocationAvailable}
      >
        Start
      </Button>
    );
  }
}
