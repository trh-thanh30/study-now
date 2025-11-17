import { Loader } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import React from 'react';
type ButtonType = 'submit' | 'button' | 'reset' | undefined;
export function ButtonWithArrow({
  title,
  type,
  loading,
  onClick,
}: {
  title: string;
  type?: ButtonType;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full bg-black hover:bg-gray-800 text-sm disabled:bg-gray-400 text-white font-semibold py-2 cursor-pointer px-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 group"
    >
      <span>{loading ? <Loader size={'sm'} /> : title}</span>
      <span className="group-hover:translate-x-2 transition-all duration-300">
        <ArrowRight size={16} />
      </span>
    </button>
  );
}
