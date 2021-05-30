import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Grid, Hidden, IconButton, Tooltip } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ImageIcon from '@material-ui/icons/Image';
import { isToday } from 'date-fns';
import ExpeditionMap from './ExpeditionMap';
import TracksList from './TracksList';
import Loading from '../../Loading/Loading';
import Error from '../../Error/Error';
import TrackActions from './TrackActions';
import { EXPEDITION_TRACKING_QUERY } from '../sharedQueries';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  buttonsContainer: {
    display: 'flex',
  },
  photoUploadButton: {
    marginLeft: theme.spacing(0.8),
  },
}));

export default function ExpeditionTracking({ expeditionId, scrollToDetails }) {
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

  const isExpeditionDay = isToday(new Date(expedition?.date));

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
        <Grid container spacing={1} justify="space-between">
          <Grid item className={classes.buttonsContainer}>
            <Hidden xsDown>
              <Button
                variant="outlined"
                onClick={() => setSelectedTrackId(null)}
                endIcon={<FilterHdrIcon />}
              >
                Pokaż szczyt
              </Button>
            </Hidden>
            <Hidden smUp>
              <IconButton
                color="primary"
                size="small"
                onClick={() => scrollToDetails && scrollToDetails()}
              >
                <ArrowDownwardIcon />
              </IconButton>
              <IconButton size="small" onClick={() => setSelectedTrackId(null)}>
                <FilterHdrIcon />
              </IconButton>
            </Hidden>
            {myTrack?.id && (
              <Tooltip title="Dodaj zdjęcie">
                <IconButton
                  component={RouterLink}
                  to={`/tracks/${myTrack.id}/upload`}
                  size="small"
                  className={classes.photoUploadButton}
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item>
            {myTrack && isExpeditionDay && <TrackActions track={myTrack} />}
          </Grid>
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
            withSearch
          />
        </Grid>
      )}
    </Grid>
  );
}
