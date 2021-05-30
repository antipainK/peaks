import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import pl from 'date-fns/locale/pl';

import theme from './theme';
import { openRoutes, protectedRoutes } from './routes/routes';

import { PageWrapper, PageContentWrapper } from './components/PageWrappers';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';

const ME = gql`
  query {
    me {
      id
    }
  }
`;

export default function App() {
  const { error, loading, data } = useQuery(ME);
  const currentUser = data?.me;

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const routes = currentUser ? protectedRoutes : openRoutes;

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageWrapper>
            {currentUser && <Header />}
            {/* For some reason the styles don't update after auth change,
                so we use key to force remount */}
            <PageContentWrapper isAuth={!!currentUser} key={!!currentUser}>
              <Switch>
                {routes.map((route) => (
                  <Route key={route.path} {...route} />
                ))}
                {/* Redirect when no match is found */}
                <Redirect to={currentUser ? '/' : '/login'} />
              </Switch>
            </PageContentWrapper>
          </PageWrapper>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}
