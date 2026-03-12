export const HERO_IMAGE = "https://cdn.poehali.dev/projects/2a86203d-5c69-41c5-94ca-bbf83eb2d3a8/files/1d596a42-3217-4ff0-9fd2-e2767427c412.jpg";

export interface Player {
  id: string;
  nickname: string;
  realName: string;
  role: string;
  age: number;
  country: string;
  teamId: string;
  avatar: string;
  stats: {
    rating: number;
    kd: number;
    adr: number;
    kpr: number;
    hsPercent: number;
    mapsPlayed: number;
    wins: number;
  };
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logo: string;
  country: string;
  wins: number;
  losses: number;
  rating: number;
  rank: number;
  playerIds: string[];
  founded: string;
  coach: string;
}

export interface MatchPlayer {
  playerId: string;
  kills: number;
  deaths: number;
  assists: number;
  adr: number;
  hsPercent: number;
  rating: number;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  score1: number;
  score2: number;
  maps: string[];
  date: string;
  tournament: string;
  tournamentId: string;
  status: 'upcoming' | 'live' | 'finished';
  mapStats: {
    map: string;
    score1: number;
    score2: number;
    team1Players: MatchPlayer[];
    team2Players: MatchPlayer[];
  }[];
}

export interface Tournament {
  id: string;
  name: string;
  status: 'active' | 'upcoming' | 'finished';
  prizePool: string;
  startDate: string;
  endDate: string;
  teams: number;
  format: string;
  location: string;
  winner?: string;
  logo: string;
}

