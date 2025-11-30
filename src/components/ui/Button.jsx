import React from 'react';

/**
 * Composant Button réutilisable
 * @param {string} variant - "primary", "secondary", "danger", "ghost"
 * @param {string} size - "small", "medium", "large"
 * @param {boolean} disabled - Bouton désactivé
 * @param {function} onClick - Handler au clic
 * @param {string} className - Classes CSS additionnelles
 * @param {ReactNode} children - Contenu du bouton
 */
function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  children,
  ...props
}) {
  const baseClasses = 'font-poppins font-semibold rounded-2xl transition-all duration-200 active:scale-95';

  const variantClasses = {
    primary: 'bg-primary-pink text-white hover:bg-primary-pink-dark disabled:bg-gray-700 disabled:text-gray-400',
    secondary: 'bg-secondary-cyan text-white hover:bg-secondary-cyan-dark disabled:bg-gray-700 disabled:text-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-400',
    ghost: 'bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 disabled:border-gray-600 disabled:text-gray-600',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
