import { useState } from 'react';
import { tournaments, teams } from '@/data/mockData';
import Icon from '@/components/ui/icon';

type TournamentType = typeof tournaments[0];

const bracketData: Record<string, {
  rounds: { name: string; matches: { team1: string; team2: string; score1?: number; score2?: number; winner?: string }[] }[]
}> = {
  tr1: {
    rounds: [
      {
        name: 'Четвертьфинал',
        matches: [
          { team1: 'PHANTOM FORCE', team2: 'RED DEVILS', score1: 2, score2: 0, winner: 'PHANTOM FORCE' },
          { team1: 'STORM RIDERS', team2: 'DARK MATTER', score1: 2, score2: 1, winner: 'STORM RIDERS' },
          { team1: 'IRON TITANS', team2: 'TBD', score1: undefined, score2: undefined },
          { team1: 'NEXUS SQUAD', team2: 'TBD', score1: undefined, score2: undefined },
        ],
      },
      {
        name: 'Полуфинал',
        matches: [
          { team1: 'PHANTOM FORCE', team2: 'STORM RIDERS', score1: undefined, score2: undefined },
          { team1: 'TBD', team2: 'TBD', score1: undefined, score2: undefined },
        ],
      },
      {
        name: 'Финал',
        matches: [
          { team1: 'TBD', team2: 'TBD', score1: undefined, score2: undefined },
        ],
      },
    ],
  },
  tr2: {
    rounds: [
      {
        name: 'Полуфинал',
        matches: [
          { team1: 'PHANTOM FORCE', team2: 'IRON TITANS', score1: 2, score2: 0, winner: 'PHANTOM FORCE' },
          { team1: 'STORM RIDERS', team2: 'RED DEVILS', score1: 2, score2: 1, winner: 'STORM RIDERS' },
        ],
      },
      {
        name: 'Финал',
        matches: [
          { team1: 'PHANTOM FORCE', team2: 'STORM RIDERS', score1: 2, score2: 1, winner: 'PHANTOM FORCE' },
        ],
      },
    ],
  },
  tr3: {
    rounds: [
      {
        name: 'Групповой этап',
        matches: [
          { team1: 'Группа A', team2: '4 команды', score1: undefined, score2: undefined },
          { team1: 'Группа B', team2: '4 команды', score1: undefined, score2: undefined },
          { team1: 'Группа C', team2: '2 команды', score1: undefined, score2: undefined },
        ],
      },
      {
        name: 'Плей-офф',
        matches: [
          { team1: 'TBD', team2: 'TBD', score1: undefined, score2: undefined },
          { team1: 'TBD', team2: 'TBD', score1: undefined, score2: undefined },
        ],
      },
      {
        name: 'Финал',
        matches: [
          { team1: 'TBD', team2: 'TBD', score1: undefined, score2: undefined },
        ],
      },
    ],
  },
  tr4: {
    rounds: [
      {
        name: 'Раунд 1',
        matches: [
          { team1: 'TBD', team2: 'TBD' },
          { team1: 'TBD', team2: 'TBD' },
          { team1: 'TBD', team2: 'TBD' },
          { team1: 'TBD', team2: 'TBD' },
        ],
      },
      {
        name: 'Раунд 2',
        matches: [
          { team1: 'TBD', team2: 'TBD' },
          { team1: 'TBD', team2: 'TBD' },
        ],
      },
      {
        name: 'Финал',
        matches: [
          { team1: 'TBD', team2: 'TBD' },
        ],
      },
    ],
  },
};

