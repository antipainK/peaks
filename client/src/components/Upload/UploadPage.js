import { Box, Container } from '@material-ui/core';
import CenteredFormContainer from '../CenteredFormContainer/CenteredFormContainer';
import UploadForm from './UploadForm';

const UploadPage = () => {

  const handleSubmit = (data) => {
    console.log(data);
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <CenteredFormContainer title="Dodaj zdjęcie z wyprawy">
          <UploadForm onSubmit={handleSubmit} />
        </CenteredFormContainer>
      </Box>
    </Container>
  );
};

export default UploadPage;
