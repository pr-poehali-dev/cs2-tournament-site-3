import { useState } from 'react';
import { teams, players } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface RatingPageProps {
  onNavigate: (tab: string, id?: string) => void;
}

export default function RatingPage({ onNavigate }: RatingPageProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const sorted = [...teams].sort((a, b) => b.rating - a.rating);

  const team = selectedTeamId ? teams.find(t => t.id === selectedTeamId) : null;
  const teamPlayers = team ? players.filter(p => team.playerIds.includes(p.id)) : [];

  const rankColors = [
    'hsl(42,90%,55%)',   // gold
    'hsl(215,20%,70%)',  // silver
    'hsl(25,80%,50%)',   // bronze
  ];

  if (team) {
    const winRate = Math.round((team.wins / (team.wins + team.losses)) * 100);
    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setSelectedTeamId(null)}
          className="flex items-center gap-2 text-mlt-dim hover:text-mlt-blue transition-colors font-ibm text-sm"
        >
          <Icon name="ChevronLeft" size={16} />
          MLT Рейтинг
        </button>

        {/* Team header */}
        <div className="mlt-card overflow-hidden">
          <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: 'linear-gradient(135deg, hsl(218,60%,12%) 0%, hsl(220,38%,8%) 100%)' }}>
            <div className="w-14 h-14 rounded flex items-center justify-center font-rajdhani font-bold text-2xl flex-shrink-0"
              style={{
                color: team.rank <= 3 ? rankColors[team.rank - 1] : 'hsl(215,15%,50%)',
                border: `2px solid ${team.rank <= 3 ? rankColors[team.rank - 1] : 'hsl(220,25%,18%)'}`,
                background: team.rank <= 3 ? `${rankColors[team.rank - 1]}15` : 'hsl(220,32%,12%)',
              }}>
              #{team.rank}
            </div>
            <span className="text-5xl">{team.logo}</span>
            <div className="flex-1">
              <div className="font-rajdhani font-bold text-white text-3xl tracking-wide">{team.name}</div>
              <div className="flex gap-4 mt-2 flex-wrap">
                <div>
                  <span className="font-ibm text-mlt-dim text-xs">Рейтинг: </span>
                  <span className="font-mono-ibm font-bold text-mlt-blue">{team.rating}</span>
                </div>
                <div>
                  <span className="font-ibm text-mlt-dim text-xs">Win Rate: </span>
                  <span className="font-mono-ibm font-bold text-white">{winRate}%</span>
                </div>
                <div>
                  <span className="font-ibm text-mlt-dim text-xs">Матчи: </span>
                  <span className="font-mono-ibm text-white">{team.wins + team.losses}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roster with photos - HLTV style */}
        <div className="mlt-section-header">Состав команды</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {teamPlayers.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate('players', p.id)}
              className="mlt-card overflow-hidden hover:border-mlt-blue transition-all text-left group"
            >
              <div className="aspect-square overflow-hidden flex items-center justify-center"
                style={{ background: 'hsl(218,55%,12%)' }}>
                <img
                  src={p.avatar}
                  alt={p.nickname}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <div className="font-rajdhani font-bold text-white text-base leading-tight">{p.nickname}</div>
                <div className="font-ibm text-mlt-dim text-xs">{p.role}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-ibm text-mlt-dim text-xs">Rating</span>
                  <span className={`font-mono-ibm font-bold text-sm ${
                    p.stats.rating >= 1.2 ? 'text-mlt-green' : p.stats.rating >= 1.0 ? 'text-white' : 'text-mlt-red'
                  }`}>{p.stats.rating.toFixed(2)}</span>
                </div>
              </div>
            </button>
          ))}

          {teamPlayers.length === 0 && (
            <div className="col-span-full mlt-card p-8 text-center text-mlt-dim font-ibm text-sm">
              Состав команды не заполнен
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-wide">MLT Рейтинг</h1>
        <div className="font-ibm text-mlt-dim text-xs">Обновлено: 12.03.2026</div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {sorted.slice(0, 3).map((t, i) => (
          <button
            key={t.id}
            onClick={() => setSelectedTeamId(t.id)}
            className={`mlt-card overflow-hidden hover:border-mlt-blue transition-colors text-center p-4 ${i === 0 ? 'order-2' : i === 1 ? 'order-1' : 'order-3'}`}
            style={{
              borderColor: `${rankColors[i]}50`,
              background: `linear-gradient(180deg, ${rankColors[i]}0d 0%, hsl(220,32%,11%) 100%)`
            }}
          >
            <div className="font-rajdhani font-bold text-3xl mb-1"
              style={{ color: rankColors[i] }}>
              {i === 0 ? '1st' : i === 1 ? '2nd' : '3rd'}
            </div>
            <div className="text-4xl mb-2">{t.logo}</div>
            <div className="font-rajdhani font-bold text-white text-sm leading-tight mb-1">{t.name}</div>
            <div className="font-mono-ibm text-mlt-blue font-bold text-lg">{t.rating}</div>
            <div className="font-ibm text-mlt-dim text-xs mt-1">{t.wins}W — {t.losses}L</div>
          </button>
        ))}
      </div>

      {/* Full table - HLTV style */}
      <div className="mlt-card overflow-hidden overflow-x-auto">
        <table className="w-full hltv-table min-w-[480px]">
          <thead>
            <tr>
              <th className="text-center w-12">#</th>
              <th className="text-left">Команда</th>
              <th>Рейтинг</th>
              <th className="hidden sm:table-cell">W</th>
              <th className="hidden sm:table-cell">L</th>
              <th>Win%</th>
              <th className="hidden md:table-cell">Δ</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, i) => {
              const wr = Math.round((t.wins / (t.wins + t.losses)) * 100);
              return (
                <tr key={t.id} className="cursor-pointer" onClick={() => setSelectedTeamId(t.id)}>
                  <td className="text-center">
                    {i < 3 ? (
                      <span className="font-rajdhani font-bold text-base" style={{ color: rankColors[i] }}>{i + 1}</span>
                    ) : (
                      <span className="font-ibm text-mlt-dim text-sm">{i + 1}</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{t.logo}</span>
                      <div>
                        <div className="font-rajdhani font-bold text-white text-sm">{t.name}</div>
                        <div className="font-mono-ibm text-mlt-dim text-xs">[{t.tag}]</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-mono-ibm font-bold text-mlt-blue">{t.rating}</span>
                  </td>
                  <td className="hidden sm:table-cell win-badge text-center">{t.wins}</td>
                  <td className="hidden sm:table-cell lose-badge text-center">{t.losses}</td>
                  <td className="text-center">
                    <div>
                      <div className="font-mono-ibm text-white text-xs mb-1">{wr}%</div>
                      <div className="h-1 w-16 mx-auto rounded-full overflow-hidden" style={{ background: 'hsl(220,25%,18%)' }}>
                        <div className="h-full rounded-full" style={{ width: `${wr}%`, background: 'hsl(210,90%,55%)' }} />
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-center">
                    <span className="font-mono-ibm text-mlt-green text-xs">+{Math.floor(Math.random() * 20)}</span>
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
