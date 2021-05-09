import { gql, useQuery } from '@apollo/client';
import AchievementsList from '../Achievements/AchievementsList';

const ACHIEVEMENTS_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const mockAchievements = [
  {
    id: '1',
    title: 'Kowadło',
    description: 'xd',
    achieved: false,
  },
  {
    id: '2',
    title: 'Klasa',
    description: 'xd2',
    achieved: true,
  },
];

export default function UserAchievements() {
  const { error, loading, data } = useQuery(ACHIEVEMENTS_QUERY);

  const achievements = error ? [] : mockAchievements;

  return <AchievementsList achievements={achievements} isLoading={loading} />;
}