export default function TournamentsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const active = tournaments.filter(t => t.status === 'active');
  const upcoming = tournaments.filter(t => t.status === 'upcoming');
  const finished = tournaments.filter(t => t.status === 'finished');
  const selected = selectedId ? tournaments.find(t => t.id === selectedId) : null;
  const bracket = selectedId ? bracketData[selectedId] : null;

  const statusLabel = (s: string) => {
    if (s === 'active') return { label: 'АКТИВЕН', color: 'hsl(142,70%,45%)', bg: 'hsla(142,70%,45%,0.12)' };
    if (s === 'upcoming') return { label: 'СКОРО', color: 'hsl(210,90%,55%)', bg: 'hsla(210,90%,55%,0.12)' };
    return { label: 'ЗАВЕРШЁН', color: 'hsl(215,15%,50%)', bg: 'hsla(215,15%,50%,0.12)' };
  };

  const getTeamLogo = (name: string) => {
    const t = teams.find(t => t.name === name);
    return t?.logo || '❓';
  };

  if (selected && bracket) {
    const st = statusLabel(selected.status);
    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-mlt-dim hover:text-mlt-blue transition-colors font-ibm text-sm"
        >
          <Icon name="ChevronLeft" size={16} />
          Все турниры
        </button>

        {/* Header */}
        <div className="mlt-card overflow-hidden">
          <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: 'linear-gradient(135deg, hsl(218,60%,10%) 0%, hsl(220,38%,7%) 100%)' }}>
            <span className="text-5xl">{selected.logo}</span>
            <div className="flex-1">
              <div className="font-rajdhani font-bold text-white text-3xl tracking-wide">{selected.name}</div>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="font-rajdhani font-bold text-xs px-2 py-0.5 rounded uppercase tracking-wider"
                  style={{ color: st.color, background: st.bg, border: `1px solid ${st.color}40` }}>
                  {st.label}
                </span>
                <span className="font-ibm text-mlt-dim text-sm">{selected.location}</span>
                <span className="font-ibm text-mlt-dim text-sm">{selected.format}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-rajdhani font-bold text-mlt-gold text-2xl">{selected.prizePool}</div>
              <div className="font-ibm text-mlt-dim text-xs">призовой фонд</div>
              {selected.winner && (
                <div className="font-rajdhani font-bold text-mlt-gold text-sm mt-1">🏆 {selected.winner}</div>
              )}
            </div>
          </div>
        </div>

        {/* Bracket */}
        <div>
          <div className="mlt-section-header mb-4">Сетка турнира</div>
          <div className="overflow-x-auto scroll-custom pb-4">
            <div className="flex gap-6 min-w-max">
              {bracket.rounds.map((round, ri) => (
                <div key={ri} className="flex flex-col gap-4" style={{ minWidth: '200px' }}>
                  {/* Round header */}
                  <div className="text-center py-2 px-3 rounded font-rajdhani font-bold text-xs uppercase tracking-widest"
                    style={{ background: 'hsl(218,60%,12%)', border: '1px solid hsl(210,90%,55%,0.25)', color: 'hsl(210,90%,55%)' }}>
                    {round.name}
                  </div>

                  {/* Matches */}
                  <div className="flex flex-col gap-4 justify-around flex-1">
                    {round.matches.map((m, mi) => {
                      const t1win = m.winner === m.team1;
                      const t2win = m.winner === m.team2;
                      const played = m.score1 !== undefined && m.score2 !== undefined;
                      return (
                        <div key={mi} className="rounded overflow-hidden"
                          style={{ border: '1px solid hsl(220,25%,18%)', background: 'hsl(220,32%,10%)' }}>
                          {/* Team 1 */}
                          <div className={`px-3 py-2 flex items-center justify-between gap-2 ${t1win ? 'bg-mlt-dark' : ''}`}
                            style={{ borderBottom: '1px solid hsl(220,25%,16%)' }}>
                            <div className="flex items-center gap-2 min-w-0">
                              {m.team1 !== 'TBD' && m.team1 !== 'Группа A' && m.team1 !== 'Группа B' && m.team1 !== 'Группа C' && (
                                <span className="text-base flex-shrink-0">{getTeamLogo(m.team1)}</span>
                              )}
                              <span className={`font-rajdhani font-bold text-xs truncate ${t1win ? 'text-mlt-blue' : m.team1 === 'TBD' ? 'text-mlt-dim' : 'text-white'}`}>
                                {m.team1}
                              </span>
                            </div>
                            {played && (
                              <span className={`font-mono-ibm font-bold text-sm flex-shrink-0 ${t1win ? 'text-mlt-green' : 'text-mlt-dim'}`}>
                                {m.score1}
                              </span>
                            )}
                          </div>
                          {/* Team 2 */}
                          <div className={`px-3 py-2 flex items-center justify-between gap-2 ${t2win ? 'bg-mlt-dark' : ''}`}>
                            <div className="flex items-center gap-2 min-w-0">
                              {m.team2 !== 'TBD' && m.team2 !== '4 команды' && m.team2 !== '2 команды' && (
                                <span className="text-base flex-shrink-0">{getTeamLogo(m.team2)}</span>
                              )}
                              <span className={`font-rajdhani font-bold text-xs truncate ${t2win ? 'text-mlt-blue' : m.team2 === 'TBD' ? 'text-mlt-dim' : 'text-white'}`}>
                                {m.team2}
                              </span>
                            </div>
                            {played && (
                              <span className={`font-mono-ibm font-bold text-sm flex-shrink-0 ${t2win ? 'text-mlt-green' : 'text-mlt-dim'}`}>
                                {m.score2}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const TournamentCard = ({ t }: { t: TournamentType }) => {
    const st = statusLabel(t.status);
    return (
      <div className="mlt-card overflow-hidden hover:border-mlt-blue transition-colors">
        <div className="px-5 py-4"
          style={{ background: 'linear-gradient(135deg, hsl(218,60%,10%) 0%, hsl(220,38%,8%) 100%)' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{t.logo}</span>
              <div>
                <div className="font-rajdhani font-bold text-white text-xl tracking-wide">{t.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-rajdhani font-bold text-xs px-2 py-0.5 rounded uppercase tracking-wider"
                    style={{ color: st.color, background: st.bg, border: `1px solid ${st.color}40` }}>
                    {st.label}
                  </span>
                  <span className="font-ibm text-mlt-dim text-xs">{t.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-rajdhani font-bold text-mlt-gold text-lg">{t.prizePool}</div>
              <div className="font-ibm text-mlt-dim text-xs">призовой фонд</div>
            </div>
          </div>
        </div>
        <div className="px-5 py-3 flex flex-wrap items-center gap-4 justify-between"
          style={{ borderTop: '1px solid hsl(220,25%,16%)' }}>
          <div className="flex flex-wrap gap-4">
            <div>
              <div className="font-ibm text-mlt-dim text-xs mb-0.5">Даты</div>
              <div className="font-rajdhani font-semibold text-white text-sm">
                {new Date(t.startDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })} —{' '}
                {new Date(t.endDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div className="font-ibm text-mlt-dim text-xs mb-0.5">Команды</div>
              <div className="font-rajdhani font-semibold text-white text-sm">{t.teams}</div>
            </div>
            <div>
              <div className="font-ibm text-mlt-dim text-xs mb-0.5">Формат</div>
              <div className="font-rajdhani font-semibold text-white text-sm">{t.format}</div>
            </div>
            {t.winner && (
              <div>
                <div className="font-ibm text-mlt-dim text-xs mb-0.5">Победитель</div>
                <div className="font-rajdhani font-bold text-mlt-gold text-sm">🏆 {t.winner}</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setSelectedId(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded font-rajdhani font-bold text-sm uppercase tracking-wider text-white transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ background: 'hsl(210,90%,55%)' }}
          >
            <Icon name="GitBranch" size={14} />
            Сетка
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-wide">Турниры</h1>

      {active.length > 0 && (
        <div>
          <div className="mlt-section-header mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-mlt-green animate-pulse" />
            <span>Активные турниры</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {active.map(t => <TournamentCard key={t.id} t={t} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div>
          <div className="mlt-section-header mb-3">Предстоящие турниры</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcoming.map(t => <TournamentCard key={t.id} t={t} />)}
          </div>
        </div>
      )}

      {finished.length > 0 && (
        <div>
          <div className="mlt-section-header mb-3">Завершённые турниры</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {finished.map(t => <TournamentCard key={t.id} t={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}
