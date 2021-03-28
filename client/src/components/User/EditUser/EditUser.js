import { Container, Box } from '@material-ui/core';
import CenteredFormContainer from '../../CenteredFormContainer/CenteredFormContainer';
import EditUserForm from './EditUserForm/EditUserFrom';

// temporary data, delete after implementing the query
const sampleUser = {
  displayName: 'Jan Kowalski',
  city: 'Warszawa',
  contact:
    'Twitter: @jkowalski, Email: jkowalski@gmail.com',
};

function EditUser() {
  // TODO: useQuery to get currently logged in user's data

  // TODO: perform a Mutation with a handler from useMutation
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <CenteredFormContainer title="Edytuj swój profil">
          <EditUserForm
            initialValue={sampleUser} // pass user data acquired from useQuery
            onSubmit={handleSubmit}
            disabled={false} // loading from useMutation
            apiError={false} // error from useMutation
          />
        </CenteredFormContainer>
      </Box>
    </Container>
  );
}

export default EditUser;