export const players: Player[] = [
  {
    id: 'p1', nickname: 'Phantom', realName: 'Алексей Смирнов', role: 'IGL', age: 21, country: 'RU',
    teamId: 't1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phantom&backgroundColor=1e3a5f',
    stats: { rating: 1.24, kd: 1.31, adr: 78.4, kpr: 0.74, hsPercent: 48, mapsPlayed: 112, wins: 71 }
  },
  {
    id: 'p2', nickname: 'Spectre', realName: 'Дмитрий Волков', role: 'AWP', age: 22, country: 'RU',
    teamId: 't1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Spectre&backgroundColor=1e3a5f',
    stats: { rating: 1.31, kd: 1.42, adr: 82.1, kpr: 0.79, hsPercent: 35, mapsPlayed: 112, wins: 71 }
  },
  {
    id: 'p3', nickname: 'Shadow', realName: 'Иван Петров', role: 'Rifler', age: 20, country: 'RU',
    teamId: 't1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow&backgroundColor=1e3a5f',
    stats: { rating: 1.18, kd: 1.22, adr: 74.6, kpr: 0.71, hsPercent: 52, mapsPlayed: 108, wins: 68 }
  },
  {
    id: 'p4', nickname: 'Wraith', realName: 'Никита Козлов', role: 'Entry', age: 23, country: 'RU',
    teamId: 't1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wraith&backgroundColor=1e3a5f',
    stats: { rating: 1.15, kd: 1.19, adr: 79.3, kpr: 0.82, hsPercent: 58, mapsPlayed: 108, wins: 68 }
  },
  {
    id: 'p5', nickname: 'Eclipse', realName: 'Сергей Морозов', role: 'Support', age: 24, country: 'RU',
    teamId: 't1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eclipse&backgroundColor=1e3a5f',
    stats: { rating: 1.09, kd: 1.05, adr: 65.2, kpr: 0.62, hsPercent: 44, mapsPlayed: 112, wins: 71 }
  },
  {
    id: 'p6', nickname: 'Venom', realName: 'Артём Новиков', role: 'IGL', age: 25, country: 'RU',
    teamId: 't2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Venom&backgroundColor=0d2137',
    stats: { rating: 1.19, kd: 1.25, adr: 77.8, kpr: 0.73, hsPercent: 46, mapsPlayed: 98, wins: 58 }
  },
  {
    id: 'p7', nickname: 'Pulse', realName: 'Максим Соколов', role: 'AWP', age: 21, country: 'RU',
    teamId: 't2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pulse&backgroundColor=0d2137',
    stats: { rating: 1.28, kd: 1.38, adr: 80.5, kpr: 0.76, hsPercent: 32, mapsPlayed: 98, wins: 58 }
  },
  {
    id: 'p8', nickname: 'Storm', realName: 'Владимир Зайцев', role: 'Rifler', age: 22, country: 'RU',
    teamId: 't2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Storm&backgroundColor=0d2137',
    stats: { rating: 1.14, kd: 1.17, adr: 72.3, kpr: 0.69, hsPercent: 50, mapsPlayed: 95, wins: 56 }
  },
  {
    id: 'p9', nickname: 'Blaze', realName: 'Роман Сидоров', role: 'Entry', age: 20, country: 'RU',
    teamId: 't2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blaze&backgroundColor=0d2137',
    stats: { rating: 1.12, kd: 1.16, adr: 76.4, kpr: 0.80, hsPercent: 55, mapsPlayed: 95, wins: 56 }
  },
  {
    id: 'p10', nickname: 'Frost', realName: 'Андрей Кузнецов', role: 'Support', age: 23, country: 'RU',
    teamId: 't2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frost&backgroundColor=0d2137',
    stats: { rating: 1.05, kd: 1.02, adr: 62.7, kpr: 0.60, hsPercent: 41, mapsPlayed: 98, wins: 58 }
  },
  {
    id: 'p11', nickname: 'Titan', realName: 'Кирилл Попов', role: 'IGL', age: 26, country: 'RU',
    teamId: 't3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Titan&backgroundColor=102030',
    stats: { rating: 1.16, kd: 1.20, adr: 74.1, kpr: 0.71, hsPercent: 43, mapsPlayed: 88, wins: 47 }
  },
  {
    id: 'p12', nickname: 'Razor', realName: 'Павел Лебедев', role: 'AWP', age: 22, country: 'RU',
    teamId: 't3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Razor&backgroundColor=102030',
    stats: { rating: 1.22, kd: 1.29, adr: 78.9, kpr: 0.74, hsPercent: 30, mapsPlayed: 88, wins: 47 }
  },
  {
    id: 'p13', nickname: 'Havoc', realName: 'Денис Захаров', role: 'Rifler', age: 21, country: 'RU',
    teamId: 't3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Havoc&backgroundColor=102030',
    stats: { rating: 1.10, kd: 1.13, adr: 70.5, kpr: 0.67, hsPercent: 49, mapsPlayed: 85, wins: 45 }
  },
  {
    id: 'p14', nickname: 'Inferno', realName: 'Евгений Михайлов', role: 'Entry', age: 20, country: 'RU',
    teamId: 't3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Inferno&backgroundColor=102030',
    stats: { rating: 1.08, kd: 1.11, adr: 73.2, kpr: 0.78, hsPercent: 54, mapsPlayed: 85, wins: 45 }
  },
  {
    id: 'p15', nickname: 'Cipher', realName: 'Олег Тихонов', role: 'Support', age: 24, country: 'RU',
    teamId: 't3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cipher&backgroundColor=102030',
    stats: { rating: 1.03, kd: 0.99, adr: 60.8, kpr: 0.58, hsPercent: 40, mapsPlayed: 88, wins: 47 }
  },
  {
    id: 'p16', nickname: 'Nexus', realName: 'Тимур Воронов', role: 'IGL', age: 23, country: 'RU',
    teamId: 't4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus&backgroundColor=0a1f35',
    stats: { rating: 1.11, kd: 1.14, adr: 71.3, kpr: 0.69, hsPercent: 44, mapsPlayed: 76, wins: 38 }
  },
  {
    id: 'p17', nickname: 'Apex', realName: 'Руслан Гусев', role: 'AWP', age: 21, country: 'RU',
    teamId: 't4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Apex&backgroundColor=0a1f35',
    stats: { rating: 1.18, kd: 1.24, adr: 76.2, kpr: 0.72, hsPercent: 33, mapsPlayed: 76, wins: 38 }
  },
  {
    id: 'p18', nickname: 'Dusk', realName: 'Игорь Крылов', role: 'Rifler', age: 22, country: 'RU',
    teamId: 't4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dusk&backgroundColor=0a1f35',
    stats: { rating: 1.07, kd: 1.09, adr: 68.7, kpr: 0.65, hsPercent: 47, mapsPlayed: 73, wins: 36 }
  },
  {
    id: 'p19', nickname: 'Cobra', realName: 'Станислав Быков', role: 'Entry', age: 20, country: 'RU',
    teamId: 't4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cobra&backgroundColor=0a1f35',
    stats: { rating: 1.05, kd: 1.07, adr: 70.1, kpr: 0.76, hsPercent: 52, mapsPlayed: 73, wins: 36 }
  },
  {
    id: 'p20', nickname: 'Quake', realName: 'Виктор Беляев', role: 'Support', age: 25, country: 'RU',
    teamId: 't4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quake&backgroundColor=0a1f35',
    stats: { rating: 0.99, kd: 0.95, adr: 58.4, kpr: 0.56, hsPercent: 38, mapsPlayed: 76, wins: 38 }
  },
];

