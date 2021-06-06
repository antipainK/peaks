import { gql, useQuery } from '@apollo/client';
import AchievementsList from '../Achievements/AchievementsList';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

const ACHIEVEMENTS_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      achievements {
        id
      }
    }
    achievements {
      id
      title
      description
    }
  }
`;

export default function UserAchievements({ userId }) {
  const { data, error, loading } = useQuery(ACHIEVEMENTS_QUERY, {
    variables: { id: userId },
  });

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  const shapedAchievements = data.achievements
    .map((achievement) => ({
      ...achievement,
      achieved: data.user.achievements.some(
        (userAchievement) => userAchievement.id === achievement.id
      ),
    }))
    .sort((a1, a2) => a1.title.localeCompare(a2.title));

  return (
    <AchievementsList
      achievements={shapedAchievements}
      isLoading={loading}
      withSearch
    />
  );
}
