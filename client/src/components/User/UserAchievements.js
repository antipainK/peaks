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
    title: 'Zdobycie szczytu: Kowadło',
    description:
      'Te odznaczenie możesz otrzymać jeśli zdobędziesz szczyt Kowadło podczas jednej ze swoich wypraw.',
    achieved: false,
  },
  {
    id: '2',
    title: 'Zdobycie szczytu: Rysy',
    description:
      'Te odznaczenie możesz otrzymać jeśli zdobędziesz szczyt Rysy podczas jednej ze swoich wypraw.',
    achieved: true,
  },
  {
    id: '3',
    title: 'Zdobycie szczytu: Babia Góra',
    description:
      'Te odznaczenie możesz otrzymać jeśli zdobędziesz szczyt Babia Góra podczas jednej ze swoich wypraw.',
    achieved: false,
  },
  {
    id: '4',
    title: 'Zdobycie szczytu: Wielka Sowa',
    description:
      'Te odznaczenie możesz otrzymać jeśli zdobędziesz szczyt Wielka Sowa podczas jednej ze swoich wypraw.',
    achieved: false,
  },
  {
    id: '5',
    title: 'Zdobycie szczytu: Biskupia Kopa',
    description:
      'Te odznaczenie możesz otrzymać jeśli' +
      ' zdobędziesz szczyt Biskupia Kopa podczas jednej ze swoich wypraw.',
    achieved: true,
  },
];

export default function UserAchievements() {
  const { error, loading } = useQuery(ACHIEVEMENTS_QUERY);

  const achievements = error ? [] : mockAchievements;

  return <AchievementsList achievements={achievements} isLoading={loading} />;
}
