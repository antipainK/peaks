import { Box, Container } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router';
import CenteredFormContainer from '../CenteredFormContainer/CenteredFormContainer';
import UploadForm from './UploadForm';

const ADD_TRACK_PHOTO_MUTATION = gql`
  mutation AddTrackPhoto($input: AddTrackPhotoInput!) {
    addTrackPhoto(input: $input) {
      id
      track {
        id
        photos {
          id
          latitude
          longitude
          timestamp
          photoUrl
        }
      }
    }
  }
`;

const UploadPage = () => {
  const history = useHistory();
  const { id: trackId } = useParams();

  const [addTrackPhoto, { loading, error }] = useMutation(
    ADD_TRACK_PHOTO_MUTATION,
    {
      onCompleted: () => history.goBack(),
      onError: () => {},
    }
  );

  const handleSubmit = (data) => {
    const input = { ...data, trackId };
    addTrackPhoto({ variables: { input } });
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <CenteredFormContainer title="Dodaj zdjęcie z wyprawy">
          <UploadForm
            onSubmit={handleSubmit}
            disabled={loading}
            apiError={error}
          />
        </CenteredFormContainer>
      </Box>
    </Container>
  );
};

export default UploadPage;