export const teams: Team[] = [
  {
    id: 't1', name: 'PHANTOM FORCE', tag: 'PF', logo: '👻', country: 'RU',
    wins: 71, losses: 41, rating: 1847, rank: 1,
    playerIds: ['p1', 'p2', 'p3', 'p4', 'p5'],
    founded: '2022', coach: 'Viktor "Coach" Andreev'
  },
  {
    id: 't2', name: 'STORM RIDERS', tag: 'SR', logo: '⚡', country: 'RU',
    wins: 58, losses: 40, rating: 1723, rank: 2,
    playerIds: ['p6', 'p7', 'p8', 'p9', 'p10'],
    founded: '2022', coach: 'Pavel "Mentor" Petrov'
  },
  {
    id: 't3', name: 'IRON TITANS', tag: 'IT', logo: '🔱', country: 'RU',
    wins: 47, losses: 41, rating: 1598, rank: 3,
    playerIds: ['p11', 'p12', 'p13', 'p14', 'p15'],
    founded: '2023', coach: 'Denis "Prime" Volkov'
  },
  {
    id: 't4', name: 'NEXUS SQUAD', tag: 'NX', logo: '🎯', country: 'RU',
    wins: 38, losses: 38, rating: 1512, rank: 4,
    playerIds: ['p16', 'p17', 'p18', 'p19', 'p20'],
    founded: '2023', coach: 'Anton "Tactician" Solov'
  },
  {
    id: 't5', name: 'DARK MATTER', tag: 'DM', logo: '🌑', country: 'RU',
    wins: 31, losses: 45, rating: 1421, rank: 5,
    playerIds: [],
    founded: '2023', coach: 'Mikhail "Dark" Orlov'
  },
  {
    id: 't6', name: 'RED DEVILS', tag: 'RD', logo: '😈', country: 'RU',
    wins: 25, losses: 51, rating: 1334, rank: 6,
    playerIds: [],
    founded: '2024', coach: 'Sergey "Red" Ivanov'
  },
];

