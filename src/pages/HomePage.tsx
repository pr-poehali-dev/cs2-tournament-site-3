import { teams, matches, tournaments, news, sponsors, players } from '@/data/mockData';
import Icon from '@/components/ui/icon';
import { HERO_IMAGE } from '@/data/mockData';

interface HomePageProps {
  onNavigate: (tab: string, id?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const top3 = [...teams].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const getTeam = (id: string) => teams.find(t => t.id === id);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }) + ' ' +
      d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const rankColors = ['hsl(42,90%,55%)', 'hsl(215,20%,70%)', 'hsl(25,80%,50%)'];
  const rankLabels = ['1st', '2nd', '3rd'];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Hero */}
      <div className="relative rounded overflow-hidden" style={{ height: '280px' }}>
        <img src={HERO_IMAGE} alt="MLT Tournament" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, hsl(220,40%,5%) 0%, hsla(220,40%,5%,0.6) 60%, transparent 100%)'
        }} />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="font-rajdhani font-bold text-white text-5xl md:text-6xl leading-none tracking-wider">
            MLT
          </div>
          <div className="font-rajdhani font-bold text-3xl md:text-4xl leading-none tracking-wider mt-1"
            style={{ color: 'hsl(210,90%,55%)' }}>
            CS2 TOURNAMENT
          </div>
          <div className="font-ibm text-mlt-dim text-sm mt-3 tracking-widest uppercase">
            Профессиональная лига · Сезон 3 · 2026
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => onNavigate('tournaments')}
              className="px-5 py-2 font-rajdhani font-bold text-sm uppercase tracking-wider text-white rounded transition-all hover:opacity-90"
              style={{ background: 'hsl(210,90%,55%)', boxShadow: '0 0 16px hsla(210,90%,55%,0.35)' }}
            >
              Турниры
            </button>
            <button
              onClick={() => onNavigate('matches')}
              className="px-5 py-2 font-rajdhani font-bold text-sm uppercase tracking-wider text-mlt-blue rounded border border-mlt-border hover:border-mlt-blue transition-colors"
              style={{ background: 'hsla(220,40%,8%,0.8)' }}
            >
              Матчи
            </button>
          </div>
        </div>

        {/* Live badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded"
          style={{ background: 'hsl(220,38%,8%)', border: '1px solid hsl(220,25%,18%)' }}>
          <div className="w-2 h-2 rounded-full bg-mlt-green animate-pulse" />
          <span className="font-rajdhani font-bold text-xs uppercase tracking-wider text-mlt-green">
            Сезон 3 Активен
          </span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Команды', value: teams.length, icon: 'Users' },
          { label: 'Матчи', value: matches.filter(m => m.status === 'finished').length, icon: 'Swords' },
          { label: 'Турниры', value: tournaments.length, icon: 'Trophy' },
          { label: 'Игроки', value: players.length, icon: 'User' },
        ].map(stat => (
          <div key={stat.label} className="mlt-card px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: 'hsl(210,90%,55%,0.15)' }}>
              <Icon name={stat.icon} size={16} style={{ color: 'hsl(210,90%,55%)' }} />
            </div>
            <div>
              <div className="font-rajdhani font-bold text-white text-xl leading-none">{stat.value}</div>
              <div className="font-ibm text-mlt-dim text-xs">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming matches */}
        <div className="lg:col-span-2">
          <div className="mlt-card overflow-hidden">
            <div className="mlt-section-header flex items-center justify-between">
              <span>Предстоящие матчи</span>
              <button onClick={() => onNavigate('matches')} className="text-mlt-dim hover:text-mlt-blue text-xs normal-case font-ibm font-normal tracking-normal">
                Все матчи →
              </button>
            </div>
            <div>
              {upcomingMatches.length === 0 ? (
                <div className="p-8 text-center text-mlt-dim font-ibm text-sm">Предстоящих матчей нет</div>
              ) : (
                upcomingMatches.map((match, i) => {
                  const t1 = getTeam(match.team1Id);
                  const t2 = getTeam(match.team2Id);
                  return (
                    <button
                      key={match.id}
                      onClick={() => onNavigate('matches', match.id)}
                      className="w-full px-4 py-4 flex items-center gap-3 hover:bg-mlt-surface2 transition-colors text-left"
                      style={{ borderBottom: i < upcomingMatches.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}
                    >
                      <div className="flex-1 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xl">{t1?.logo}</span>
                          <span className="font-rajdhani font-bold text-white text-sm">{t1?.name}</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="font-rajdhani font-bold text-mlt-blue text-sm tracking-wider">VS</div>
                          <div className="font-ibm text-mlt-dim text-xs">{formatDate(match.date)}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                          <span className="font-rajdhani font-bold text-white text-sm text-right">{t2?.name}</span>
                          <span className="text-xl">{t2?.logo}</span>
                        </div>
                      </div>
                      <div className="mlt-card-2 px-2 py-0.5 ml-2">
                        <span className="font-ibm text-mlt-dim text-xs">{match.tournament}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Top 3 teams */}
        <div>
          <div className="mlt-card overflow-hidden">
            <div className="mlt-section-header flex items-center justify-between">
              <span>Топ-3 Рейтинга</span>
              <button onClick={() => onNavigate('rating')} className="text-mlt-dim hover:text-mlt-blue text-xs normal-case font-ibm font-normal tracking-normal">
                Все →
              </button>
            </div>
            {top3.map((team, i) => (
              <button
                key={team.id}
                onClick={() => onNavigate('teams', team.id)}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-mlt-surface2 transition-colors text-left"
                style={{ borderBottom: i < 2 ? '1px solid hsl(220,25%,16%)' : 'none' }}
              >
                <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 font-rajdhani font-bold text-sm"
                  style={{ color: rankColors[i], border: `1px solid ${rankColors[i]}`, background: `${rankColors[i]}18` }}>
                  {i + 1}
                </div>
                <span className="text-2xl">{team.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-rajdhani font-bold text-white text-sm truncate">{team.name}</div>
                  <div className="font-ibm text-mlt-dim text-xs">{team.wins}W — {team.losses}L</div>
                </div>
                <div className="font-mono-ibm text-mlt-blue text-sm font-bold">{team.rating}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News */}
      <div>
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header">Новости</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {news.map((item, i) => (
              <div
                key={item.id}
                className="p-4 hover:bg-mlt-surface2 transition-colors cursor-pointer"
                style={{ borderBottom: '1px solid hsl(220,25%,16%)', borderRight: i % 2 === 0 ? '1px solid hsl(220,25%,16%)' : 'none' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-rajdhani font-bold text-xs uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ background: 'hsl(210,90%,55%,0.15)', color: 'hsl(210,90%,55%)' }}>
                    {item.category}
                  </span>
                  <span className="font-ibm text-mlt-dim text-xs">{item.date}</span>
                </div>
                <div className="font-rajdhani font-semibold text-white text-base leading-tight mb-1">{item.title}</div>
                <div className="font-ibm text-mlt-dim text-xs leading-relaxed line-clamp-2">{item.preview}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <div>
        <div className="mlt-section-header mb-3">Партнёры и спонсоры</div>
        <div className="mlt-card px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {sponsors.map(sp => (
              <div key={sp.id} className="flex flex-col items-center gap-1">
                <div
                  className="px-5 py-2 rounded font-rajdhani font-bold tracking-widest text-sm"
                  style={{
                    background: `${sp.color}20`,
                    color: sp.color,
                    border: `1px solid ${sp.color}40`,
                    fontSize: sp.tier === 'title' ? '16px' : '13px',
                  }}
                >
                  {sp.name}
                </div>
                <span className="font-ibm text-mlt-dim text-xs uppercase tracking-wider">{sp.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
