'use client'

import { useState, useEffect } from 'react';
import { getTimeValues } from '../config/dates';

export default function CanvasPreview() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTime = () => {
      const newTimeLeft = getTimeValues();
      setTimeLeft(newTimeLeft);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const previewStyle = "w-24 h-24 bg-white flex items-center justify-center rounded-lg";
  const textStyle = "text-6xl font-bold text-black";

  return (
    <div className="flex gap-4 p-8">
      <div className={previewStyle}>
        <span className={textStyle}>{String(timeLeft.days).padStart(2, '0')}</span>
      </div>
      <div className={previewStyle}>
        <span className={textStyle}>{String(timeLeft.hours).padStart(2, '0')}</span>
      </div>
      <div className={previewStyle}>
        <span className={textStyle}>{String(timeLeft.minutes).padStart(2, '0')}</span>
      </div>
      <div className={previewStyle}>
        <span className={textStyle}>{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  )
}

