import { Grid, Typography } from '@material-ui/core';
import GalleryItem from './GalleryItem';

const Gallery = ({ photos }) => (
  <Grid container direction="column" spacing={2}>
    <Grid item>
      <Typography component="h2" variant="h6" gutterBottom>
        Galeria ({photos.length})
      </Typography>
    </Grid>
    <Grid item>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item key={photo.id} xs={12} md={6} lg={4}>
            <GalleryItem photo={photo} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export default Gallery;
