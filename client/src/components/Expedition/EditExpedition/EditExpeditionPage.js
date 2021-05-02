import { useMutation, useQuery } from '@apollo/client';
import { Container, Box } from '@material-ui/core';
import gql from 'graphql-tag';
import { useHistory, useParams } from 'react-router';
import Error from '../../Error/Error';
import Loading from '../../Loading/Loading';
import CenteredFormContainer from '../../CenteredFormContainer/CenteredFormContainer';
import CreateExpeditionForm from '../CreateExpedition/CreateExpeditionForm';
import { EXPEDITION_QUERY } from '../sharedQueries';

const GET_AVAILABLE_PEAKS = gql`
  query Peaks {
    peaks {
      id
      name
    }
  }
`;

const UPDATE_EXPEDITION = gql`
  mutation CreateExpedition($input: CreateExpeditionInput!) {
    updateExpedition(input: $input) {
      id
    }
  }
`;

export default function CreateExpeditionPage() {
  const history = useHistory();
  const { id } = useParams();

  const {
    error: peaksQueryError,
    loading: peaksLoading,
    data: peaksQuery,
  } = useQuery(GET_AVAILABLE_PEAKS);
  const {
    data: expeditionData,
    loading: expeditionLoading,
    error: expeditionError,
  } = useQuery(EXPEDITION_QUERY, {
    variables: { id },
  });

  const [
    updateExpedition,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_EXPEDITION, {
    refetchQueries: [{ query: EXPEDITION_QUERY }],
    onCompleted: ({ updateExpedition }) => {
      history.push(`/expeditions/${updateExpedition.id}`);
    },
    onError: () => {},
  });

  const isLoading = peaksLoading || expeditionLoading;
  const error = peaksQueryError || expeditionError;

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const { expedition } = expeditionData;

  const handleSubmit = (data) => {
    updateExpedition({ variables: { input: { ...data, id } } });
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <CenteredFormContainer title="Edytuj wyprawę">
          <CreateExpeditionForm
            availablePeaks={peaksQuery.peaks}
            onSubmit={handleSubmit}
            disabled={updateLoading}
            apiError={updateError}
            defaultValues={{ ...expedition, peakId: expedition.peak.id }}
            isEdit
          />
        </CenteredFormContainer>
      </Box>
    </Container>
  );
}
