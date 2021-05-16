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
import InfoIcon from '@material-ui/icons/Info';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { serverUrl } from '../../../../utils/const';


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
}));

const GalleryItem = ({ photo }) => {
  const classes = useStyles();

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
            />
          }
          action={
            <IconButton aria-label="info">
              <InfoIcon />
            </IconButton>
          }
          title={photo.user.displayName}
          subheader={format(new Date(photo.timestamp), 'd LLLL yyyy, HH:mm', {
            locale: pl,
          })}
        />
        <CardMedia
          className={classes.media}
          image={`${serverUrl}${photo.photoUrl}`}
          title="Paella dish"
        />
        {photo.description && (
          <CardContent>
            <Typography variant="body2" component="p">
              {photo.description}
            </Typography>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default GalleryItem;