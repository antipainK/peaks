import React from 'react';
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../Logo/Logo';
import backgroundImage from '../../img/mountains.jpg';
import { loginUrl } from '../../utils/const';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing(4, 1),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      height: '80%',
      padding: theme.spacing(8, 2),
    },
  },
  subtitle: {
    maxWidth: '600px',
    margin: theme.spacing(3, 0),
  },
  loginButton: {
    margin: theme.spacing(2, 0),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo color="primary" component="h1" variant="h2" gutterBottom />
          <Typography
            compoonent="h2"
            variant="h5"
            align="center"
            className={classes.subtitle}
          >
            Zaloguj się aby organizować wyprawy górskie, zdobywać odznaczenia
            oraz wiele, wiele więcej!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.loginButton}
            href={loginUrl}
          >
            Zaloguj się z google
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
