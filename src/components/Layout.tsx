import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
  isAdmin?: boolean;
}

const navItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'teams', label: 'Команды', icon: 'Users' },
  { id: 'matches', label: 'Матчи', icon: 'Swords' },
  { id: 'tournaments', label: 'Турниры', icon: 'Trophy' },
  { id: 'players', label: 'MLT Игроки', icon: 'User' },
  { id: 'rating', label: 'MLT Рейтинг', icon: 'BarChart2' },
  { id: 'rules', label: 'Правила', icon: 'BookOpen' },
];

export default function Layout({ activeTab, onTabChange, children, isAdmin }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-mlt-border" style={{ background: 'hsl(220,40%,4%)' }}>
        <div className="max-w-[1280px] mx-auto px-4 h-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-mlt-dim font-ibm text-xs">CS2 TOURNAMENT PLATFORM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-mlt-dim font-ibm text-xs">12 марта 2026</span>
            {isAdmin && (
              <button
                onClick={() => onTabChange('admin')}
                className="text-xs font-rajdhani font-semibold uppercase tracking-wider text-mlt-gold hover:text-yellow-300 transition-colors"
              >
                ADMIN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b border-mlt-border" style={{ background: 'hsl(220,38%,6%)' }}>
        <div className="max-w-[1280px] mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded flex items-center justify-center"
              style={{ background: 'hsl(210,90%,55%)', boxShadow: '0 0 16px hsla(210,90%,55%,0.4)' }}>
              <span className="font-rajdhani font-bold text-white text-sm tracking-wider">MLT</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-rajdhani font-bold text-white text-lg leading-none tracking-wide">
                MLT <span style={{ color: 'hsl(210,90%,55%)' }}>TOURNAMENT</span>
              </div>
              <div className="font-ibm text-mlt-dim text-xs tracking-widest">CS2 LEAGUE</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-mlt-dim hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-mlt-border animate-fade-in"
            style={{ background: 'hsl(220,38%,6%)' }}>
            <div className="max-w-[1280px] mx-auto px-4 py-2 flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors ${
                    activeTab === item.id
                      ? 'text-mlt-blue bg-mlt-dark'
                      : 'text-mlt-dim hover:text-white'
                  }`}
                >
                  <Icon name={item.icon} fallback="Circle" size={16} />
                  <span className="font-rajdhani font-semibold text-sm uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => { onTabChange('admin'); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded text-left text-mlt-gold hover:text-yellow-300 transition-colors"
                >
                  <Icon name="Settings" size={16} />
                  <span className="font-rajdhani font-semibold text-sm uppercase tracking-wider">Админ-панель</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-mlt-border mt-8" style={{ background: 'hsl(220,40%,4%)' }}>
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: 'hsl(210,90%,55%)' }}>
              <span className="font-rajdhani font-bold text-white text-xs">M</span>
            </div>
            <span className="font-rajdhani font-semibold text-mlt-dim text-xs uppercase tracking-wider">
              MLT Tournament © 2026
            </span>
          </div>
          <span className="text-mlt-dim font-ibm text-xs">Профессиональная лига CS2</span>
        </div>
      </footer>
    </div>
  );
}