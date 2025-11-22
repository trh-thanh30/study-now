import Link from 'next/link';
import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={'/'}
      className={`cursor-pointer  flex items-center justify-center rounded-md text-2xl font-semibold uppercase text-white bg-gray-900 ${className}`}
    >
      <span className="h-fit text-2xl">S</span>
    </Link>
  );
}
