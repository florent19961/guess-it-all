import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import Counter from '../ui/Counter';
import Toggle from '../ui/Toggle';
import Modal from '../ui/Modal';
import Slider from '../ui/Slider';
import { Settings, RotateCcw } from 'lucide-react';
import { getCategoryList } from '../../utils/wordCategories';

/**
 * Écran 2 : Paramètres de la partie
 */
function SettingsScreen() {
  const { state, actions } = useGame();
  const { settings } = state;

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);
  const [error, setError] = useState('');

  // Synchroniser les paramètres locaux avec le contexte
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Validation : minimum 2 joueurs par équipe
  const minPlayersRequired = localSettings.numberOfTeams * 2;
  const isValidPlayerCount = localSettings.numberOfPlayers >= minPlayersRequired;

  useEffect(() => {
    if (!isValidPlayerCount) {
      setError('Minimum 2 joueurs par équipe requis');
    } else {
      setError('');
    }
  }, [isValidPlayerCount]);

  const handleNumberOfTeamsChange = (value) => {
    const newSettings = { ...localSettings, numberOfTeams: value };
    setLocalSettings(newSettings);
    actions.updateSettings(newSettings);
  };

  const handleNumberOfPlayersChange = (value) => {
    const newSettings = { ...localSettings, numberOfPlayers: value };
    setLocalSettings(newSettings);
    actions.updateSettings(newSettings);
  };

  const handleWordChoiceChange = (value) => {
    const newSettings = { ...localSettings, wordChoice: value.toLowerCase() };
    setLocalSettings(newSettings);
    actions.updateSettings(newSettings);
  };

  const handleResetSettings = () => {
    setShowResetConfirmation(true);
  };

  const handleConfirmReset = () => {
    actions.clearLocalStorage();
    setShowResetConfirmation(false);
    // Le state est déjà réinitialisé par clearLocalStorage, pas besoin de redirection
  };

  const handleCancelReset = () => {
    setShowResetConfirmation(false);
  };

  const handleNext = () => {
    if (isValidPlayerCount) {
      // Initialiser les joueurs si nécessaire
      if (state.players.length === 0 || state.players.length !== localSettings.numberOfPlayers) {
        // Réinitialiser les joueurs
        actions.goToScreen('players');
      } else {
        actions.goToScreen('players');
      }
    }
  };

  const handleSaveAdvancedOptions = () => {
    // Sauvegarder TOUTES les options dans le contexte
    actions.updateSettings(localSettings);
    setShowAdvancedOptions(false);
  };

  const handleCloseAdvancedOptions = () => {
    // Annuler TOUS les changements (restaurer depuis contexte)
    setLocalSettings(settings);
    setShowAdvancedOptions(false);
  };

  // Gestion des catégories de mots
  const handleCategoryToggle = (categoryId, isChecked) => {
    setLocalSettings(prev => {
      const currentCategories = prev.selectedCategories || [];
      const newCategories = isChecked
        ? [...currentCategories, categoryId]
        : currentCategories.filter(id => id !== categoryId);

      return { ...prev, selectedCategories: newCategories };
    });
  };

  const handleSelectAllCategories = () => {
    const allCategories = getCategoryList().map(cat => cat.id);
    const newSettings = { ...localSettings, selectedCategories: allCategories };
    setLocalSettings(newSettings);
  };

  const handleDeselectAllCategories = () => {
    const newSettings = { ...localSettings, selectedCategories: [] };
    setLocalSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Bouton Options avancées */}
      <button
        onClick={() => setShowAdvancedOptions(true)}
        className="fixed top-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-background-card border-2 border-secondary-cyan rounded-xl text-white font-poppins hover:bg-secondary-cyan hover:bg-opacity-20 transition-all duration-200"
      >
        <Settings size={20} />
        <span className="hidden md:inline">Options avancées</span>
      </button>

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="font-bangers text-6xl text-white text-center mb-12 drop-shadow-[2px_2px_0_#e88b8b]">
          Configuration
        </h1>

        <div className="bg-background-card border-2 border-secondary-cyan rounded-2xl p-8 backdrop-blur-sm space-y-8">
          {/* Nombre d'équipes */}
          <div>
            <Counter
              label="Nombre d'équipes"
              value={localSettings.numberOfTeams}
              onChange={handleNumberOfTeamsChange}
              min={2}
              max={4}
            />
          </div>

          {/* Nombre de joueurs */}
          <div>
            <Counter
              label="Nombre de joueurs"
              value={localSettings.numberOfPlayers}
              onChange={handleNumberOfPlayersChange}
              min={4}
              max={20}
              error={error}
            />
          </div>

          {/* Choix des mots */}
          <div>
            <label className="block font-poppins text-white text-base mb-3">
              Choix des mots
            </label>
            <Toggle
              options={['Aléatoire', 'Personnalisé']}
              selected={localSettings.wordChoice === 'aléatoire' ? 'Aléatoire' : 'Personnalisé'}
              onChange={handleWordChoiceChange}
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            variant="ghost"
            size="medium"
            onClick={handleResetSettings}
            className="flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Réinitialiser
          </Button>

          <Button
            variant="primary"
            size="large"
            onClick={handleNext}
            disabled={!isValidPlayerCount}
            className="px-12"
          >
            Suivant
          </Button>
        </div>
      </main>

      {/* Modal Options avancées */}
      <Modal
        isOpen={showAdvancedOptions}
        onClose={handleCloseAdvancedOptions}
        title="Options avancées"
      >
        <div className="space-y-6">
          {/* Nombre de mots par joueur */}
          <Slider
            label="Nombre de mots par joueur"
            min={4}
            max={10}
            value={localSettings.wordsPerPlayer}
            onChange={(value) => {
              const newSettings = { ...localSettings, wordsPerPlayer: value };
              setLocalSettings(newSettings);
            }}
            showValue={true}
            unit=" mots"
          />

          {/* Durée d'un tour */}
          <Slider
            label="Durée d'un tour"
            min={20}
            max={60}
            value={localSettings.turnDuration}
            onChange={(value) => {
              const newSettings = { ...localSettings, turnDuration: value };
              setLocalSettings(newSettings);
            }}
            showValue={true}
            unit="s"
          />

          {/* Temps de pénalité pour passer */}
          <Slider
            label="Temps de pénalité pour passer un mot"
            min={0}
            max={10}
            value={localSettings.passPenalty}
            onChange={(value) => {
              const newSettings = { ...localSettings, passPenalty: value };
              setLocalSettings(newSettings);
            }}
            showValue={true}
            unit="s"
          />

          {/* Section Catégories de mots */}
          <div className="border-t border-gray-600 pt-6 mt-6">
            <h3 className="font-poppins text-white text-lg font-semibold mb-2">
              📂 Catégories de mots
            </h3>
            <p className="font-poppins text-gray-400 text-sm mb-4">
              Sélectionnez les catégories depuis lesquelles les mots seront tirés aléatoirement
            </p>

            {/* Grille de checkboxes */}
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
              {getCategoryList().map(category => (
                <label
                  key={category.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    localSettings.selectedCategories?.includes(category.id)
                      ? 'border-secondary-cyan bg-secondary-cyan/20'
                      : 'border-gray-600 bg-background-card/50 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={localSettings.selectedCategories?.includes(category.id) || false}
                    onChange={(e) => handleCategoryToggle(category.id, e.target.checked)}
                    className="w-4 h-4 accent-secondary-cyan cursor-pointer"
                  />
                  <span className="text-xl">{category.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins text-white text-sm font-medium truncate">
                      {category.name}
                    </p>
                    <p className="font-poppins text-gray-400 text-xs">
                      {category.words.length} mots
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Boutons "Tout sélectionner / Tout désélectionner" */}
            <div className="mt-4 flex gap-2">
              <Button
                variant="ghost"
                size="small"
                onClick={handleSelectAllCategories}
                className="flex-1 text-xs"
              >
                Tout sélectionner
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={handleDeselectAllCategories}
                className="flex-1 text-xs"
              >
                Tout désélectionner
              </Button>
            </div>

            {/* Message d'erreur si aucune catégorie sélectionnée */}
            {(!localSettings.selectedCategories || localSettings.selectedCategories.length === 0) && (
              <p className="font-poppins text-error-red text-sm mt-2">
                ⚠️ Au moins une catégorie requise
              </p>
            )}
          </div>

          {/* Bouton Enregistrer */}
          <div className="pt-4">
            <Button
              variant="primary"
              size="large"
              onClick={handleSaveAdvancedOptions}
              disabled={!localSettings.selectedCategories || localSettings.selectedCategories.length === 0}
              className="w-full"
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </Modal>

      {/* Popup de confirmation de réinitialisation */}
      <Modal isOpen={showResetConfirmation} onClose={handleCancelReset}>
        <div className="space-y-6">
          {/* Titre */}
          <h2 className="font-bangers text-4xl text-white text-center drop-shadow-[2px_2px_0_#e88b8b]">
            ⚠️ Réinitialisation complète
          </h2>

          {/* Message principal */}
          <p className="font-poppins text-lg text-white text-center">
            Cette action supprimera TOUTES les données suivantes :
          </p>

          {/* Liste des éléments supprimés */}
          <div className="bg-background-card/50 rounded-xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les joueurs et leurs noms</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les mots saisis par les joueurs</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Les équipes constituées et leurs noms personnalisés</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les scores et l'historique de la partie</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les paramètres personnalisés</p>
            </div>
          </div>

          {/* Avertissement */}
          <p className="font-poppins text-warning-yellow text-center font-semibold">
            Cette action est irréversible.
          </p>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={handleCancelReset}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmReset}
              className="flex-1 bg-error-red hover:bg-error-red/80"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SettingsScreen;
