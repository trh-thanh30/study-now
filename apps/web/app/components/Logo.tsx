import Link from 'next/link';
import React from 'react';

export function Logo() {
  return (
    <Link
      href={'/'}
      className="cursor-pointer w-11 h-11 flex items-center justify-center rounded-md text-2xl font-semibold uppercase text-white bg-gray-900"
    >
      <span className="h-fit">S</span>
    </Link>
  );
}
