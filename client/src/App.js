import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageWrapper>
          {currentUser && <Header />}
          <PageContentWrapper isAuth={!!currentUser}>
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
    </BrowserRouter>
  );
}
