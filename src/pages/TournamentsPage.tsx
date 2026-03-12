import { tournaments } from '@/data/mockData';
import Icon from '@/components/ui/icon';

export default function TournamentsPage() {
  const active = tournaments.filter(t => t.status === 'active');
  const upcoming = tournaments.filter(t => t.status === 'upcoming');
  const finished = tournaments.filter(t => t.status === 'finished');

  const statusLabel = (s: string) => {
    if (s === 'active') return { label: 'АКТИВЕН', color: 'hsl(142,70%,45%)', bg: 'hsla(142,70%,45%,0.12)' };
    if (s === 'upcoming') return { label: 'СКОРО', color: 'hsl(210,90%,55%)', bg: 'hsla(210,90%,55%,0.12)' };
    return { label: 'ЗАВЕРШЁН', color: 'hsl(215,15%,50%)', bg: 'hsla(215,15%,50%,0.12)' };
  };

  const TournamentCard = ({ t }: { t: typeof tournaments[0] }) => {
    const st = statusLabel(t.status);
    return (
      <div className="mlt-card overflow-hidden hover:border-mlt-blue transition-colors cursor-pointer">
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
        <div className="px-5 py-3 flex flex-wrap gap-4"
          style={{ borderTop: '1px solid hsl(220,25%,16%)' }}>
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
