'use client';
import { Play } from 'lucide-react';
import React from 'react';

export default function TimerView() {
  return (
    <div className="w-full h-full  flex items-center justify-center">
      <div className="w-full h-ful flex items-center justify-center">
        <div className="space-y-14 w-xl">
          <div className="flex items-center gap-4 ">
            <button className="py-2 w-1/2 text-sm font-semibold text-amber-950 rounded-md shadow bg-[#efe6dd] hover:cursor-pointer ">
              Deep Work
            </button>
            <button className="py-2 w-1/2 text-sm font-semibold text-amber-950 rounded-md shadow hover:bg-[#efe6dd] hover:cursor-pointer transition-all duration-300">
              Break Time
            </button>
          </div>

          <h1 className="w-full text-8xl tabular-nums font-bold text-center text-text-primary md:text-[10rem] text-[#665442] flex items-center justify-center">
            25:00
          </h1>

          <button className="py-2.5 w-full text-sm font-semibold text-amber-950 rounded-md shadow bg-[#efe6dd] hover:cursor-pointer flex items-center justify-center ">
            <Play size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
