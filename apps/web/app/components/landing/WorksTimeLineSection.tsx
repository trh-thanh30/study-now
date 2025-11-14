import { Coffee, ListTodo, Play, RotateCcw } from 'lucide-react';
import React from 'react';

export function WorksTimeLineSection() {
  const dataTimeLines = [
    {
      title: 'Select your daily tasks',
      description:
        'Choose a specific task to focus on. Clear objectives help maintain focus during work sessions.',
      icon: <ListTodo size={20} />,
    },
    {
      title: 'Start Deep Work',
      description:
        'Set the timer for 30 minutes of focused work. Eliminate all distractions and concentrate on your chosen task.',
      icon: <Play size={20} />,
    },
    {
      title: 'Take a Break',
      description:
        'When the timer ends, take a 15-minute break. Rest, stretch, or have a quick walk to maintain productivity.',
      icon: <Coffee size={20} />,
    },
    {
      title: 'Repeat the Cycle',
      description:
        'After your break, start another session. This cycle helps maintain high productivity while preventing mental fatigue.',
      icon: <RotateCcw size={20} />,
    },
  ];
  return (
    <section className="w-full flex items-center flex-col ">
      <h2 className="text-4xl md:text-5xl font-bold text-center ">How It Works</h2>
      <div className="w-full max-w-4xl mx-auto mt-12">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-zinc-100"></div>
          <div className="space-y-20">
            {dataTimeLines.map((timeLine, index) => (
              <div key={index} className="relative">
                <div
                  className={`flex items-center ${index % 2 === 1 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2"></div>
                  <div className="w-12 h-12 absolute left-1/2 transform -translate-x-1/2 -translate-y-6 rounded-full bg-zinc-900 shadow-lg flex items-center justify-center text-white">
                    {timeLine.icon}
                  </div>
                  <div
                    className={`w-1/2 ${index % 2 === 1 ? 'pl-8 text-left' : 'pr-8 text-right'}`}
                  >
                    <h3 className="text-xl text-center text-slate-900 font-semibold">
                      {timeLine.title}
                    </h3>
                    <p className="text-slate-600 text-base font-medium text-center">
                      {timeLine.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
