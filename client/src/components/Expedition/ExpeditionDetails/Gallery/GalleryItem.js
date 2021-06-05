import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useState } from 'react';
import { serverUrl } from '../../../../utils/const';
import GalleryItemInfoDialog from './GalleryItemInfoDialog';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  media: {
    height: 300,
  },
  mapIcon: {
    marginRight: theme.spacing(0.5),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const GalleryItem = ({ photo }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              alt={photo.user.displayName}
              src={photo.user.photoUrl}
              component={RouterLink}
              to={`/users/${photo.user.id}`}
            />
          }
          action={
            <IconButton aria-label="info" onClick={handleOpenDialog}>
              <InfoIcon />
            </IconButton>
          }
          title={
            <RouterLink className={classes.link} to={`/users/${photo.user.id}`}>
              {photo.user.displayName}
            </RouterLink>
          }
          subheader={format(new Date(photo.timestamp), 'd LLLL yyyy, HH:mm', {
            locale: pl,
          })}
        />
        <CardMedia
          className={classes.media}
          image={`${serverUrl}${photo.photoUrl}`}
          title={`${photo.user.displayName}'s photo`}
        />
        {photo.description && (
          <CardContent>
            <Typography variant="body2" component="p">
              {photo.description}
            </Typography>
          </CardContent>
        )}
      </Card>
      <GalleryItemInfoDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        photo={photo}
      />
    </>
  );
};

export default GalleryItem;
