import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  ButtonBase,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';
import EventIcon from '@material-ui/icons/Event';
import CloseIcon from '@material-ui/icons/Close';
import { formatDate } from '../../utils/date';
import SearchField from '../SearchField/SearchField';
import { matchQuery } from '../../utils/localSearch';

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

export default function ExpeditionInvitesList({
  expeditionInvites,
  onRejectInvite,
  withSearch,
  searchId,
}) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredInvites = expeditionInvites.filter(({ expedition }) =>
    matchQuery(expedition.title, searchQuery)
  );

  const iconsSection = (peakName, expeditionDate) => (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <FlagIcon fontSize="small" color="action" className={classes.icon} />
        <Typography variant="body2" component="span">
          {peakName}
        </Typography>
      </Grid>
      <Grid item>
        <EventIcon fontSize="small" color="action" className={classes.icon} />
        <Typography variant="body2" component="span">
          {formatDate(expeditionDate)}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      {withSearch && expeditionInvites.length > 0 && (
        <Box pb={2}>
          <SearchField
            value={searchQuery}
            onSearch={setSearchQuery}
            id={searchId || 'expeditionInvitesSearch'}
          />
        </Box>
      )}
      <Grid container direction="column" spacing={2}>
        {filteredInvites.map(({ id, timestamp, from, expedition }) => (
          <Grid item key={id}>
            <ButtonBase
              className={classes.cardButton}
              component={RouterLink}
              to={`/expeditions/${expedition.id}`}
            >
              <Paper elevation={1} className={classes.cardPaper}>
                <Grid container direction="column" spacing={1}>
                  {/* Header section */}
                  <Grid
                    item
                    container
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="subtitle1" className={classes.title}>
                        {expedition.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Hidden smDown>
                          <Grid item>
                            {iconsSection(
                              expedition.peak.name,
                              expedition.date
                            )}
                          </Grid>
                        </Hidden>
                        <Grid item>
                          <IconButton
                            size="small"
                            onClick={(e) => onRejectInvite(e, id)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* End of header section */}
                  <Hidden mdUp>
                    <Grid item>
                      {iconsSection(expedition.peak.name, expedition.date)}
                    </Grid>
                  </Hidden>
                  <Grid item>
                    <Typography variant="caption">
                      Otrzymano {formatDate(timestamp)} od {from.displayName}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
