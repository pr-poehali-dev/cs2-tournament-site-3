import { useState } from 'react';
import { players, teams, matches } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface PlayersPageProps {
  selectedId?: string;
}

export default function PlayersPage({ selectedId }: PlayersPageProps) {
  const [activePlayerId, setActivePlayerId] = useState<string | null>(selectedId || null);
  const [sortKey, setSortKey] = useState<'rating' | 'kd' | 'adr' | 'hsPercent'>('rating');

  const player = activePlayerId ? players.find(p => p.id === activePlayerId) : null;
  const team = player ? teams.find(t => t.id === player.teamId) : null;

  const getTeam = (id: string) => teams.find(t => t.id === id);
  const getPlayerTeam = (teamId: string) => teams.find(t => t.id === teamId);

  const playerMatches = player
    ? matches.filter(m =>
        m.mapStats.some(ms =>
          ms.team1Players.some(mp => mp.playerId === player.id) ||
          ms.team2Players.some(mp => mp.playerId === player.id)
        )
      )
    : [];

  const sortedPlayers = [...players].sort((a, b) => b.stats[sortKey] - a.stats[sortKey]);

  const SortBtn = ({ k, label }: { k: typeof sortKey; label: string }) => (
    <button
      onClick={() => setSortKey(k)}
      className={`px-3 py-1.5 font-rajdhani font-semibold text-xs uppercase tracking-wider rounded transition-colors ${
        sortKey === k ? 'text-white' : 'text-mlt-dim hover:text-white'
      }`}
      style={{
        background: sortKey === k ? 'hsl(210,90%,55%)' : 'hsl(220,32%,11%)',
        border: '1px solid hsl(220,25%,18%)',
      }}
    >
      {label}
    </button>
  );

  if (player) {
    const rank = sortedPlayers.findIndex(p => p.id === player.id) + 1;
    const winRate = Math.round((player.stats.wins / player.stats.mapsPlayed) * 100);

    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setActivePlayerId(null)}
          className="flex items-center gap-2 text-mlt-dim hover:text-mlt-blue transition-colors font-ibm text-sm"
        >
          <Icon name="ChevronLeft" size={16} />
          Все игроки
        </button>

        {/* HLTV-style player profile */}
        <div className="mlt-card overflow-hidden">
          <div className="px-6 py-6"
            style={{ background: 'linear-gradient(135deg, hsl(218,60%,10%) 0%, hsl(220,38%,7%) 100%)' }}>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={player.avatar}
                  alt={player.nickname}
                  className="w-28 h-28 rounded object-cover"
                  style={{ border: '2px solid hsl(210,90%,55%)', background: 'hsl(220,38%,12%)' }}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded flex items-center justify-center font-rajdhani font-bold text-sm"
                  style={{ background: 'hsl(210,90%,55%)', color: 'white' }}>
                  #{rank}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="font-ibm text-mlt-dim text-xs uppercase tracking-widest mb-1">{player.role}</div>
                <div className="font-rajdhani font-bold text-white text-5xl leading-none tracking-wide">
                  {player.nickname}
                </div>
                <div className="font-ibm text-mlt-dim text-base mt-1">{player.realName}</div>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🇷🇺</span>
                    <span className="font-ibm text-mlt-dim text-sm">{player.country}</span>
                  </div>
                  <span className="text-mlt-border">·</span>
                  <div className="font-ibm text-mlt-dim text-sm">Возраст: {player.age}</div>
                  <span className="text-mlt-border">·</span>
                  {team && (
                    <div className="flex items-center gap-1.5">
                      <span>{team.logo}</span>
                      <span className="font-rajdhani font-bold text-white text-sm">{team.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating big */}
              <div className="text-right">
                <div className="font-ibm text-mlt-dim text-xs uppercase tracking-widest mb-1">MLT Rating</div>
                <div className="font-rajdhani font-bold text-5xl"
                  style={{ color: player.stats.rating >= 1.2 ? 'hsl(142,70%,45%)' : player.stats.rating >= 1.0 ? 'white' : 'hsl(0,70%,55%)' }}>
                  {player.stats.rating.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid - HLTV style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'K/D Ratio', value: player.stats.kd.toFixed(2) },
            { label: 'ADR', value: player.stats.adr.toFixed(1) },
            { label: 'KPR', value: player.stats.kpr.toFixed(2) },
            { label: 'HS%', value: `${player.stats.hsPercent}%` },
            { label: 'Карты', value: player.stats.mapsPlayed },
            { label: 'Win Rate', value: `${winRate}%` },
          ].map(stat => (
            <div key={stat.label} className="mlt-card px-3 py-3 text-center">
              <div className="font-rajdhani font-bold text-white text-2xl">{stat.value}</div>
              <div className="font-ibm text-mlt-dim text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Match history */}
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header">История матчей</div>
          {playerMatches.length === 0 ? (
            <div className="p-6 text-center text-mlt-dim font-ibm text-sm">Нет данных о матчах</div>
          ) : (
            playerMatches.map((m, i) => {
              const t1 = getTeam(m.team1Id);
              const t2 = getTeam(m.team2Id);
              const isOnTeam1 = m.team1Id === player.teamId;
              const win = isOnTeam1 ? m.score1 > m.score2 : m.score2 > m.score1;
              const d = new Date(m.date);
              return (
                <div
                  key={m.id}
                  className="px-4 py-3 flex items-center gap-3 border-b border-mlt-border last:border-0"
                >
                  <span className={win ? 'win-badge w-4' : 'lose-badge w-4'}>{win ? 'W' : 'L'}</span>
                  <div className="flex items-center gap-2 flex-1 flex-wrap">
                    <span className="font-rajdhani font-bold text-white text-sm">{t1?.name}</span>
                    <span className="font-rajdhani font-bold text-white">{m.score1}:{m.score2}</span>
                    <span className="font-rajdhani font-bold text-white text-sm">{t2?.name}</span>
                  </div>
                  <span className="font-ibm text-mlt-dim text-xs">{m.tournament}</span>
                  <span className="font-ibm text-mlt-dim text-xs hidden sm:block">
                    {d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-wide">MLT Игроки</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-ibm text-mlt-dim text-xs">Сортировка:</span>
          <SortBtn k="rating" label="Рейтинг" />
          <SortBtn k="kd" label="K/D" />
          <SortBtn k="adr" label="ADR" />
          <SortBtn k="hsPercent" label="HS%" />
        </div>
      </div>

      {/* HLTV-style player table */}
      <div className="mlt-card overflow-hidden overflow-x-auto">
        <table className="w-full hltv-table min-w-[500px]">
          <thead>
            <tr>
              <th className="text-left w-8">#</th>
              <th className="text-left">Игрок</th>
              <th className="text-left hidden md:table-cell">Команда</th>
              <th>Рейтинг</th>
              <th>K/D</th>
              <th className="hidden sm:table-cell">ADR</th>
              <th className="hidden sm:table-cell">HS%</th>
              <th className="hidden md:table-cell">Карты</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((p, i) => {
              const pt = getPlayerTeam(p.teamId);
              return (
                <tr
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => setActivePlayerId(p.id)}
                >
                  <td className="text-mlt-dim font-ibm text-xs">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <img src={p.avatar} alt={p.nickname} className="w-8 h-8 rounded-full bg-mlt-surface2 flex-shrink-0" />
                      <div>
                        <div className="font-rajdhani font-bold text-white text-sm">{p.nickname}</div>
                        <div className="font-ibm text-mlt-dim text-xs hidden sm:block">{p.realName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">
                    {pt && (
                      <div className="flex items-center gap-2">
                        <span>{pt.logo}</span>
                        <span className="font-ibm text-mlt-dim text-xs">[{pt.tag}]</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`font-mono-ibm font-bold text-sm ${
                      p.stats.rating >= 1.2 ? 'text-mlt-green' : p.stats.rating >= 1.0 ? 'text-white' : 'text-mlt-red'
                    }`}>
                      {p.stats.rating.toFixed(2)}
                    </span>
                  </td>
                  <td className="font-mono-ibm text-sm text-white">{p.stats.kd.toFixed(2)}</td>
                  <td className="hidden sm:table-cell font-mono-ibm text-sm text-mlt-dim">{p.stats.adr.toFixed(1)}</td>
                  <td className="hidden sm:table-cell font-mono-ibm text-sm text-mlt-dim">{p.stats.hsPercent}%</td>
                  <td className="hidden md:table-cell font-mono-ibm text-sm text-mlt-dim">{p.stats.mapsPlayed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
