import { useState } from 'react';
import { teams, players, matches, tournaments, news } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const ADMIN_PASSWORD = 'mlt2026';

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  if (!auth) {
    return (
      <div className="animate-fade-in flex items-center justify-center min-h-[60vh]">
        <div className="mlt-card p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'hsl(210,90%,55%)', boxShadow: '0 0 20px hsla(210,90%,55%,0.3)' }}>
              <Icon name="Lock" size={20} style={{ color: 'white' }} />
            </div>
            <div className="font-rajdhani font-bold text-white text-2xl tracking-wide">ADMIN PANEL</div>
            <div className="font-ibm text-mlt-dim text-sm mt-1">MLT Tournament Management</div>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Пароль администратора"
              className="w-full px-4 py-2.5 rounded font-ibm text-sm text-white placeholder-mlt-dim outline-none focus:ring-1 focus:ring-mlt-blue transition-all"
              style={{ background: 'hsl(220,32%,14%)', border: '1px solid hsl(220,25%,18%)' }}
            />
            {error && <div className="font-ibm text-mlt-red text-xs">{error}</div>}
            <button
              onClick={login}
              className="w-full py-2.5 rounded font-rajdhani font-bold text-sm uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              style={{ background: 'hsl(210,90%,55%)' }}
            >
              Войти
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="font-ibm text-mlt-dim text-xs">Доступ только для администраторов MLT</span>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { id: 'teams', label: 'Команды', icon: 'Users' },
    { id: 'players', label: 'Игроки', icon: 'User' },
    { id: 'matches', label: 'Матчи', icon: 'Swords' },
    { id: 'tournaments', label: 'Турниры', icon: 'Trophy' },
    { id: 'news', label: 'Новости', icon: 'Newspaper' },
  ];

  const stats = [
    { label: 'Команды', value: teams.length, icon: 'Users', color: 'hsl(210,90%,55%)' },
    { label: 'Игроки', value: players.length, icon: 'User', color: 'hsl(142,70%,45%)' },
    { label: 'Матчи', value: matches.length, icon: 'Swords', color: 'hsl(42,90%,55%)' },
    { label: 'Турниры', value: tournaments.length, icon: 'Trophy', color: 'hsl(0,70%,55%)' },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-wide">Панель администратора</h1>
          <p className="font-ibm text-mlt-dim text-xs mt-0.5">MLT Tournament Management System</p>
        </div>
        <button
          onClick={() => setAuth(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded font-ibm text-sm text-mlt-dim hover:text-mlt-red transition-colors"
          style={{ border: '1px solid hsl(220,25%,18%)' }}
        >
          <Icon name="LogOut" size={14} />
          Выйти
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded font-rajdhani font-semibold text-xs uppercase tracking-wider transition-colors ${
              activeSection === s.id ? 'text-white' : 'text-mlt-dim hover:text-white'
            }`}
            style={{
              background: activeSection === s.id ? 'hsl(210,90%,55%)' : 'hsl(220,32%,11%)',
              border: '1px solid hsl(220,25%,18%)',
            }}
          >
            <Icon name={s.icon} fallback="Circle" size={13} />
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(s => (
              <div key={s.label} className="mlt-card px-4 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}35` }}>
                  <Icon name={s.icon} fallback="Circle" size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="font-rajdhani font-bold text-white text-2xl leading-none">{s.value}</div>
                  <div className="font-ibm text-mlt-dim text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mlt-card overflow-hidden">
              <div className="mlt-section-header">Последние действия</div>
              <div className="p-4 space-y-3">
                {[
                  { action: 'Матч добавлен', detail: 'PF vs SR — 2:1', time: '10 мар, 18:30' },
                  { action: 'Команда обновлена', detail: 'PHANTOM FORCE — состав', time: '09 мар, 14:10' },
                  { action: 'Турнир создан', detail: 'MLT Season 4 анонсирован', time: '08 мар, 11:00' },
                  { action: 'Новость опубликована', detail: 'LAN анонс сезона 4', time: '08 мар, 11:05' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-mlt-border last:border-0">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'hsl(210,90%,55%)' }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-rajdhani font-semibold text-white text-sm">{item.action}</div>
                      <div className="font-ibm text-mlt-dim text-xs truncate">{item.detail}</div>
                    </div>
                    <div className="font-ibm text-mlt-dim text-xs flex-shrink-0">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mlt-card overflow-hidden">
              <div className="mlt-section-header">Быстрые действия</div>
              <div className="p-4 grid grid-cols-2 gap-2">
                {[
                  { label: 'Добавить матч', icon: 'Plus' },
                  { label: 'Добавить команду', icon: 'UserPlus' },
                  { label: 'Новый турнир', icon: 'Trophy' },
                  { label: 'Публикация', icon: 'Newspaper' },
                  { label: 'Редакт. правила', icon: 'BookOpen' },
                  { label: 'Экспорт данных', icon: 'Download' },
                ].map(action => (
                  <button
                    key={action.label}
                    className="flex items-center gap-2 px-3 py-2.5 rounded font-ibm text-sm text-mlt-dim hover:text-white hover:bg-mlt-surface2 transition-colors text-left"
                    style={{ border: '1px solid hsl(220,25%,18%)' }}
                  >
                    <Icon name={action.icon} fallback="Circle" size={14} style={{ color: 'hsl(210,90%,55%)' }} />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'teams' && (
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header flex items-center justify-between">
            <span>Управление командами</span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded font-rajdhani font-semibold text-xs uppercase tracking-wider text-white normal-case"
              style={{ background: 'hsl(210,90%,55%)' }}>
              <Icon name="Plus" size={12} />
              Добавить
            </button>
          </div>
          <table className="w-full hltv-table">
            <thead>
              <tr>
                <th className="text-left">Команда</th>
                <th>Рейтинг</th>
                <th className="hidden sm:table-cell">Игроки</th>
                <th>W/L</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(t => (
                <tr key={t.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{t.logo}</span>
                      <span className="font-rajdhani font-bold text-white text-sm">{t.name}</span>
                    </div>
                  </td>
                  <td className="font-mono-ibm text-mlt-blue text-sm">{t.rating}</td>
                  <td className="hidden sm:table-cell font-ibm text-mlt-dim text-sm">{t.playerIds.length}</td>
                  <td className="font-ibm text-sm">
                    <span className="win-badge">{t.wins}</span>
                    <span className="text-mlt-dim mx-1">/</span>
                    <span className="lose-badge">{t.losses}</span>
                  </td>
                  <td>
                    <div className="flex gap-1 justify-center">
                      <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-blue transition-colors"
                        style={{ background: 'hsl(220,28%,14%)' }}>
                        <Icon name="Edit" size={13} />
                      </button>
                      <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-red transition-colors"
                        style={{ background: 'hsl(220,28%,14%)' }}>
                        <Icon name="Trash2" size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'players' && (
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header flex items-center justify-between">
            <span>Управление игроками</span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded font-rajdhani font-semibold text-xs uppercase tracking-wider text-white normal-case"
              style={{ background: 'hsl(210,90%,55%)' }}>
              <Icon name="Plus" size={12} />
              Добавить
            </button>
          </div>
          <table className="w-full hltv-table">
            <thead>
              <tr>
                <th className="text-left">Игрок</th>
                <th className="hidden sm:table-cell text-left">Команда</th>
                <th>Роль</th>
                <th>Рейтинг</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {players.map(p => {
                const pt = teams.find(t => t.id === p.teamId);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={p.avatar} alt={p.nickname} className="w-7 h-7 rounded-full bg-mlt-surface2" />
                        <span className="font-rajdhani font-bold text-white text-sm">{p.nickname}</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell font-ibm text-mlt-dim text-xs">{pt?.name || '—'}</td>
                    <td className="font-ibm text-mlt-dim text-xs text-center">{p.role}</td>
                    <td>
                      <span className={`font-mono-ibm font-bold text-sm ${
                        p.stats.rating >= 1.2 ? 'text-mlt-green' : p.stats.rating >= 1.0 ? 'text-white' : 'text-mlt-red'
                      }`}>{p.stats.rating.toFixed(2)}</span>
                    </td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-blue transition-colors"
                          style={{ background: 'hsl(220,28%,14%)' }}>
                          <Icon name="Edit" size={13} />
                        </button>
                        <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-red transition-colors"
                          style={{ background: 'hsl(220,28%,14%)' }}>
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'matches' && (
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header flex items-center justify-between">
            <span>Управление матчами</span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded font-rajdhani font-semibold text-xs uppercase tracking-wider text-white normal-case"
              style={{ background: 'hsl(210,90%,55%)' }}>
              <Icon name="Plus" size={12} />
              Добавить
            </button>
          </div>
          <table className="w-full hltv-table">
            <thead>
              <tr>
                <th className="text-left">Матч</th>
                <th className="hidden sm:table-cell">Счёт</th>
                <th>Статус</th>
                <th className="hidden md:table-cell">Турнир</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(m => {
                const t1 = teams.find(t => t.id === m.team1Id);
                const t2 = teams.find(t => t.id === m.team2Id);
                const d = new Date(m.date);
                const statusColors: Record<string, string> = {
                  finished: 'hsl(215,15%,50%)',
                  upcoming: 'hsl(210,90%,55%)',
                  live: 'hsl(142,70%,45%)',
                };
                const statusLabels: Record<string, string> = {
                  finished: 'ЗАВЕРШЁН',
                  upcoming: 'СКОРО',
                  live: 'LIVE',
                };
                return (
                  <tr key={m.id}>
                    <td>
                      <div className="font-rajdhani font-semibold text-white text-sm">
                        {t1?.name} vs {t2?.name}
                      </div>
                      <div className="font-ibm text-mlt-dim text-xs">
                        {d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell font-rajdhani font-bold text-white text-sm">
                      {m.status === 'finished' ? `${m.score1}:${m.score2}` : '—'}
                    </td>
                    <td>
                      <span className="font-rajdhani font-bold text-xs px-2 py-0.5 rounded uppercase tracking-wider"
                        style={{ color: statusColors[m.status], background: `${statusColors[m.status]}18`, border: `1px solid ${statusColors[m.status]}35` }}>
                        {statusLabels[m.status]}
                      </span>
                    </td>
                    <td className="hidden md:table-cell font-ibm text-mlt-dim text-xs">{m.tournament}</td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-blue transition-colors"
                          style={{ background: 'hsl(220,28%,14%)' }}>
                          <Icon name="Edit" size={13} />
                        </button>
                        <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-red transition-colors"
                          style={{ background: 'hsl(220,28%,14%)' }}>
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'tournaments' && (
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header flex items-center justify-between">
            <span>Управление турнирами</span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded font-rajdhani font-semibold text-xs uppercase tracking-wider text-white normal-case"
              style={{ background: 'hsl(210,90%,55%)' }}>
              <Icon name="Plus" size={12} />
              Создать
            </button>
          </div>
          <table className="w-full hltv-table">
            <thead>
              <tr>
                <th className="text-left">Турнир</th>
                <th className="hidden sm:table-cell">Призовой</th>
                <th>Статус</th>
                <th className="hidden md:table-cell">Команды</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map(t => {
                const statusColors: Record<string, string> = {
                  active: 'hsl(142,70%,45%)',
                  upcoming: 'hsl(210,90%,55%)',
                  finished: 'hsl(215,15%,50%)',
                };
                const statusLabels: Record<string, string> = {
                  active: 'АКТИВЕН',
                  upcoming: 'СКОРО',
                  finished: 'ЗАВЕРШЁН',
                };
                return (
                  <tr key={t.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{t.logo}</span>
                        <span className="font-rajdhani font-bold text-white text-sm">{t.name}</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell font-mono-ibm text-mlt-gold text-sm">{t.prizePool}</td>
                    <td>
                      <span className="font-rajdhani font-bold text-xs px-2 py-0.5 rounded uppercase tracking-wider"
                        style={{ color: statusColors[t.status], background: `${statusColors[t.status]}18`, border: `1px solid ${statusColors[t.status]}35` }}>
                        {statusLabels[t.status]}
                      </span>
                    </td>
                    <td className="hidden md:table-cell font-ibm text-mlt-dim text-sm text-center">{t.teams}</td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-blue transition-colors"
                          style={{ background: 'hsl(220,28%,14%)' }}>
                          <Icon name="Edit" size={13} />
                        </button>
                        <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-red transition-colors"
                          style={{ background: 'hsl(220,28%,14%)' }}>
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === 'news' && (
        <div className="mlt-card overflow-hidden">
          <div className="mlt-section-header flex items-center justify-between">
            <span>Управление новостями</span>
            <button className="flex items-center gap-1.5 px-3 py-1 rounded font-rajdhani font-semibold text-xs uppercase tracking-wider text-white normal-case"
              style={{ background: 'hsl(210,90%,55%)' }}>
              <Icon name="Plus" size={12} />
              Добавить
            </button>
          </div>
          <div className="divide-y divide-mlt-border">
            {news.map(item => (
              <div key={item.id} className="px-4 py-3 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-rajdhani font-bold text-xs uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ background: 'hsla(210,90%,55%,0.15)', color: 'hsl(210,90%,55%)' }}>
                      {item.category}
                    </span>
                    <span className="font-ibm text-mlt-dim text-xs">{item.date}</span>
                  </div>
                  <div className="font-rajdhani font-semibold text-white text-sm">{item.title}</div>
                  <div className="font-ibm text-mlt-dim text-xs mt-1 line-clamp-1">{item.preview}</div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-blue transition-colors"
                    style={{ background: 'hsl(220,28%,14%)' }}>
                    <Icon name="Edit" size={13} />
                  </button>
                  <button className="p-1.5 rounded text-mlt-dim hover:text-mlt-red transition-colors"
                    style={{ background: 'hsl(220,28%,14%)' }}>
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
