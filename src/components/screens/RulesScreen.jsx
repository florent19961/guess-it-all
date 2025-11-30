import React from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';

/**
 * Écran 2ter : Règles du jeu
 */
function RulesScreen() {
  const { actions } = useGame();

  const handleBack = () => {
    actions.goToScreen('home');
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Flèche retour */}
      <BackButton onClick={handleBack} />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="font-bangers text-6xl text-white text-center mb-12 drop-shadow-[2px_2px_0_#e88b8b]">
          Comment jouer ?
        </h1>

        <div className="bg-background-card border-2 border-secondary-cyan rounded-2xl p-8 backdrop-blur-sm font-poppins text-white space-y-6">
          {/* Principe du jeu */}
          <section>
            <h2 className="font-bangers text-3xl text-secondary-cyan mb-4">
              🎯 Principe du jeu
            </h2>
            <p className="text-lg leading-relaxed">
              Guess It All est un jeu de devinettes multijoueurs où les équipes s'affrontent à travers <strong>3 manches</strong> avec des modes de jeu différents. Le but : faire deviner un maximum de mots à son équipe !
            </p>
          </section>

          {/* Déroulement */}
          <section>
            <h2 className="font-bangers text-3xl text-secondary-cyan mb-4">
              🎲 Déroulement d'une partie
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg">
              <li><strong>Configuration</strong> : Paramétrez la partie (équipes, joueurs, mots)</li>
              <li><strong>Saisie des mots</strong> : Chaque joueur entre ses mots (par défaut 7)</li>
              <li><strong>Formation des équipes</strong> : Répartissez les joueurs en équipes</li>
              <li><strong>Les 3 manches</strong> : Jouez à travers les 3 modes de jeu</li>
              <li><strong>Résultats</strong> : L'équipe avec le plus de points gagne !</li>
            </ol>
          </section>

          {/* Les 3 manches */}
          <section>
            <h2 className="font-bangers text-3xl text-secondary-cyan mb-4">
              🏆 Les 3 manches
            </h2>
            <div className="space-y-4">
              <div className="bg-background-main p-4 rounded-xl border-l-4 border-primary-pink">
                <h3 className="font-bold text-xl text-primary-pink mb-2">
                  Manche 1 : Description verbale
                </h3>
                <p>Vous pouvez parler librement pour faire deviner le mot (pas de limite de mots).</p>
              </div>

              <div className="bg-background-main p-4 rounded-xl border-l-4 border-secondary-cyan">
                <h3 className="font-bold text-xl text-secondary-cyan mb-2">
                  Manche 2 : Un seul mot
                </h3>
                <p>Vous ne pouvez dire <strong>qu'un seul mot</strong> pour faire deviner.</p>
              </div>

              <div className="bg-background-main p-4 rounded-xl border-l-4 border-team-3">
                <h3 className="font-bold text-xl text-team-3 mb-2">
                  Manche 3 : Mime
                </h3>
                <p>Vous devez <strong>mimer</strong> le mot sans parler ni faire de bruit.</p>
              </div>
            </div>
          </section>

          {/* Système de points */}
          <section>
            <h2 className="font-bangers text-3xl text-secondary-cyan mb-4">
              📊 Système de points
            </h2>
            <p className="text-lg leading-relaxed">
              <strong>1 point par mot deviné.</strong> Les points sont cumulés à travers les 3 manches. L'équipe avec le plus de points à la fin gagne la partie !
            </p>
          </section>

          {/* Mécanisme "Passer" */}
          <section>
            <h2 className="font-bangers text-3xl text-secondary-cyan mb-4">
              🔄 Mécanisme "Passer"
            </h2>
            <p className="text-lg leading-relaxed">
              Vous pouvez <strong>passer un mot</strong> si vous bloquez dessus, mais cela vous coûte du temps ! La pénalité (configurable de 0 à 10 secondes) est déduite de votre temps restant. Les mots passés apparaissent en rouge à la fin du tour et peuvent être validés ou invalidés.
            </p>
          </section>

          {/* Conseils */}
          <section className="bg-team-4 bg-opacity-10 p-4 rounded-xl border-2 border-team-4">
            <h2 className="font-bangers text-2xl text-team-4 mb-3">
              💡 Conseils
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Choisissez des mots variés (faciles, moyens, difficiles)</li>
              <li>Communiquez bien avec votre équipe</li>
              <li>Mémorisez les mots des manches précédentes pour la manche 2 et 3</li>
              <li>Amusez-vous ! C'est un jeu convivial 🎉</li>
            </ul>
          </section>
        </div>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <Button
            variant="primary"
            size="large"
            onClick={handleBack}
            className="px-12"
          >
            Retour à l'accueil
          </Button>
        </div>
      </main>
    </div>
  );
}

export default RulesScreen;
