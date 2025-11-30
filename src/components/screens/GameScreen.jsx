import React from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import HomeButton from '../ui/HomeButton';

/**
 * Écran 5 : Écran de partie (entre les tours)
 */
function GameScreen() {
  const { state, actions } = useGame();
  const { game, teams, players } = state;
  const { currentRound, currentTurn, currentTeamIndex, currentPlayerIndexInTeam } = game;

  const currentTeam = teams[currentTeamIndex];
  const currentPlayerId = currentTeam?.playerIds[currentPlayerIndexInTeam];
  const currentPlayer = players.find(p => p.id === currentPlayerId);

  const getRoundMode = (round) => {
    switch (round) {
      case 1:
        return 'Description verbale';
      case 2:
        return 'Un seul mot';
      case 3:
        return 'Mime';
      default:
        return '';
    }
  };

  const getTeamColor = (index) => {
    const colors = ['team-1', 'team-2', 'team-3', 'team-4'];
    return colors[index] || 'team-1';
  };

  const getTeamTextColorClass = (index) => {
    const colors = ['text-[#f19b9b]', 'text-[#7dd3c0]', 'text-[#a78bfa]', 'text-[#fbbf24]'];
    return colors[index] || 'text-[#f19b9b]';
  };

  const getTeamBorderClass = (index) => {
    const colors = ['border-[#f19b9b]', 'border-[#7dd3c0]', 'border-[#a78bfa]', 'border-[#fbbf24]'];
    return colors[index] || 'border-[#f19b9b]';
  };

  const getTeamBgClass = (index) => {
    const colors = ['bg-[#f19b9b]', 'bg-[#7dd3c0]', 'bg-[#a78bfa]', 'bg-[#fbbf24]'];
    return colors[index] || 'bg-[#f19b9b]';
  };

  const handleStartTurn = () => {
    actions.startTurn();
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden flex items-center justify-center">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Bouton Retour à l'accueil */}
      <HomeButton />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="font-bangers text-5xl text-white text-center mb-8 drop-shadow-[2px_2px_0_#e88b8b]">
          Manche {currentRound} : Tour {currentTurn}
        </h1>

        <p className="font-poppins text-center text-secondary-cyan text-2xl mb-12">
          {getRoundMode(currentRound)}
        </p>

        {/* Tableau des équipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={`bg-background-card border-2 ${getTeamBorderClass(index)} rounded-2xl p-6 backdrop-blur-sm ${
                index === currentTeamIndex ? 'ring-4 ring-white' : ''
              }`}
            >
              <h2 className={`font-bangers text-3xl ${getTeamTextColorClass(index)} mb-4 text-center`}>
                {team.name}
              </h2>

              <div className="font-bangers text-6xl text-white text-center mb-4">
                {team.score}
              </div>

              <div className="space-y-2">
                {team.playerIds.map((playerId, playerIndex) => {
                  const player = players.find(p => p.id === playerId);
                  const isCurrentPlayer =
                    index === currentTeamIndex && playerIndex === currentPlayerIndexInTeam;

                  return (
                    <div
                      key={playerId}
                      className={`font-poppins text-white text-center p-2 rounded-lg ${
                        isCurrentPlayer ? `${getTeamBgClass(index)} font-bold` : 'bg-background-main'
                      }`}
                    >
                      {player?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-background-card border-2 border-secondary-cyan rounded-2xl p-6 backdrop-blur-sm mb-8">
          <p className="font-poppins text-white text-center text-xl">
            Prochain joueur : <strong className="text-secondary-cyan">{currentPlayer?.name}</strong> ({currentTeam?.name})
          </p>
          <p className="font-poppins text-gray-400 text-center mt-2">
            Mots restants : {game.remainingWords.length}
          </p>
        </div>

        {/* Bouton démarrer le tour */}
        <div className="text-center">
          <Button
            variant="primary"
            size="large"
            onClick={handleStartTurn}
            className="px-16 py-6 text-2xl"
          >
            Démarrer le tour
          </Button>
        </div>
      </main>
    </div>
  );
}

export default GameScreen;
