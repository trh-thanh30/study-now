import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';

export function Header() {
  const headerTitle = [
    {
      title: 'Introduction',
      href: '#introduction',
    },
    {
      title: 'Features',
      href: '#features',
    },
    {
      title: 'How it works',
      href: '#how-it-works',
    },
    {
      title: 'FAQ',
      href: '#faq',
    },
  ];
  return (
    <header className=" text-white px-4 py-4 md:px-8 fixed top-0 left-0 right-0 z-50 max-w-7xl mx-auto bg-white rounded-b-md">
      <div className=" flex justify-between items-center">
        <Logo className="w-12 h-12" />
        <div className="space-x-8 text-sm text-gray-700 font-semibold ">
          {headerTitle.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="hover:text-gray-900 hover:underline transition-all duration-300"
            >
              {item.title}
            </a>
          ))}
          <Link
            href={'/auth/login'}
            className="border border-gray-900 rounded-full py-2 px-5 text-gray-900 hover:cursor-pointer hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
