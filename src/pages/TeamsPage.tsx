import { useState } from 'react';
import { teams, players, matches } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface TeamsPageProps {
  onNavigate: (tab: string, id?: string) => void;
  selectedId?: string;
}

export default function TeamsPage({ onNavigate, selectedId }: TeamsPageProps) {
  const [activeTeamId, setActiveTeamId] = useState<string | null>(selectedId || null);

  const team = activeTeamId ? teams.find(t => t.id === activeTeamId) : null;
  const teamPlayers = team ? players.filter(p => team.playerIds.includes(p.id)) : [];

  const teamMatches = activeTeamId
    ? matches.filter(m => m.team1Id === activeTeamId || m.team2Id === activeTeamId)
    : [];
  const pastMatches = teamMatches.filter(m => m.status === 'finished');
  const futureMatches = teamMatches.filter(m => m.status === 'upcoming');

  const getTeam = (id: string) => teams.find(t => t.id === id);

  const winRate = team ? Math.round((team.wins / (team.wins + team.losses)) * 100) : 0;

  if (team && activeTeamId) {
    const opponent = (m: typeof matches[0]) =>
      getTeam(m.team1Id === activeTeamId ? m.team2Id : m.team1Id);
    const isWin = (m: typeof matches[0]) => {
      if (m.status !== 'finished') return null;
      if (m.team1Id === activeTeamId) return m.score1 > m.score2;
      return m.score2 > m.score1;
    };

    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setActiveTeamId(null)}
          className="flex items-center gap-2 text-mlt-dim hover:text-mlt-blue transition-colors font-ibm text-sm"
        >
          <Icon name="ChevronLeft" size={16} />
          Все команды
        </button>

        {/* Team header */}
        <div className="mlt-card overflow-hidden">
          <div className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: 'linear-gradient(135deg, hsl(218,60%,12%) 0%, hsl(220,38%,8%) 100%)' }}>
            <div className="text-6xl">{team.logo}</div>
            <div className="flex-1">
              <div className="font-rajdhani font-bold text-white text-4xl tracking-wide leading-none">{team.name}</div>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="font-mono-ibm text-xs px-2 py-0.5 rounded"
                  style={{ background: 'hsla(210,90%,55%,0.15)', color: 'hsl(210,90%,55%)', border: '1px solid hsla(210,90%,55%,0.3)' }}>
                  [{team.tag}]
                </span>
                <span className="font-ibm text-mlt-dim text-sm">Основан: {team.founded}</span>
                <span className="font-ibm text-mlt-dim text-sm">Тренер: {team.coach}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="font-rajdhani font-bold text-mlt-green text-2xl">{team.wins}</div>
                <div className="font-ibm text-mlt-dim text-xs">Победы</div>
              </div>
              <div className="text-center">
                <div className="font-rajdhani font-bold text-mlt-red text-2xl">{team.losses}</div>
                <div className="font-ibm text-mlt-dim text-xs">Поражения</div>
              </div>
              <div className="text-center">
                <div className="font-rajdhani font-bold text-mlt-blue text-2xl">{winRate}%</div>
                <div className="font-ibm text-mlt-dim text-xs">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="font-rajdhani font-bold text-mlt-gold text-2xl">#{team.rank}</div>
                <div className="font-ibm text-mlt-dim text-xs">Рейтинг</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Roster */}
          <div className="lg:col-span-2">
            <div className="mlt-card overflow-hidden">
              <div className="mlt-section-header">Состав</div>
              <table className="w-full hltv-table">
                <thead>
                  <tr>
                    <th className="text-left">Игрок</th>
                    <th>Роль</th>
                    <th>Рейтинг</th>
                    <th>K/D</th>
                    <th>ADR</th>
                    <th className="hidden sm:table-cell">HS%</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPlayers.map(p => (
                    <tr
                      key={p.id}
                      className="cursor-pointer"
                      onClick={() => onNavigate('players', p.id)}
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <img src={p.avatar} alt={p.nickname} className="w-7 h-7 rounded-full bg-mlt-surface2" />
                          <div>
                            <div className="font-rajdhani font-bold text-white text-sm">{p.nickname}</div>
                            <div className="font-ibm text-mlt-dim text-xs hidden sm:block">{p.realName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-mlt-dim font-ibm text-xs">{p.role}</td>
                      <td>
                        <span className={`font-mono-ibm font-bold text-sm ${p.stats.rating >= 1.2 ? 'text-mlt-green' : p.stats.rating >= 1.0 ? 'text-white' : 'text-mlt-red'}`}>
                          {p.stats.rating.toFixed(2)}
                        </span>
                      </td>
                      <td className="font-mono-ibm text-sm text-white">{p.stats.kd.toFixed(2)}</td>
                      <td className="font-mono-ibm text-sm text-white">{p.stats.adr.toFixed(1)}</td>
                      <td className="hidden sm:table-cell font-mono-ibm text-sm text-mlt-dim">{p.stats.hsPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="mlt-card overflow-hidden">
              <div className="mlt-section-header">Статистика</div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-ibm text-mlt-dim text-sm">Рейтинг MLT</span>
                  <span className="font-mono-ibm font-bold text-mlt-blue">{team.rating}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-ibm text-mlt-dim text-sm">Win Rate</span>
                    <span className="font-mono-ibm text-white text-sm">{winRate}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(220,25%,16%)' }}>
                    <div className="h-full rounded-full" style={{ width: `${winRate}%`, background: 'hsl(210,90%,55%)' }} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-ibm text-mlt-dim text-sm">Матчи</span>
                  <span className="font-mono-ibm text-white text-sm">{team.wins + team.losses}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="mlt-card overflow-hidden">
            <div className="mlt-section-header">Прошедшие матчи</div>
            {pastMatches.length === 0 ? (
              <div className="p-6 text-center text-mlt-dim font-ibm text-sm">Нет данных</div>
            ) : (
              pastMatches.map((m, i) => {
                const opp = opponent(m);
                const win = isWin(m);
                const myScore = m.team1Id === activeTeamId ? m.score1 : m.score2;
                const oppScore = m.team1Id === activeTeamId ? m.score2 : m.score1;
                return (
                  <button
                    key={m.id}
                    onClick={() => onNavigate('matches', m.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-mlt-surface2 transition-colors text-left"
                    style={{ borderBottom: i < pastMatches.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}
                  >
                    <span className={win ? 'win-badge' : 'lose-badge'}>{win ? 'W' : 'L'}</span>
                    <span className="text-xl">{opp?.logo}</span>
                    <div className="flex-1">
                      <div className="font-rajdhani font-semibold text-white text-sm">{opp?.name}</div>
                      <div className="font-ibm text-mlt-dim text-xs">{m.tournament}</div>
                    </div>
                    <div className="font-rajdhani font-bold text-white text-sm">{myScore}:{oppScore}</div>
                  </button>
                );
              })
            )}
          </div>

          <div className="mlt-card overflow-hidden">
            <div className="mlt-section-header">Предстоящие матчи</div>
            {futureMatches.length === 0 ? (
              <div className="p-6 text-center text-mlt-dim font-ibm text-sm">Нет запланированных матчей</div>
            ) : (
              futureMatches.map((m, i) => {
                const opp = opponent(m);
                const d = new Date(m.date);
                return (
                  <button
                    key={m.id}
                    onClick={() => onNavigate('matches', m.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-mlt-surface2 transition-colors text-left"
                    style={{ borderBottom: i < futureMatches.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}
                  >
                    <span className="text-xl">{opp?.logo}</span>
                    <div className="flex-1">
                      <div className="font-rajdhani font-semibold text-white text-sm">{opp?.name}</div>
                      <div className="font-ibm text-mlt-dim text-xs">{m.tournament}</div>
                    </div>
                    <div className="font-mono-ibm text-mlt-dim text-xs">
                      {d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-wide">Команды</h1>
        <span className="font-ibm text-mlt-dim text-sm">{teams.length} команд</span>
      </div>

      <div className="mlt-card overflow-hidden">
        <table className="w-full hltv-table">
          <thead>
            <tr>
              <th className="text-left w-8">#</th>
              <th className="text-left">Команда</th>
              <th>Рейтинг</th>
              <th className="hidden sm:table-cell">W</th>
              <th className="hidden sm:table-cell">L</th>
              <th className="hidden md:table-cell">Win%</th>
              <th className="hidden sm:table-cell">Игрок. рейтинг</th>
            </tr>
          </thead>
          <tbody>
            {teams.sort((a, b) => b.rating - a.rating).map((team, i) => {
              const wr = Math.round((team.wins / (team.wins + team.losses)) * 100);
              const teamPl = players.filter(p => team.playerIds.includes(p.id));
              const avgRating = teamPl.length > 0
                ? (teamPl.reduce((s, p) => s + p.stats.rating, 0) / teamPl.length).toFixed(2)
                : '—';
              return (
                <tr
                  key={team.id}
                  className="cursor-pointer"
                  onClick={() => setActiveTeamId(team.id)}
                >
                  <td className="text-mlt-dim font-ibm text-xs">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{team.logo}</span>
                      <div>
                        <div className="font-rajdhani font-bold text-white text-sm">{team.name}</div>
                        <div className="font-mono-ibm text-mlt-dim text-xs">[{team.tag}]</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-mono-ibm font-bold text-mlt-blue">{team.rating}</span>
                  </td>
                  <td className="hidden sm:table-cell win-badge">{team.wins}</td>
                  <td className="hidden sm:table-cell lose-badge">{team.losses}</td>
                  <td className="hidden md:table-cell font-mono-ibm text-white text-sm">{wr}%</td>
                  <td className="hidden sm:table-cell font-mono-ibm text-sm"
                    style={{ color: Number(avgRating) >= 1.2 ? 'hsl(142,70%,45%)' : Number(avgRating) >= 1.0 ? 'white' : 'hsl(0,70%,55%)' }}>
                    {avgRating}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
