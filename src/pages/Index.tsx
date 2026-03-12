import { useState } from 'react';
import Layout from '@/components/Layout';
import HomePage from './HomePage';
import TeamsPage from './TeamsPage';
import MatchesPage from './MatchesPage';
import TournamentsPage from './TournamentsPage';
import PlayersPage from './PlayersPage';
import RatingPage from './RatingPage';
import RulesPage from './RulesPage';
import AdminPage from './AdminPage';

type Tab = 'home' | 'teams' | 'matches' | 'tournaments' | 'players' | 'rating' | 'rules' | 'admin';

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const navigate = (tab: string, id?: string) => {
    setActiveTab(tab as Tab);
    setSelectedId(id);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as Tab);
    setSelectedId(undefined);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'teams':
        return <TeamsPage onNavigate={navigate} selectedId={selectedId} />;
      case 'matches':
        return <MatchesPage selectedId={selectedId} />;
      case 'tournaments':
        return <TournamentsPage />;
      case 'players':
        return <PlayersPage selectedId={selectedId} />;
      case 'rating':
        return <RatingPage onNavigate={navigate} />;
      case 'rules':
        return <RulesPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      isAdmin={true}
    >
      {renderPage()}
    </Layout>
  );
}
