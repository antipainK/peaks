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
      <Typography variant="h6" gutterBottom>
        Opis wyprawy
      </Typography>
      <Paper className={classes.descriptionPaper} elevation={2}>
        {!description && <DescriptionEmptyState />}
        {description && <Typography>{description}</Typography>}
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
