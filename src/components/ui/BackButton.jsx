import React from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * Composant BackButton (flèche retour)
 * @param {function} onClick - Handler au clic
 * @param {string} className - Classes CSS additionnelles
 */
function BackButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`fixed top-6 left-6 z-40 flex items-center justify-center w-12 h-12 bg-primary-pink rounded-full hover:bg-primary-pink-dark transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
    >
      <ChevronLeft size={28} className="text-white" />
    </button>
  );
}

export default BackButton;
