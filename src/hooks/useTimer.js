import { useState, useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour gérer un compte à rebours basé sur l'horloge système
 * @param {number|null} endTimestamp - Timestamp de fin (ms depuis epoch) ou null
 * @param {function} onTimeUp - Callback appelé quand le temps est écoulé
 * @returns {object} - { timeRemaining, isRunning, start, pause, updateEndTime }
 */
function useTimer(endTimestamp, onTimeUp) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const endTimestampRef = useRef(endTimestamp);

  // Mettre à jour la référence quand endTimestamp change
  useEffect(() => {
    endTimestampRef.current = endTimestamp;
  }, [endTimestamp]);

  useEffect(() => {
    if (isRunning && endTimestampRef.current) {
      // Rafraîchir toutes les 100ms pour un affichage fluide
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTimestampRef.current - now) / 1000));

        setTimeRemaining(remaining);

        // Temps écoulé
        if (remaining === 0) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          if (onTimeUp) {
            onTimeUp();
          }
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUp]);

  // Calculer le temps initial
  useEffect(() => {
    if (endTimestamp) {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTimestamp - now) / 1000));
      setTimeRemaining(remaining);
    }
  }, [endTimestamp]);

  const start = () => setIsRunning(true);
  const pause = () => {
    setIsRunning(false);
    return timeRemaining; // Retourner le temps restant au moment de la pause
  };

  return {
    timeRemaining,
    isRunning,
    start,
    pause,
  };
}

export default useTimer;
