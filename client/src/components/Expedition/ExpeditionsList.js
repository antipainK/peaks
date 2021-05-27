import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonBase, Grid, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import EventIcon from '@material-ui/icons/Event';
import { formatDate } from '../../utils/date';
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
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  title: {
    fontWeight: 500,
  },
}));

export default function ExpeditionsList({ expeditions, withSearch, searchId }) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredExpeditions = expeditions.filter((expedition) =>
    matchQuery(expedition.title, searchQuery)
  );

  return (
    <>
      {withSearch && expeditions.length > 0 && (
        <Box pb={2}>
          <SearchField
            value={searchQuery}
            onSearch={setSearchQuery}
            id={searchId || 'expeditionSearch'}
          />
        </Box>
      )}
      <Grid container spacing={3}>
        {filteredExpeditions.length === 0 ? (
          <ListEmptyState text="Brak wypraw" />
        ) : (
          filteredExpeditions.map((expedition) => (
            <Grid key={expedition.id} item xs={12} sm={6} md={4}>
              <ButtonBase
                className={classes.cardButton}
                component={RouterLink}
                to={`/expeditions/${expedition.id}`}
              >
                <Paper elevation={2} className={classes.cardPaper}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography variant="subtitle1" className={classes.title}>
                        {expedition.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {expedition.author && (
                        <Typography variant="body2" gutterBottom>
                          Organizator: {expedition.author.displayName}
                        </Typography>
                      )}
                      {expedition.maxParticipants && (
                        <Typography variant="body2" gutterBottom>
                          Limit uczestników: {expedition.maxParticipants}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      <Grid container spacing={3} alignItems="center">
                        {expedition.peak && (
                          <Grid item>
                            <FlagIcon
                              fontSize="small"
                              color="action"
                              className={classes.icon}
                            />
                            <Typography variant="body2" component="span">
                              {expedition.peak.name}
                            </Typography>
                          </Grid>
                        )}
                        <Grid item>
                          <EventIcon
                            fontSize="small"
                            color="action"
                            className={classes.icon}
                          />
                          <Typography variant="body2" component="span">
                            {formatDate(expedition.date)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </ButtonBase>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
