import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import HomeButton from '../ui/HomeButton';

/**
 * Écran 10 : Résultats finaux
 */
function ResultsScreen() {
  const { state, actions } = useGame();
  const { teams } = state;

  const [showDetails, setShowDetails] = useState(false);

  // Trier les équipes par score (décroissant)
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const handleReplay = () => {
    actions.restartWithSamePlayers();
    actions.goToScreen('players');
  };

  const handleNewGame = () => {
    actions.resetGame();
    actions.goToScreen('settings');
  };

  const handleHome = () => {
    actions.resetGame();
    actions.goToScreen('home');
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Bouton Retour à l'accueil */}
      <HomeButton />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="font-bangers text-7xl text-white text-center mb-12 drop-shadow-[4px_4px_0_#e88b8b] animate-bounce">
          Partie terminée !
        </h1>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {/* 2ème place */}
          {sortedTeams[1] && (
            <div className="flex-1 max-w-[200px] text-center">
              <div className="text-6xl mb-2">🥈</div>
              <div className="bg-background-card border-2 border-gray-400 rounded-2xl p-4 backdrop-blur-sm h-32 flex flex-col justify-center">
                <h3 className="font-bangers text-2xl text-gray-300 mb-2">
                  {sortedTeams[1].name}
                </h3>
                <p className="font-bangers text-3xl text-gray-400">
                  {sortedTeams[1].score} pts
                </p>
              </div>
            </div>
          )}

          {/* 1ère place */}
          {sortedTeams[0] && (
            <div className="flex-1 max-w-[240px] text-center">
              <div className="text-8xl mb-2">🥇</div>
              <div className="bg-background-card border-4 border-yellow-500 rounded-2xl p-6 backdrop-blur-sm h-40 flex flex-col justify-center ring-4 ring-yellow-500 ring-opacity-50">
                <h3 className="font-bangers text-3xl text-yellow-500 mb-2">
                  {sortedTeams[0].name}
                </h3>
                <p className="font-bangers text-5xl text-yellow-500">
                  {sortedTeams[0].score} pts
                </p>
              </div>
            </div>
          )}

          {/* 3ème place */}
          {sortedTeams[2] && (
            <div className="flex-1 max-w-[180px] text-center">
              <div className="text-5xl mb-2">🥉</div>
              <div className="bg-background-card border-2 border-orange-400 rounded-2xl p-3 backdrop-blur-sm h-24 flex flex-col justify-center">
                <h3 className="font-bangers text-xl text-orange-300 mb-1">
                  {sortedTeams[2].name}
                </h3>
                <p className="font-bangers text-2xl text-orange-400">
                  {sortedTeams[2].score} pts
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bouton Score détaillé */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            size="medium"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Masquer' : 'Score détaillé'}
          </Button>
        </div>

        {/* Tableau détaillé */}
        {showDetails && (
          <div className="bg-background-card border-2 border-secondary-cyan rounded-2xl p-6 backdrop-blur-sm mb-8 overflow-x-auto">
            <h2 className="font-bangers text-3xl text-white mb-6 text-center">
              Évolution des scores
            </h2>

            <table className="w-full font-poppins text-white">
              <thead>
                <tr className="border-b-2 border-gray-700">
                  <th className="text-left p-3">Équipe</th>
                  <th className="text-center p-3">Manche 1</th>
                  <th className="text-center p-3">Manche 2</th>
                  <th className="text-center p-3">Manche 3</th>
                  <th className="text-center p-3 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedTeams.map((team, index) => (
                  <tr
                    key={team.id}
                    className={`border-b border-gray-700 ${
                      index === 0 ? 'bg-yellow-500 bg-opacity-10' : ''
                    }`}
                  >
                    <td className="p-3 font-bold">{team.name}</td>
                    <td className="text-center p-3">{team.scoreByRound[0]}</td>
                    <td className="text-center p-3">{team.scoreByRound[1]}</td>
                    <td className="text-center p-3">{team.scoreByRound[2]}</td>
                    <td className="text-center p-3 font-bold text-secondary-cyan">
                      {team.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="secondary" size="large" onClick={handleReplay}>
            Rejouer
          </Button>

          <Button variant="primary" size="large" onClick={handleNewGame}>
            Nouvelle partie
          </Button>

          <Button variant="ghost" size="medium" onClick={handleHome}>
            Retour à l'accueil
          </Button>
        </div>

        {/* Message de félicitations */}
        <p className="font-poppins text-center text-gray-400 mt-8 text-lg">
          Félicitations à <strong className="text-yellow-500">{sortedTeams[0]?.name}</strong> pour cette victoire ! 🎉
        </p>
      </main>
    </div>
  );
}

export default ResultsScreen;
