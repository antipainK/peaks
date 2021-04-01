import { useMutation, useQuery } from '@apollo/client';
import { Container, Box } from '@material-ui/core';
import gql from 'graphql-tag';
import { useHistory } from 'react-router';
import CenteredFormContainer from '../../CenteredFormContainer/CenteredFormContainer';
import EditUserForm from './EditUserForm';

const ME = gql`
  query {
    me {
      id
      email
      displayName
      city
      contact
    }
  }
`;

const UPDATE_ME = gql`
  mutation UpdateMe($input: UpdateMeInput!) {
    updateMe(input: $input) {
      id
    }
  }
`;

function EditUser() {
  const history = useHistory();

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(ME);
  const user = queryData?.me;

  const [
    updateUser,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_ME, {
    refetchQueries: [{ query: ME }],
    onCompleted: () => history.goBack(),
    onError: () => {},
  });

  const handleSubmit = (data) => {
    updateUser({ variables: { input: data } });
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <CenteredFormContainer title="Edytuj swój profil">
          {user && <EditUserForm
            initialValue={user}
            onSubmit={handleSubmit}
            disabled={queryLoading || updateLoading}
            apiError={queryError || updateError}
          />}
        </CenteredFormContainer>
      </Box>
    </Container>
  );
}

export default EditUser;
