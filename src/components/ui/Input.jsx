import React from 'react';
import { X } from 'lucide-react';

/**
 * Composant Input réutilisable
 * @param {string} value - Valeur de l'input
 * @param {function} onChange - Handler au changement
 * @param {string} placeholder - Texte placeholder
 * @param {string} error - Message d'erreur
 * @param {ReactNode} icon - Icône à afficher
 * @param {boolean} showClearButton - Afficher le bouton pour effacer
 * @param {function} onClear - Handler pour effacer
 * @param {string} className - Classes CSS additionnelles
 */
function Input({
  value,
  onChange,
  placeholder = '',
  error = '',
  icon = null,
  showClearButton = true,
  onClear,
  className = '',
  ...props
}) {
  const baseClasses = 'font-poppins bg-background-card border-2 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-200';

  const borderClasses = error
    ? 'border-red-500 focus:border-red-400'
    : 'border-secondary-cyan focus:border-secondary-cyan-dark';

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} ${borderClasses} ${icon ? 'pl-12' : ''} ${showClearButton && value ? 'pr-12' : ''} ${className} w-full`}
          {...props}
        />

        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-poppins mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
