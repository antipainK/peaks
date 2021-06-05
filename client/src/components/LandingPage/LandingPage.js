import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import mountainsImage from '../../img/landingpage-mountains.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  imgBackground: {
    height: '40%',
    [theme.breakpoints.up('md')]: {
      height: '50%',
    },
    backgroundImage: `url(${mountainsImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  cardsContainer: {
    overflow: 'hidden',
    padding: theme.spacing(2, 1),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 2),
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  expeditionsCard: {
    [theme.breakpoints.down('sm')]: {
      order: -1,
    },
  },
  cardContent: {
    flex: '1 1 auto',
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardSubtitle: {
    fontWeight: 500,
  },
  cardDescription: {
    color: theme.palette.grey[700],
    maxWidth: '500px',
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Container
      className={classes.root}
      component="main"
      maxWidth={false}
      disableGutters
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.imgBackground}
      >
        <Logo component="h1" variant="h2" align="center" gutterBottom />
        <Typography component="h2" variant="h4" align="center">
          Z nami wejdziesz jeszcze wyżej
        </Typography>
      </Grid>
      <Container maxWidth="lg" className={classes.cardsContainer}>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={5}
        >
          <Grid item xs={12} md={4}>
            <CustomCard>
              <CustomCardTitle title="Odznaczenia" />
              <CustomCardContent
                subtitle="Sprawdź się"
                description="Zdobywaj odznaczenia za zdobyte szczyty i pokaż innym swoją pasję!
                Możesz również skorzystać ze statystyk i sprawdzić
                jak wypadasz na tle innych użytkowników."
              />
              <CardActions>
                <CustomButton to="/">Statystyki</CustomButton>
                <CustomButton to="/profile?tab=badges">
                  Moje odznaczenia
                </CustomButton>
              </CardActions>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={4} className={classes.expeditionsCard}>
            <CustomCard>
              <CustomCardTitle title="Wyprawy" />
              <CustomCardContent
                subtitle="W grupie raźniej"
                description="Twórz, dołączaj i zapraszaj na zorganizowane wyprawy!
                Możesz śledzić swoją trasę, udostępniać zdjęcia ze szczytów,
                a także zdobywać nowe osiągnięcia wraz ze swoimi znajomymi."
              />
              <CardActions>
                <CustomButton to="/expeditions">
                  Nadchodzące wyprawy
                </CustomButton>
                <CustomButton to="/expeditions/create">
                  Zaplanuj wyprawę
                </CustomButton>
              </CardActions>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomCard>
              <CustomCardTitle title="Ludzie" />
              <CustomCardContent
                subtitle="Łączy nas ta sama pasja"
                description="Poznaj różne osoby, które są tak samo zakręcone na
                  punkcie wypraw górskich! Użyj czatu aby porozmawiać, zapraszaj
                  innych na wspólne wyprawy i nie zapomnij uzupełnić informacji
                  o sobie w zakładce profil."
              />
              <CardActions>
                <CustomButton to="/messages">Chat</CustomButton>
                <CustomButton to="/users">Poznaj innych</CustomButton>
              </CardActions>
            </CustomCard>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

const CustomCard = ({ children }) => {
  const classes = useStyles();
  return <Card className={classes.card}>{children}</Card>;
};

const CustomCardTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <CardHeader
      title={title}
      titleTypographyProps={{ align: 'center' }}
      subheaderTypographyProps={{ align: 'center' }}
      className={classes.cardHeader}
    />
  );
};

const CustomCardContent = ({ subtitle, description }) => {
  const classes = useStyles();
  return (
    <CardContent className={classes.cardContent}>
      <Typography
        variant="subtitle1"
        className={classes.cardSubtitle}
        gutterBottom
      >
        {subtitle}
      </Typography>
      <Typography
        variant="body2"
        component="div"
        className={classes.cardDescription}
      >
        {description}
      </Typography>
    </CardContent>
  );
};

const CustomButton = ({ to, children }) => (
  <Button size="small" color="primary" component={RouterLink} to={to}>
    {children}
  </Button>
);
