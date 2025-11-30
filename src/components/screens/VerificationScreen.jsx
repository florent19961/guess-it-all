import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import HomeButton from '../ui/HomeButton';

/**
 * Écran 8 : Vérification des mots
 */
function VerificationScreen() {
  const { state, actions } = useGame();
  const { game, teams, players } = state;
  const {
    wordsGuessedThisTurn,
    passedWordsThisTurn,
    currentTeamIndex,
    currentPlayerIndexInTeam,
  } = game;

  // Créer une liste mixte avec métadonnées
  const allWords = [
    ...wordsGuessedThisTurn.map(word => ({ word, isPassed: false })),
    ...passedWordsThisTurn.map(word => ({ word, isPassed: true }))
  ];

  // State pour gérer les mots invalidés (Set pour faciliter toggle)
  // Les mots passés commencent invalidés (rouges)
  const [invalidatedWords, setInvalidatedWords] = useState(new Set(passedWordsThisTurn));

  const currentTeam = teams[currentTeamIndex];
  const currentPlayerId = currentTeam?.playerIds[currentPlayerIndexInTeam];
  const currentPlayer = players.find(p => p.id === currentPlayerId);

  // Toggle : invalider ou re-valider un mot
  const toggleWordInvalidation = (word) => {
    setInvalidatedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(word)) {
        newSet.delete(word); // Re-valider
      } else {
        newSet.add(word); // Invalider
      }
      return newSet;
    });
  };

  const handleValidate = () => {
    // Filtrer les mots non invalidés (devinés ET passés validés)
    const validatedWords = allWords
      .map(({word}) => word)
      .filter(word => !invalidatedWords.has(word));
    actions.validateWords(validatedWords);
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden flex items-center justify-center">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Bouton Retour à l'accueil */}
      <HomeButton />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-bangers text-6xl text-white text-center mb-4 drop-shadow-[2px_2px_0_#e88b8b]">
          Vérification
        </h1>

        <p className="font-poppins text-center text-gray-400 text-xl mb-8">
          Tour de <strong className="text-white">{currentPlayer?.name}</strong>
        </p>

        <div className="bg-background-card border-2 border-secondary-cyan rounded-2xl p-8 backdrop-blur-sm mb-8">
          <h2 className="font-poppins text-white text-2xl mb-6">
            Mots validés : {allWords.length - invalidatedWords.size}
          </h2>

          {allWords.length === 0 ? (
            <p className="font-poppins text-gray-400 text-center py-8">
              Aucun mot ce tour
            </p>
          ) : (
            <div className="space-y-3">
              {allWords.map(({ word, isPassed }, index) => {
                const isInvalidated = invalidatedWords.has(word);
                return (
                  <button
                    key={index}
                    onClick={() => toggleWordInvalidation(word)}
                    className={`w-full p-4 rounded-xl font-poppins text-white flex items-center justify-between transition-all duration-200 ${
                      isInvalidated
                        ? 'bg-red-900 border-2 border-red-500 hover:bg-red-800'
                        : 'bg-background-main border-2 border-green-500 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${isInvalidated ? 'text-red-500' : 'text-green-500'}`}>
                        {isInvalidated ? '✗' : '✓'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{word}</span>
                        {isPassed && (
                          <span className="text-xs text-yellow-500 font-semibold">(passé)</span>
                        )}
                      </div>
                    </div>

                    <span className="text-sm text-gray-400">
                      {isInvalidated ? 'Cliquer pour valider' : 'Cliquer pour invalider'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {invalidatedWords.size > 0 && (
            <p className="font-poppins text-yellow-500 text-sm mt-4">
              {invalidatedWords.size} mot(s) invalidé(s) - ils seront remis dans le pot
            </p>
          )}
        </div>

        {/* Bouton valider */}
        <div className="text-center">
          <Button
            variant="primary"
            size="large"
            onClick={handleValidate}
            className="px-12"
          >
            Valider les mots
          </Button>
        </div>
      </main>
    </div>
  );
}

export default VerificationScreen;
