import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import { Shuffle, Edit3, GripVertical } from 'lucide-react';

/**
 * Écran 4 : Constitution des équipes
 */
function TeamsScreen() {
  const { state, actions } = useGame();
  const { teams, players, settings } = state;

  const [editingTeamId, setEditingTeamId] = useState(null);
  const [teamNames, setTeamNames] = useState({});
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  // Initialiser les noms d'équipes et répartir aléatoirement si nécessaire
  useEffect(() => {
    const names = {};
    teams.forEach(team => {
      names[team.id] = team.name;
    });
    setTeamNames(names);

    // Répartir aléatoirement si équipes vides
    const allEmpty = teams.every(t => t.playerIds.length === 0);
    if (allEmpty) {
      actions.randomizeTeams();
    }
  }, []);

  // Ne considérer que les joueurs avec un nom
  const playersWithNames = players.filter(p => p.name && p.name.trim());

  // Vérifier si tous les joueurs sont assignés et min 2 par équipe
  const allTeamsValid = teams.every(team => team.playerIds.length >= 2);
  const totalAssigned = teams.reduce((sum, team) => sum + team.playerIds.length, 0);
  const allAssigned = totalAssigned === playersWithNames.length;
  const canStart = allAssigned && allTeamsValid;

  const handleBack = () => {
    actions.goToScreen('players');
  };

  const handleRandomize = () => {
    actions.randomizeTeams();
  };

  const handleAssignPlayer = (playerId, teamId) => {
    actions.movePlayerToTeam(playerId, teamId);
  };

  const handleEditTeamName = (teamId) => {
    setEditingTeamId(teamId);
  };

  const handleSaveTeamName = (teamId) => {
    const newName = teamNames[teamId];
    if (newName && newName.trim()) {
      actions.updateTeamName(teamId, newName.trim());
    }
    setEditingTeamId(null);
  };

  const handleStart = () => {
    if (canStart) {
      actions.startGame();
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (e, playerId) => {
    setDraggedPlayer(playerId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragEnd = () => {
    setDraggedPlayer(null);
    setDropTarget(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (targetId) => {
    setDropTarget(targetId);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e, targetTeamId) => {
    e.preventDefault();
    if (draggedPlayer && targetTeamId) {
      handleAssignPlayer(draggedPlayer, targetTeamId);
    }
    setDraggedPlayer(null);
    setDropTarget(null);
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

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Flèche retour */}
      <BackButton onClick={handleBack} />

      {/* Bouton répartition aléatoire */}
      <button
        onClick={handleRandomize}
        className="fixed top-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-background-card border-2 border-secondary-cyan rounded-xl text-white font-poppins hover:bg-secondary-cyan hover:bg-opacity-20 transition-all duration-200"
      >
        <Shuffle size={20} />
        <span className="hidden md:inline">Répartir</span>
      </button>

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="font-bangers text-6xl text-white text-center mb-12 drop-shadow-[2px_2px_0_#e88b8b]">
          Formation des équipes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Équipes */}
          {teams.map((team, index) => (
            <div
              key={team.id}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(team.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, team.id)}
              className={`bg-background-card border-2 ${getTeamBorderClass(index)} rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
                dropTarget === team.id && draggedPlayer
                  ? 'ring-4 ring-secondary-cyan ring-opacity-50 scale-105 shadow-2xl'
                  : ''
              }`}
            >
              {/* Nom de l'équipe (éditable) */}
              <div className="flex items-center gap-2 mb-4">
                {editingTeamId === team.id ? (
                  <input
                    type="text"
                    value={teamNames[team.id]}
                    onChange={(e) =>
                      setTeamNames(prev => ({
                        ...prev,
                        [team.id]: e.target.value,
                      }))
                    }
                    onBlur={() => handleSaveTeamName(team.id)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveTeamName(team.id);
                      }
                    }}
                    className="flex-1 bg-background-main border-2 border-secondary-cyan rounded-xl px-3 py-2 text-white font-bangers text-2xl focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <>
                    <h2 className={`flex-1 font-bangers text-2xl ${getTeamTextColorClass(index)}`}>
                      {team.name}
                    </h2>
                    <button
                      onClick={() => handleEditTeamName(team.id)}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Edit3 size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Zone de dépôt / Joueurs de l'équipe */}
              <div
                className={`h-[200px] rounded-xl p-3 transition-all duration-200 overflow-y-auto custom-scrollbar ${
                  dropTarget === team.id && draggedPlayer
                    ? `${getTeamBgClass(index)} bg-opacity-20 border-2 border-dashed ${getTeamBorderClass(index)}`
                    : 'bg-background-main bg-opacity-30'
                }`}
              >
                <div className="space-y-2 pr-2">
                  {team.playerIds.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="font-poppins text-gray-500 text-sm">
                        {dropTarget === team.id && draggedPlayer ? (
                          <span className={`${getTeamTextColorClass(index)} font-semibold`}>
                            ↓ Déposez le joueur ici
                          </span>
                        ) : (
                          'Glissez des joueurs ici'
                        )}
                      </p>
                    </div>
                  ) : (
                    team.playerIds.map(playerId => {
                      const player = players.find(p => p.id === playerId);
                      if (!player) return null;

                      return (
                        <div
                          key={player.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, player.id)}
                          onDragEnd={handleDragEnd}
                          className={`bg-background-main p-3 rounded-lg font-poppins text-white flex items-center border-l-4 ${getTeamBorderClass(index)} shadow-sm hover:shadow-md transition-all duration-200 cursor-move ${
                            draggedPlayer === player.id ? 'opacity-50 border-secondary-cyan' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <GripVertical size={16} className="text-gray-500" />
                            <span>{player.name}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Indicateur de validation */}
              {team.playerIds.length < 2 && (
                <div className="mt-3 flex items-center gap-2 text-red-500">
                  <span className="text-lg">⚠</span>
                  <p className="font-poppins text-sm">
                    Minimum 2 joueurs requis
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bouton démarrer */}
        <div className="mt-8 text-center">
          <Button
            variant="primary"
            size="large"
            onClick={handleStart}
            disabled={!canStart}
            className="px-12"
          >
            Démarrer la partie
          </Button>

          {!canStart && (
            <p className="font-poppins text-gray-400 mt-4">
              {!allAssigned
                ? 'Tous les joueurs doivent être assignés à une équipe'
                : 'Chaque équipe doit avoir au moins 2 joueurs'}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default TeamsScreen;
