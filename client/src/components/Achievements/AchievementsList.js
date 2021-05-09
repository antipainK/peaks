import { useState } from 'react';
import {
  ButtonBase,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Achievement from './Achievement';

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

const initDialogProps = { isOpen: false, title: '', description: '' };

export default function AchievementsList({ achievements, isLoading }) {
  const classes = useStyles();
  const [dialogProps, setDialogProps] = useState(initDialogProps);

  return (
    <>
      <Grid container>
        {isLoading ? (
          <LoadingState />
        ) : (
          achievements.map((achievement) => (
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
          ))
        )}
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
    .map((val, idx) => <div></div>);
