import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';

/**
 * Écran 6 : Cinématique de démarrage du tour (countdown 3, 2, 1)
 */
function CountdownScreen() {
  const { state } = useGame();
  const { game, teams, players } = state;
  const { currentRound, currentTeamIndex, currentPlayerIndexInTeam } = game;

  const [count, setCount] = useState(3);

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

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden flex items-center justify-center">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 text-center">
        {count > 0 ? (
          <>
            <div className="font-bangers text-9xl md:text-[200px] text-secondary-cyan mb-8 animate-pulse drop-shadow-[4px_4px_0_#6ecbb8]">
              {count}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-bangers text-7xl md:text-9xl text-white mb-8 animate-bounce drop-shadow-[4px_4px_0_#e88b8b]">
              À ton tour !
            </h1>

            <p className="font-poppins text-4xl md:text-5xl text-secondary-cyan mb-4">
              {currentPlayer?.name}
            </p>

            <p className="font-poppins text-2xl md:text-3xl text-white mb-8">
              Équipe : {currentTeam?.name}
            </p>

            <p className="font-poppins text-xl text-gray-400">
              ({getRoundMode(currentRound)})
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default CountdownScreen;
