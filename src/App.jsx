import React from 'react';
import { GameProvider } from './context/GameContext';
import HomeScreen from './components/screens/HomeScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import RulesScreen from './components/screens/RulesScreen';
import PlayersScreen from './components/screens/PlayersScreen';
import WordsScreen from './components/screens/WordsScreen';
import TeamsScreen from './components/screens/TeamsScreen';
import GameScreen from './components/screens/GameScreen';
import CountdownScreen from './components/screens/CountdownScreen';
import TurnScreen from './components/screens/TurnScreen';
import VerificationScreen from './components/screens/VerificationScreen';
import TransitionScreen from './components/screens/TransitionScreen';
import ResultsScreen from './components/screens/ResultsScreen';
import { useGame } from './context/GameContext';

/**
 * Composant principal qui gère le routing entre les écrans
 */
function AppContent() {
  const { state } = useGame();
  const { currentScreen } = state.game;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'rules':
        return <RulesScreen />;
      case 'players':
        return <PlayersScreen />;
      case 'words':
        return <WordsScreen />;
      case 'teams':
        return <TeamsScreen />;
      case 'game':
        return <GameScreen />;
      case 'countdown':
        return <CountdownScreen />;
      case 'turn':
        return <TurnScreen />;
      case 'verification':
        return <VerificationScreen />;
      case 'transition':
        return <TransitionScreen />;
      case 'results':
        return <ResultsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return <>{renderScreen()}</>;
}

/**
 * App root avec GameProvider
 */
function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
