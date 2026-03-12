import { useState } from 'react';
import { matches, teams, players } from '@/data/mockData';
import type { Match, MatchPlayer } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface MatchesPageProps {
  selectedId?: string;
}

export default function MatchesPage({ selectedId }: MatchesPageProps) {
  const [activeMatchId, setActiveMatchId] = useState<string | null>(selectedId || null);
  const [activeMap, setActiveMap] = useState(0);

  const match = activeMatchId ? matches.find(m => m.id === activeMatchId) : null;
  const getTeam = (id: string) => teams.find(t => t.id === id);
  const getPlayer = (id: string) => players.find(p => p.id === id);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
      + ', ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const PlayerRow = ({ mp, reverse }: { mp: MatchPlayer; reverse?: boolean }) => {
    const p = getPlayer(mp.playerId);
    return (
      <tr className="stat-row">
        <td className={reverse ? 'text-right' : ''}>
          <div className={`flex items-center gap-2 ${reverse ? 'justify-end flex-row-reverse' : ''}`}>
            <img src={p?.avatar} alt={p?.nickname} className="w-6 h-6 rounded-full bg-mlt-surface2" />
            <span className="font-rajdhani font-bold text-white text-sm">{p?.nickname}</span>
          </div>
        </td>
        <td className={`font-mono-ibm text-sm ${mp.rating >= 1.2 ? 'text-mlt-green' : mp.rating >= 1.0 ? 'text-white' : 'text-mlt-red'} ${reverse ? 'text-left' : 'text-right'}`}>
          {mp.rating.toFixed(2)}
        </td>
        <td className={`font-mono-ibm text-sm text-white ${reverse ? 'text-left' : 'text-right'}`}>{mp.kills}/{mp.deaths}/{mp.assists}</td>
        <td className={`font-mono-ibm text-sm text-mlt-dim hidden sm:table-cell ${reverse ? 'text-left' : 'text-right'}`}>{mp.adr.toFixed(1)}</td>
        <td className={`font-mono-ibm text-sm text-mlt-dim hidden sm:table-cell ${reverse ? 'text-left' : 'text-right'}`}>{mp.hsPercent}%</td>
      </tr>
    );
  };

  if (match) {
    const t1 = getTeam(match.team1Id);
    const t2 = getTeam(match.team2Id);
    const isFinished = match.status === 'finished';
    const currentMapStats = match.mapStats[activeMap];

    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setActiveMatchId(null)}
          className="flex items-center gap-2 text-mlt-dim hover:text-mlt-blue transition-colors font-ibm text-sm"
        >
          <Icon name="ChevronLeft" size={16} />
          Все матчи
        </button>

        {/* Match header */}
        <div className="mlt-card overflow-hidden">
          <div className="px-6 py-6"
            style={{ background: 'linear-gradient(135deg, hsl(218,60%,10%) 0%, hsl(220,38%,7%) 100%)' }}>
            <div className="text-center mb-2">
              <span className="font-rajdhani font-bold text-xs uppercase tracking-widest text-mlt-dim">{match.tournament}</span>
              <span className="mx-2 text-mlt-border">·</span>
              <span className="font-ibm text-mlt-dim text-xs">{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2 flex-1 min-w-[120px]">
                <span className="text-5xl">{t1?.logo}</span>
                <div className="font-rajdhani font-bold text-white text-lg text-center">{t1?.name}</div>
              </div>
              <div className="text-center">
                {isFinished ? (
                  <div className="flex items-center gap-3">
                    <span className={`font-rajdhani font-bold text-5xl ${match.score1 > match.score2 ? 'text-mlt-green' : 'text-mlt-red'}`}>{match.score1}</span>
                    <span className="font-rajdhani text-mlt-dim text-3xl">:</span>
                    <span className={`font-rajdhani font-bold text-5xl ${match.score2 > match.score1 ? 'text-mlt-green' : 'text-mlt-red'}`}>{match.score2}</span>
                  </div>
                ) : (
                  <div className="font-rajdhani font-bold text-mlt-blue text-4xl tracking-widest">VS</div>
                )}
                <div className="flex gap-2 mt-2 justify-center flex-wrap">
                  {match.maps.map(map => (
                    <span key={map} className="font-ibm text-mlt-dim text-xs px-2 py-0.5 rounded"
                      style={{ background: 'hsl(220,25%,14%)', border: '1px solid hsl(220,25%,18%)' }}>
                      {map}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 min-w-[120px]">
                <span className="text-5xl">{t2?.logo}</span>
                <div className="font-rajdhani font-bold text-white text-lg text-center">{t2?.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map stats */}
        {isFinished && match.mapStats.length > 0 && (
          <div className="space-y-4">
            {/* Map tabs */}
            <div className="flex gap-2 flex-wrap">
              {match.mapStats.map((ms, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMap(i)}
                  className={`px-4 py-2 rounded font-rajdhani font-semibold text-sm uppercase tracking-wider transition-colors ${
                    activeMap === i
                      ? 'text-white'
                      : 'text-mlt-dim hover:text-white'
                  }`}
                  style={{
                    background: activeMap === i ? 'hsl(210,90%,55%)' : 'hsl(220,32%,11%)',
                    border: '1px solid hsl(220,25%,18%)',
                  }}
                >
                  {ms.map} — {ms.score1}:{ms.score2}
                </button>
              ))}
            </div>

            {/* Player stats table */}
            {currentMapStats && (
              <div className="grid grid-cols-1 gap-4">
                {/* Team 1 */}
                <div className="mlt-card overflow-hidden">
                  <div className="mlt-section-header flex items-center gap-2">
                    <span>{t1?.logo}</span>
                    <span>{t1?.name}</span>
                    <span className={`ml-auto font-bold ${currentMapStats.score1 > currentMapStats.score2 ? 'text-mlt-green' : 'text-mlt-red'}`}>
                      {currentMapStats.score1}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full hltv-table">
                      <thead>
                        <tr>
                          <th className="text-left">Игрок</th>
                          <th className="text-right">Рейтинг</th>
                          <th className="text-right">K/D/A</th>
                          <th className="text-right hidden sm:table-cell">ADR</th>
                          <th className="text-right hidden sm:table-cell">HS%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentMapStats.team1Players.map(mp => <PlayerRow key={mp.playerId} mp={mp} />)}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Team 2 */}
                <div className="mlt-card overflow-hidden">
                  <div className="mlt-section-header flex items-center gap-2">
                    <span>{t2?.logo}</span>
                    <span>{t2?.name}</span>
                    <span className={`ml-auto font-bold ${currentMapStats.score2 > currentMapStats.score1 ? 'text-mlt-green' : 'text-mlt-red'}`}>
                      {currentMapStats.score2}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full hltv-table">
                      <thead>
                        <tr>
                          <th className="text-left">Игрок</th>
                          <th className="text-right">Рейтинг</th>
                          <th className="text-right">K/D/A</th>
                          <th className="text-right hidden sm:table-cell">ADR</th>
                          <th className="text-right hidden sm:table-cell">HS%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentMapStats.team2Players.map(mp => <PlayerRow key={mp.playerId} mp={mp} />)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isFinished && (
          <div className="mlt-card p-8 text-center">
            <Icon name="Clock" size={32} className="mx-auto mb-3" style={{ color: 'hsl(210,90%,55%)' }} />
            <div className="font-rajdhani font-bold text-white text-xl mb-1">Матч ещё не сыгран</div>
            <div className="font-ibm text-mlt-dim text-sm">Статистика появится после завершения</div>
          </div>
        )}
      </div>
    );
  }

  const finished = matches.filter(m => m.status === 'finished');
  const upcoming = matches.filter(m => m.status === 'upcoming');

  const MatchRow = ({ m }: { m: Match }) => {
    const t1 = getTeam(m.team1Id);
    const t2 = getTeam(m.team2Id);
    const d = new Date(m.date);
    return (
      <button
        onClick={() => { setActiveMatchId(m.id); setActiveMap(0); }}
        className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-mlt-surface2 transition-colors text-left border-b border-mlt-border last:border-0"
      >
        <div className="w-16 text-center flex-shrink-0">
          <div className="font-ibm text-mlt-dim text-xs">{d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</div>
          <div className="font-ibm text-mlt-dim text-xs">{d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div className="flex-1 flex items-center gap-2 justify-end">
          <span className="font-rajdhani font-bold text-white text-sm hidden sm:block">{t1?.name}</span>
          <span className="text-xl">{t1?.logo}</span>
        </div>
        <div className="w-20 text-center flex-shrink-0">
          {m.status === 'finished' ? (
            <span className="font-rajdhani font-bold text-white text-base">{m.score1} : {m.score2}</span>
          ) : (
            <span className="font-rajdhani font-bold text-mlt-blue text-sm tracking-widest">VS</span>
          )}
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xl">{t2?.logo}</span>
          <span className="font-rajdhani font-bold text-white text-sm hidden sm:block">{t2?.name}</span>
        </div>
        <div className="hidden md:block flex-shrink-0">
          <span className="font-ibm text-mlt-dim text-xs px-2 py-0.5 rounded"
            style={{ background: 'hsl(220,25%,14%)', border: '1px solid hsl(220,25%,18%)' }}>
            {m.tournament}
          </span>
        </div>
        <Icon name="ChevronRight" size={14} style={{ color: 'hsl(215,15%,50%)' }} />
      </button>
    );
  };

  return (
    <div className="animate-fade-in space-y-5">
      <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-wide">Матчи</h1>

      {upcoming.length > 0 && (
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header">Предстоящие матчи</div>
          {upcoming.map(m => <MatchRow key={m.id} m={m} />)}
        </div>
      )}

      <div className="mlt-card overflow-hidden">
        <div className="mlt-section-header">Завершённые матчи</div>
        {finished.map(m => <MatchRow key={m.id} m={m} />)}
      </div>
    </div>
  );
}
