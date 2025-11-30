import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import BackButton from '../ui/BackButton';
import { Dice5, Trash2 } from 'lucide-react';
import { generateRandomWord } from '../../utils/wordDatabase';

/**
 * Écran 3bis : Choix des mots (par joueur)
 */
function WordsScreen() {
  const { state, actions } = useGame();
  const { settings, players, game } = state;
  const { wordsPerPlayer } = settings;

  // Trouver le joueur actuellement édité (dernier cliqué depuis PlayersScreen)
  // Pour simplifier, on prend le premier joueur qui n'a pas tous ses mots
  const currentPlayer = players.find(p => p.words.length < wordsPerPlayer) || players[0];

  const [words, setWords] = useState([]);
  const [errors, setErrors] = useState({});

  // Initialiser les mots
  useEffect(() => {
    if (currentPlayer) {
      const wordSlots = Array.from({ length: wordsPerPlayer }, (_, i) => {
        return currentPlayer.words[i] || '';
      });
      setWords(wordSlots);
    }
  }, [currentPlayer, wordsPerPlayer]);

  // Fonction pour obtenir tous les mots déjà utilisés
  const getAllUsedWords = () => {
    const allWords = [];
    players.forEach(player => {
      allWords.push(...player.words);
    });
    return allWords;
  };

  // Handler pour le changement de mot
  const handleWordChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);

    // Validation des doublons en temps réel
    const otherWords = newWords.filter((w, i) => i !== index && w.trim());

    if (otherWords.includes(value.trim()) && value.trim()) {
      setErrors(prev => ({
        ...prev,
        [index]: 'Doublon',
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  // Handler pour générer un mot aléatoire
  const handleGenerateWord = (index) => {
    const usedWords = [...getAllUsedWords(), ...words.filter((w, i) => i !== index)];
    const randomWord = generateRandomWord(usedWords, settings.selectedCategories);

    if (randomWord) {
      const newWords = [...words];
      newWords[index] = randomWord;
      setWords(newWords);

      // Effacer l'erreur si elle existe
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  // Handler pour effacer tous les mots
  const handleClearAll = () => {
    setWords(Array.from({ length: wordsPerPlayer }, () => ''));
    setErrors({});
  };

  // Handler pour remplir automatiquement ("Grosse flemme")
  const handleAutoFill = () => {
    const newWords = [...words];
    const usedWords = getAllUsedWords();

    newWords.forEach((word, index) => {
      // Remplir uniquement les champs vides ou en doublon
      if (!word.trim() || errors[index]) {
        const excludeWords = [...usedWords, ...newWords.filter((w, i) => i !== index)];
        const randomWord = generateRandomWord(excludeWords, settings.selectedCategories);
        if (randomWord) {
          newWords[index] = randomWord;
          usedWords.push(randomWord);
        }
      }
    });

    setWords(newWords);
    setErrors({});
  };

  // Handler pour sauvegarder les mots
  const handleSave = () => {
    // Vérifier qu'il n'y a pas d'erreurs et que tous les mots sont remplis
    const hasErrors = Object.keys(errors).length > 0;
    const allFilled = words.every(w => w.trim());

    if (!hasErrors && allFilled && currentPlayer) {
      actions.updatePlayerWords(currentPlayer.id, words.filter(w => w.trim()));
      actions.goToScreen('players');
    }
  };

  const handleBack = () => {
    actions.goToScreen('players');
  };

  // Calculer le statut
  const filledCount = words.filter(w => w.trim() && !errors[words.indexOf(w)]).length;
  const canSave = filledCount === wordsPerPlayer && Object.keys(errors).length === 0;

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-background-main flex items-center justify-center">
        <p className="font-poppins text-white text-xl">Aucun joueur sélectionné</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Flèche retour */}
      <BackButton onClick={handleBack} />

      {/* Icône poubelle (effacer tout) */}
      <button
        onClick={handleClearAll}
        className="fixed top-6 right-6 z-40 flex items-center justify-center w-12 h-12 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <Trash2 size={20} className="text-white" />
      </button>

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-bangers text-5xl text-white text-center mb-4 drop-shadow-[2px_2px_0_#e88b8b]">
          Mots de {currentPlayer.name}
        </h1>

        <p className="font-poppins text-center text-secondary-cyan text-2xl mb-8">
          {filledCount}/{wordsPerPlayer}
        </p>

        <div className="space-y-4">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              {/* Input mot */}
              <div className="flex-1">
                <Input
                  value={word}
                  onChange={(e) => handleWordChange(index, e.target.value)}
                  placeholder={`Mot ${index + 1}`}
                  error={errors[index]}
                  showClearButton={true}
                />
              </div>

              {/* Bouton dé (générer aléatoirement) */}
              <button
                onClick={() => handleGenerateWord(index)}
                className="flex items-center justify-center w-12 h-12 bg-secondary-cyan rounded-full hover:bg-secondary-cyan-dark transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Dice5 size={20} className="text-white" />
              </button>
            </div>
          ))}
        </div>

        {/* Boutons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            variant="secondary"
            size="medium"
            onClick={handleAutoFill}
          >
            Grosse flemme
          </Button>

          <Button
            variant="primary"
            size="large"
            onClick={handleSave}
            disabled={!canSave}
            className="px-12"
          >
            Enregistrer les mots
          </Button>
        </div>

        {!canSave && (
          <p className="font-poppins text-gray-400 text-center mt-4">
            Tous les mots doivent être remplis et uniques
          </p>
        )}
      </main>
    </div>
  );
}

export default WordsScreen;
