import React from 'react';
import { X } from 'lucide-react';

/**
 * Composant Modal (pop-up) réutilisable
 * @param {boolean} isOpen - État d'ouverture du modal
 * @param {function} onClose - Handler à la fermeture
 * @param {string} title - Titre du modal
 * @param {ReactNode} children - Contenu du modal
 * @param {boolean} closeOnOverlayClick - Fermer au clic sur l'overlay
 * @param {string} className - Classes CSS additionnelles
 */
function Modal({
  isOpen,
  onClose,
  title = '',
  children,
  closeOnOverlayClick = true,
  className = '',
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className={`relative bg-background-main border-2 border-secondary-cyan rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Titre */}
        {title && (
          <h2 className="font-bangers text-4xl text-white mb-6 pr-8 drop-shadow-[2px_2px_0_#e88b8b]">
            {title}
          </h2>
        )}

        {/* Contenu */}
        <div className="font-poppins text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
