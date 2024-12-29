'use client'

import { useState, useEffect } from 'react';
import { getTimeValues, debugTimezoneInfo } from '../config/dates';

export default function LiveCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      debugTimezoneInfo();
      
      const newTimeLeft = getTimeValues();
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-8">
      <div className="flex space-x-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="text-6xl font-bold bg-gray-800 p-4 rounded-lg w-32 h-32 flex items-center justify-center">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xl mt-2">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

