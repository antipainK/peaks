import { Paper, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  descriptionPaper: {
    padding: theme.spacing(2),
  },
}));

const Description = ({ description }) => {
  const classes = useStyles();
  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Opis wyprawy
      </Typography>
      <Paper className={classes.descriptionPaper} elevation={2}>
        {description ? (
          <Typography>{description}</Typography>
        ) : (
          <DescriptionEmptyState />
        )}
      </Paper>
    </>
  );
};

export default Description;

const DescriptionEmptyState = () => (
  <Typography variant="subtitle2">
    <Box color="text.secondary">Brak opisu...</Box>
  </Typography>
);
