import React from 'react';
import { Logo } from '../../../../components';
import { ListTodo, Palette, Settings, SquareChartGantt, Timer, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const generalLinks = [
  {
    label: 'Timer',
    href: '/dashboard/timer',
    icon: <Timer size={18} />,
  },
  {
    label: 'Tasks',
    href: '/dashboard/tasks',
    icon: <ListTodo size={18} />,
  },
  {
    label: 'Statistics',
    href: '/dashboard/statistics',
    icon: <SquareChartGantt size={18} />,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: <User size={18} />,
  },
];

const settingsLinks = [
  {
    label: 'General',
    href: '/dashboard/general',
    icon: <Settings size={18} />,
  },
  {
    label: 'Appearance',
    href: '/dashboard/appearance',
    icon: <Palette size={18} />,
  },
];

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <div>
      <div className="flex items-center gap-2">
        <Logo className="w-10 h-10" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-700 font-semibold">StudyNow</span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>
      <div className="mt-7 space-y-4">
        {/* General */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-semibold text-amber-950">General</h2>
          {generalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-md text-gray-800  text-sm font-medium hover:bg-white/55 transition-all duration-300 ${pathName === link.href ? 'bg-white/70' : ''}`}
            >
              {link.icon}
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </div>
        {/* Settings */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-semibold text-amber-950">Settings</h2>
          {settingsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-md text-gray-800  text-sm font-medium hover:bg-white/55 transition-all duration-300 ${pathName === link.href ? 'bg-white/70' : ''}`}
            >
              {link.icon}
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
