import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonBase, Grid, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchField from '../SearchField/SearchField';
import { matchQuery } from '../../utils/localSearch';
import ListEmptyState from '../EmptyStates/ListEmptyState';

const useStyles = makeStyles((theme) => ({
  cardButton: {
    width: '100%',
  },
  cardPaper: {
    padding: theme.spacing(2),
    width: '100%',
  },
}));

export default function PeaksList({ peaks, withSearch, searchId }) {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState('');
  const filteredPeaks = peaks
    .filter((peak) => matchQuery(peak.name, searchQuery))
    .sort((x, y) => x.name.localeCompare(y.name));

  return (
    <>
      {withSearch && peaks.length > 0 && (
        <Box pb={2}>
          <SearchField
            value={searchQuery}
            onSearch={setSearchQuery}
            id={searchId || 'peaksSearch'}
          />
        </Box>
      )}
      <Grid container spacing={3}>
        {filteredPeaks.length === 0 ? (
          <ListEmptyState text="Brak szczytów" />
        ) : (
          filteredPeaks.map((peak) => (
            <Grid key={peak.id} item xs={12} sm={6} md={4}>
              <ButtonBase
                className={classes.cardButton}
                component={RouterLink}
                to={`/peaks/${peak.id}`}
              >
                <Paper elevation={2} className={classes.cardPaper}>
                  <Typography variant="subtitle2" gutterBottom>
                    {peak.name}
                  </Typography>
                  <Typography variant="body2">{peak.mountainRange}</Typography>
                </Paper>
              </ButtonBase>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
