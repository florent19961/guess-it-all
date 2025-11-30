import React from 'react';

/**
 * Composant Toggle (2 options) réutilisable
 * @param {Array<string>} options - Tableau de 2 options (ex: ["Aléatoire", "Personnalisé"])
 * @param {string} selected - Option actuellement sélectionnée
 * @param {function} onChange - Handler au changement (reçoit la nouvelle option)
 * @param {string} className - Classes CSS additionnelles
 */
function Toggle({
  options = ['Option 1', 'Option 2'],
  selected,
  onChange,
  className = '',
}) {
  if (options.length !== 2) {
    console.warn('Toggle doit avoir exactement 2 options');
    return null;
  }

  const handleClick = (option) => {
    if (onChange && option !== selected) {
      onChange(option);
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {options.map((option) => {
        const isSelected = option === selected;

        return (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`flex-1 font-poppins font-medium px-6 py-3 rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? 'bg-secondary-cyan border-secondary-cyan text-white'
                : 'bg-background-card border-gray-600 text-gray-300 hover:border-secondary-cyan hover:text-white'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Toggle;
