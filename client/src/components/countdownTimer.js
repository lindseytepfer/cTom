import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(120);
  
    useEffect(() => {
      if (!timeLeft) return;
  
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timeLeft]);
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return (
      <div>
        <p>time remaining:</p>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );
  };