export const matches: Match[] = [
  {
    id: 'm1', team1Id: 't1', team2Id: 't2',
    score1: 2, score2: 1, maps: ['Mirage', 'Nuke', 'Inferno'],
    date: '2026-03-10T18:00:00', tournament: 'MLT Season 3', tournamentId: 'tr1',
    status: 'finished',
    mapStats: [
      {
        map: 'Mirage', score1: 16, score2: 12,
        team1Players: [
          { playerId: 'p1', kills: 22, deaths: 16, assists: 5, adr: 82.3, hsPercent: 45, rating: 1.38 },
          { playerId: 'p2', kills: 28, deaths: 14, assists: 3, adr: 94.1, hsPercent: 32, rating: 1.62 },
          { playerId: 'p3', kills: 19, deaths: 17, assists: 8, adr: 74.5, hsPercent: 50, rating: 1.15 },
          { playerId: 'p4', kills: 21, deaths: 18, assists: 4, adr: 79.8, hsPercent: 58, rating: 1.18 },
          { playerId: 'p5', kills: 14, deaths: 16, assists: 9, adr: 62.1, hsPercent: 42, rating: 0.97 },
        ],
        team2Players: [
          { playerId: 'p6', kills: 18, deaths: 19, assists: 6, adr: 70.2, hsPercent: 44, rating: 1.02 },
          { playerId: 'p7', kills: 24, deaths: 16, assists: 2, adr: 86.4, hsPercent: 30, rating: 1.41 },
          { playerId: 'p8', kills: 17, deaths: 20, assists: 5, adr: 68.7, hsPercent: 48, rating: 0.94 },
          { playerId: 'p9', kills: 19, deaths: 19, assists: 7, adr: 74.3, hsPercent: 54, rating: 1.08 },
          { playerId: 'p10', kills: 12, deaths: 18, assists: 10, adr: 58.9, hsPercent: 39, rating: 0.83 },
        ]
      },
      {
        map: 'Nuke', score1: 11, score2: 16,
        team1Players: [
          { playerId: 'p1', kills: 18, deaths: 20, assists: 4, adr: 71.2, hsPercent: 43, rating: 1.02 },
          { playerId: 'p2', kills: 22, deaths: 18, assists: 2, adr: 80.5, hsPercent: 28, rating: 1.22 },
          { playerId: 'p3', kills: 15, deaths: 21, assists: 6, adr: 62.3, hsPercent: 48, rating: 0.88 },
          { playerId: 'p4', kills: 17, deaths: 20, assists: 5, adr: 68.1, hsPercent: 55, rating: 0.98 },
          { playerId: 'p5', kills: 11, deaths: 18, assists: 8, adr: 51.4, hsPercent: 40, rating: 0.76 },
        ],
        team2Players: [
          { playerId: 'p6', kills: 21, deaths: 16, assists: 7, adr: 79.4, hsPercent: 46, rating: 1.28 },
          { playerId: 'p7', kills: 26, deaths: 13, assists: 3, adr: 91.2, hsPercent: 31, rating: 1.58 },
          { playerId: 'p8', kills: 20, deaths: 17, assists: 6, adr: 76.8, hsPercent: 51, rating: 1.21 },
          { playerId: 'p9', kills: 18, deaths: 18, assists: 8, adr: 70.5, hsPercent: 52, rating: 1.08 },
          { playerId: 'p10', kills: 14, deaths: 17, assists: 11, adr: 62.3, hsPercent: 41, rating: 0.95 },
        ]
      },
      {
        map: 'Inferno', score1: 16, score2: 13,
        team1Players: [
          { playerId: 'p1', kills: 24, deaths: 17, assists: 6, adr: 85.6, hsPercent: 47, rating: 1.44 },
          { playerId: 'p2', kills: 25, deaths: 15, assists: 4, adr: 88.3, hsPercent: 33, rating: 1.52 },
          { playerId: 'p3', kills: 20, deaths: 16, assists: 9, adr: 76.4, hsPercent: 53, rating: 1.28 },
          { playerId: 'p4', kills: 22, deaths: 17, assists: 5, adr: 81.2, hsPercent: 60, rating: 1.32 },
          { playerId: 'p5', kills: 15, deaths: 15, assists: 12, adr: 65.8, hsPercent: 45, rating: 1.10 },
        ],
        team2Players: [
          { playerId: 'p6', kills: 19, deaths: 18, assists: 7, adr: 72.1, hsPercent: 44, rating: 1.11 },
          { playerId: 'p7', kills: 23, deaths: 16, assists: 3, adr: 83.7, hsPercent: 29, rating: 1.38 },
          { playerId: 'p8', kills: 18, deaths: 19, assists: 6, adr: 69.4, hsPercent: 49, rating: 1.02 },
          { playerId: 'p9', kills: 20, deaths: 20, assists: 9, adr: 75.8, hsPercent: 56, rating: 1.09 },
          { playerId: 'p10', kills: 13, deaths: 18, assists: 11, adr: 60.2, hsPercent: 40, rating: 0.87 },
        ]
      }
    ]
  },
  {
    id: 'm2', team1Id: 't3', team2Id: 't4',
    score1: 2, score2: 0, maps: ['Dust2', 'Ancient'],
    date: '2026-03-09T16:00:00', tournament: 'MLT Season 3', tournamentId: 'tr1',
    status: 'finished',
    mapStats: [
      {
        map: 'Dust2', score1: 16, score2: 9,
        team1Players: [
          { playerId: 'p11', kills: 20, deaths: 14, assists: 7, adr: 78.4, hsPercent: 41, rating: 1.35 },
          { playerId: 'p12', kills: 27, deaths: 12, assists: 2, adr: 92.3, hsPercent: 28, rating: 1.68 },
          { playerId: 'p13', kills: 17, deaths: 15, assists: 8, adr: 68.2, hsPercent: 47, rating: 1.14 },
          { playerId: 'p14', kills: 19, deaths: 16, assists: 4, adr: 74.5, hsPercent: 52, rating: 1.22 },
          { playerId: 'p15', kills: 12, deaths: 14, assists: 10, adr: 58.1, hsPercent: 38, rating: 0.94 },
        ],
        team2Players: [
          { playerId: 'p16', kills: 14, deaths: 19, assists: 5, adr: 61.3, hsPercent: 42, rating: 0.86 },
          { playerId: 'p17', kills: 18, deaths: 17, assists: 3, adr: 72.1, hsPercent: 31, rating: 1.08 },
          { playerId: 'p18', kills: 13, deaths: 20, assists: 6, adr: 57.8, hsPercent: 45, rating: 0.79 },
          { playerId: 'p19', kills: 15, deaths: 19, assists: 7, adr: 65.4, hsPercent: 50, rating: 0.92 },
          { playerId: 'p20', kills: 9, deaths: 17, assists: 9, adr: 48.2, hsPercent: 35, rating: 0.68 },
        ]
      },
      {
        map: 'Ancient', score1: 16, score2: 11,
        team1Players: [
          { playerId: 'p11', kills: 22, deaths: 15, assists: 6, adr: 81.2, hsPercent: 43, rating: 1.42 },
          { playerId: 'p12', kills: 24, deaths: 14, assists: 3, adr: 87.6, hsPercent: 27, rating: 1.55 },
          { playerId: 'p13', kills: 18, deaths: 16, assists: 9, adr: 71.4, hsPercent: 48, rating: 1.18 },
          { playerId: 'p14', kills: 21, deaths: 17, assists: 5, adr: 78.9, hsPercent: 55, rating: 1.28 },
          { playerId: 'p15', kills: 13, deaths: 15, assists: 11, adr: 61.3, hsPercent: 40, rating: 0.99 },
        ],
        team2Players: [
          { playerId: 'p16', kills: 16, deaths: 18, assists: 6, adr: 65.8, hsPercent: 43, rating: 0.96 },
          { playerId: 'p17', kills: 20, deaths: 16, assists: 4, adr: 77.4, hsPercent: 32, rating: 1.24 },
          { playerId: 'p18', kills: 15, deaths: 19, assists: 7, adr: 62.1, hsPercent: 46, rating: 0.89 },
          { playerId: 'p19', kills: 17, deaths: 20, assists: 8, adr: 69.3, hsPercent: 53, rating: 0.98 },
          { playerId: 'p20', kills: 11, deaths: 18, assists: 10, adr: 52.7, hsPercent: 37, rating: 0.74 },
        ]
      }
    ]
  },
  {
    id: 'm3', team1Id: 't1', team2Id: 't3',
    score1: 0, score2: 0, maps: ['Mirage', 'Overpass'],
    date: '2026-03-15T18:00:00', tournament: 'MLT Season 3', tournamentId: 'tr1',
    status: 'upcoming',
    mapStats: []
  },
  {
    id: 'm4', team1Id: 't2', team2Id: 't4',
    score1: 0, score2: 0, maps: ['Nuke', 'Vertigo'],
    date: '2026-03-16T16:00:00', tournament: 'MLT Season 3', tournamentId: 'tr1',
    status: 'upcoming',
    mapStats: []
  },
  {
    id: 'm5', team1Id: 't5', team2Id: 't6',
    score1: 1, score2: 2, maps: ['Anubis', 'Mirage', 'Dust2'],
    date: '2026-03-08T14:00:00', tournament: 'MLT Cup I', tournamentId: 'tr2',
    status: 'finished',
    mapStats: []
  },
];

