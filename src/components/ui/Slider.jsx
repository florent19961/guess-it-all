import React from 'react';

/**
 * Composant Slider (curseur) réutilisable
 * @param {number} min - Valeur minimale
 * @param {number} max - Valeur maximale
 * @param {number} value - Valeur actuelle
 * @param {function} onChange - Handler au changement
 * @param {string} label - Label du slider
 * @param {boolean} showValue - Afficher la valeur sous le curseur
 * @param {string} unit - Unité à afficher (ex: "s", "mots")
 * @param {string} className - Classes CSS additionnelles
 */
function Slider({
  min = 0,
  max = 100,
  value,
  onChange,
  label = '',
  showValue = true,
  unit = '',
  className = '',
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(parseInt(e.target.value, 10));
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block font-poppins text-white text-base mb-3">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #7dd3c0 0%, #7dd3c0 ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`
          }}
        />

        {showValue && (
          <div className="text-center mt-3">
            <span className="font-poppins text-secondary-cyan text-xl font-semibold">
              {value}{unit}
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #7dd3c0;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #6ecbb8;
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #7dd3c0;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #6ecbb8;
        }
      `}</style>
    </div>
  );
}

export default Slider;
