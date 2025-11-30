import React from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * Composant Counter (incrémenteur/décrémenteur) réutilisable
 * @param {number} value - Valeur actuelle
 * @param {function} onChange - Handler au changement
 * @param {number} min - Valeur minimale
 * @param {number} max - Valeur maximale
 * @param {string} label - Label du compteur
 * @param {string} error - Message d'erreur
 * @param {string} className - Classes CSS additionnelles
 */
function Counter({
  value,
  onChange,
  min = 0,
  max = 100,
  label = '',
  error = '',
  className = '',
}) {
  const handleDecrement = () => {
    if (value > min && onChange) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && onChange) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block font-poppins text-white text-base mb-3">
          {label}
        </label>
      )}

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex items-center justify-center w-12 h-12 bg-secondary-cyan rounded-full text-white font-bold text-2xl hover:bg-secondary-cyan-dark transition-all duration-200 hover:scale-110 active:scale-95 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Minus size={24} />
        </button>

        <div className="font-bangers text-5xl text-white min-w-[80px] text-center drop-shadow-[2px_2px_0_#e88b8b]">
          {value}
        </div>

        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="flex items-center justify-center w-12 h-12 bg-secondary-cyan rounded-full text-white font-bold text-2xl hover:bg-secondary-cyan-dark transition-all duration-200 hover:scale-110 active:scale-95 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Plus size={24} />
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm font-poppins mt-2 text-center">
          {error}
        </p>
      )}
    </div>
  );
}

export default Counter;
