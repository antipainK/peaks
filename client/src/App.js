import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';

import theme from './theme';
import client from './apollo';

import { PageWrapper, PageContentWrapper } from './components/PageWrappers';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';

export default function App() {
  const isAuth = false; // TO DO: replace after auth done

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageWrapper>
          {isAuth && <Header />}
          <PageContentWrapper>
            <LoginPage />
          </PageContentWrapper>
        </PageWrapper>
      </ThemeProvider>
    </ApolloProvider>
  );
}
