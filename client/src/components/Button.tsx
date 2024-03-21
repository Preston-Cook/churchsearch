import { ReactNode } from 'react';

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-2 py-1 text-white transition-all duration-300 border-2 border-transparent hover:border-[#6AAEBD]"
      type="button"
    >
      {children}
    </button>
  );
}
