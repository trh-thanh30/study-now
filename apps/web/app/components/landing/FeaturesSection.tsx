import Image from 'next/image';
import React from 'react';

export function FeaturesSection() {
  const dataFeatures1 = [
    {
      title: 'Get in flow state',
      description:
        'With our minimalist Pomodoro timer, you can focus deeply on your tasks and get more done in less time',
      image: '/feat1.webp',
    },
    {
      title: 'Set daily goals and get results',
      description:
        'With our minimalist Pomodoro timer, you can focus deeply on your tasks and get more done in less time',
      image: '/feat2.webp',
    },
  ];
  const dataFeatures2 = [
    {
      title: 'Review your progress to stay motivated',
      description: 'Track your progress to stay motivated and make every session count.',
      image: '/feat3.webp',
    },
    {
      title: 'Your Timer, Your Style',
      description:
        'Make it yours with customizable backgrounds, themes, sounds, and more. Match your style and keep you inspired.',
      image: '/feat4.webp',
    },
  ];
  return (
    <section className="">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-1">Features</h2>
        <p className="text-gray-600 text-base font-medium">
          Personalized session integrations to keep you on track effortlessly
        </p>
      </div>
      <div className="flex flex-col md:flex-row  items-center xl:justify-between justify-center w-full h-fit gap-6">
        {dataFeatures1.map((item) => (
          <div key={item.title} className="flex flex-col gap-5  items-center w-fit ">
            <Image
              src={item.image}
              width={500}
              height={500}
              className="w-sm h-sm object-cover"
              alt="feature-1"
            />
            <h3 className="text-gray-800 text-2xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm font-medium text-center w-sm">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row  items-center xl:justify-between justify-center w-full h-fit gap-6">
        {dataFeatures2.map((item) => (
          <div key={item.title} className="flex flex-col gap-5  items-center w-fit ">
            <Image
              src={item.image}
              width={500}
              height={500}
              className="w-sm h-sm object-cover"
              alt="feature-1"
            />
            <h3 className="text-gray-800 text-2xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm font-medium text-center w-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
