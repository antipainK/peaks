import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

export default function LandingPage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          This is a test page
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          If you see this then everything is ok
        </Typography>
      </Box>
    </Container>
  );
}
