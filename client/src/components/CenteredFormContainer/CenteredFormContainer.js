import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    width: '100%',
  },
}));

function CenteredFormContainer({ title, children }) {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item className={classes.content}>
        {children}
      </Grid>
    </Grid>
  );
}

export default CenteredFormContainer;
