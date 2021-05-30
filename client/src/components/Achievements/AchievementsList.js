import { useState } from 'react';
import {
  ButtonBase,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Box,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Achievement from './Achievement';
import SearchField from '../SearchField/SearchField';
import { matchQuery } from '../../utils/localSearch';
import ListEmptyState from '../EmptyStates/ListEmptyState';

const useStyles = makeStyles((theme) => ({
  cardButton: {
    width: '100%',
    padding: theme.spacing(1, 0.5),
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

const initDialogProps = { isOpen: false, title: '', description: '' };

export default function AchievementsList({
  achievements,
  isLoading,
  withSearch,
  searchId,
}) {
  const classes = useStyles();
  const [dialogProps, setDialogProps] = useState(initDialogProps);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAchievements = achievements.filter((achievement) =>
    matchQuery(achievement.title, searchQuery)
  );

  return (
    <>
      {withSearch && achievements.length > 0 && (
        <Box pb={2}>
          <SearchField
            value={searchQuery}
            onSearch={setSearchQuery}
            id={searchId || 'achievementSearch'}
          />
        </Box>
      )}
      <Grid container>
        {isLoading && <LoadingState />}
        {!isLoading && filteredAchievements.length === 0 && (
          <ListEmptyState text="Brak odznaczeń" />
        )}
        {!isLoading &&
          filteredAchievements.length > 0 &&
          filteredAchievements.map((achievement) => (
            <Grid key={achievement.id} item xs={6} sm={6} md={3} lg={2}>
              <ButtonBase
                className={classes.cardButton}
                onClick={() =>
                  setDialogProps({
                    isOpen: true,
                    title: achievement.title,
                    description: achievement.description,
                  })
                }
              >
                <Achievement {...achievement} />
              </ButtonBase>
            </Grid>
          ))}
      </Grid>
      <AchievementDialog
        {...dialogProps}
        onClose={() => setDialogProps({ ...dialogProps, isOpen: false })}
      />
    </>
  );
}

const AchievementDialog = ({ isOpen, title, description, onClose }) => (
  <Dialog
    onClose={onClose}
    open={isOpen}
    aria-labelledby="achievement-dialog-title"
    aria-describedby="achievement-dialog-description"
  >
    <DialogTitle id="achievement-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="achievement-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

const LoadingState = () =>
  Array(3)
    .fill('key')
    .map((val, idx) => (
      <Grid key={`${val}-${idx}`} item xs={6} sm={6} md={3} lg={2}>
        <Skeleton variant="circle">
          <Achievement />
        </Skeleton>
        <Skeleton width={100} />
      </Grid>
    ));
