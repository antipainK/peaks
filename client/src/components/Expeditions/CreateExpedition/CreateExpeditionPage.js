import { useMutation, useQuery } from '@apollo/client';
import { Container, Box } from '@material-ui/core';
import gql from 'graphql-tag';
import { useHistory } from 'react-router';
import Error from '../../Error/Error';
import Loading from '../../Loading/Loading';
import CenteredFormContainer from '../../CenteredFormContainer/CenteredFormContainer';
import CreateExpeditionForm from './CreateExpeditionForm';
import { EXPEDITIONS_QUERY } from '../ExpeditionListPage';

const GET_AVAILABLE_PEAKS = gql`
  query Peaks {
    peaks {
      id
      name
    }
  }
`;

const CREATE_EXPEDITION = gql`
  mutation CreateExpedition($input: CreateExpeditionInput!) {
    createExpedition(input: $input) {
      id
    }
  }
`;

export default function CreateExpeditionPage() {
  const history = useHistory();

  const {
    error: peaksQueryError,
    loading: peaksLoading,
    data: peaksQuery,
  } = useQuery(GET_AVAILABLE_PEAKS);

  const [createExpedition, { loading, error }] = useMutation(
    CREATE_EXPEDITION,
    {
      refetchQueries: [{ query: EXPEDITIONS_QUERY }],
      onCompleted: () => {
        history.push('/expeditions'); // TODO: redirect to expedition details page
      },
      onError: () => {},
    }
  );

  if (peaksQueryError) return <Error error={peaksQueryError} />;
  if (peaksLoading) return <Loading />;

  const handleSubmit = (data) => {
    createExpedition({ variables: { input: data } });
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <CenteredFormContainer title="Zaplanuj nową wyprawę">
          <CreateExpeditionForm
            availablePeaks={peaksQuery.peaks}
            onSubmit={handleSubmit}
            disabled={loading}
            apiError={error}
          />
        </CenteredFormContainer>
      </Box>
    </Container>
  );
}
