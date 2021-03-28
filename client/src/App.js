import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import theme from './theme';
import client from './apollo';
import { openRoutes, protectedRoutes } from './routes/routes';

import { PageWrapper, PageContentWrapper } from './components/PageWrappers';
import Header from './components/Header/Header';

export default function App() {
  const isAuth = true; // TO DO: replace after auth done
  const routes = isAuth ? protectedRoutes : openRoutes;

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageWrapper>
            {isAuth && <Header />}
            <PageContentWrapper isAuth={isAuth}>
              <Switch>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                ))}
                {/* Redirect when no match is found */}
                <Redirect to={isAuth ? '/' : '/login'} />
              </Switch>
            </PageContentWrapper>
          </PageWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
