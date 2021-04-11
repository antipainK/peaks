import { useRouteMatch } from 'react-router-dom';

export default function useCurrentThreadId() {
  const match = useRouteMatch('/messages/thread/:id');
  return match?.params?.id;
}