export const tournaments: Tournament[] = [
  {
    id: 'tr1', name: 'MLT Season 3', status: 'active',
    prizePool: '150,000 ₽', startDate: '2026-03-01', endDate: '2026-04-15',
    teams: 8, format: 'Round Robin + Playoffs', location: 'Online',
    logo: '🏆'
  },
  {
    id: 'tr2', name: 'MLT Cup I', status: 'finished',
    prizePool: '75,000 ₽', startDate: '2026-01-10', endDate: '2026-02-28',
    teams: 6, format: 'Single Elimination', location: 'Online',
    winner: 'PHANTOM FORCE', logo: '🥇'
  },
  {
    id: 'tr3', name: 'MLT Season 4', status: 'upcoming',
    prizePool: '200,000 ₽', startDate: '2026-05-01', endDate: '2026-06-30',
    teams: 10, format: 'Group Stage + Playoffs', location: 'LAN — Москва',
    logo: '⚡'
  },
  {
    id: 'tr4', name: 'MLT Qualifier 2026', status: 'upcoming',
    prizePool: '30,000 ₽', startDate: '2026-04-20', endDate: '2026-04-27',
    teams: 16, format: 'Double Elimination', location: 'Online',
    logo: '🎯'
  },
];

export const news = [
  {
    id: 'n1',
    title: 'PHANTOM FORCE сохраняют лидерство в MLT Season 3',
    date: '2026-03-10',
    category: 'РЕЗУЛЬТАТЫ',
    preview: 'Phantom Force одержали победу над Storm Riders в захватывающем матче из трёх карт со счётом 2:1.',
    image: '',
  },
  {
    id: 'n2',
    title: 'MLT Season 4 пройдёт в формате LAN в Москве',
    date: '2026-03-08',
    category: 'АНОНС',
    preview: 'Организаторы объявили о проведении четвёртого сезона в офлайн-формате с призовым фондом 200,000 ₽.',
    image: '',
  },
  {
    id: 'n3',
    title: 'Spectre из PF признан MVP марта по версии MLT',
    date: '2026-03-05',
    category: 'НАГРАДЫ',
    preview: 'AWP-игрок Phantom Force показывает рейтинг 1.31 за сезон и признан лучшим игроком месяца.',
    image: '',
  },
  {
    id: 'n4',
    title: 'Регистрация на MLT Qualifier 2026 открыта',
    date: '2026-03-03',
    category: 'РЕГИСТРАЦИЯ',
    preview: 'Принять участие в квалификационном турнире могут команды, зарегистрированные на платформе MLT.',
    image: '',
  },
];

export const sponsors = [
  {
    id: 's1',
    name: 'GUTS NEWS CS2',
    tier: 'title',
    image: 'https://cdn.poehali.dev/projects/2a86203d-5c69-41c5-94ca-bbf83eb2d3a8/bucket/98ac0922-7c02-4e87-9207-d418101d66ef.png',
  },
  {
    id: 's2',
    name: '1XBET',
    tier: 'gold',
    image: 'https://cdn.poehali.dev/projects/2a86203d-5c69-41c5-94ca-bbf83eb2d3a8/bucket/387228f5-baaf-402e-afba-a5055b1a1a20.png',
  },
  {
    id: 's3',
    name: 'MLT',
    tier: 'silver',
    image: 'https://cdn.poehali.dev/projects/2a86203d-5c69-41c5-94ca-bbf83eb2d3a8/bucket/ab37af0b-4f57-4848-bff2-ce826c8d34e9.png',
  },
];