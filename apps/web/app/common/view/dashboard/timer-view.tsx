'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function TimerView() {
  const WORK_TIME = 25 * 60; // 25 phút
  const BREAK_TIME = 5 * 60; // 5 phút

  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);

  const playStartSound = () => {
    const audio = new Audio('/sounds/sound-play.mp3');
    audio.play();
  };
  // Đếm ngược
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((sec) => {
        if (sec <= 1) {
          setRunning(false);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // Format mm:ss
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  };

  // Chuyển chế độ
  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setSeconds(newMode === 'work' ? WORK_TIME : BREAK_TIME);
    setRunning(false);
  };

  // Reset
  const resetTimer = () => {
    setSeconds(mode === 'work' ? WORK_TIME : BREAK_TIME);
    setRunning(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-14 w-xl">
        {/* Mode Buttons */}
        <div className="flex items-center gap-4">
          <button
            className={`py-2 w-1/2 text-sm font-semibold rounded-md shadow hover:cursor-pointer transition-all
            ${mode === 'work' ? 'bg-[#efe6dd] text-amber-950' : 'hover:bg-[#efe6dd] text-amber-950'}`}
            onClick={() => switchMode('work')}
          >
            Deep Work
          </button>

          <button
            className={`py-2 w-1/2 text-sm font-semibold rounded-md shadow hover:cursor-pointer transition-all
            ${mode === 'break' ? 'bg-[#efe6dd] text-amber-950' : 'hover:bg-[#efe6dd] text-amber-950'}`}
            onClick={() => switchMode('break')}
          >
            Break Time
          </button>
        </div>

        {/* Timer */}
        <h1 className="w-full text-8xl tabular-nums font-bold text-center text-[#665442] md:text-[10rem]">
          {formatTime(seconds)}
        </h1>

        {/* Start / Pause / Reset */}
        <div className="flex items-center flex-col gap-3">
          <button
            className="py-2.5 w-full text-sm font-semibold text-amber-950 rounded-md shadow bg-[#efe6dd] hover:cursor-pointer flex items-center justify-center"
            onClick={() => {
              setRunning(!running);
              if (!running) playStartSound();
            }}
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {running && (
            <button
              className="py-2.5 px-3 text-sm font-semibold text-amber-950 rounded-md shadow bg-[#efe6dd] hover:cursor-pointer flex items-center justify-center"
              onClick={resetTimer}
            >
              <RotateCcw size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
