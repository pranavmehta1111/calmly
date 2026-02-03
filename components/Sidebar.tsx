
import React from 'react';
import { ThemeName, AppView, ThemeColors } from '../types';
import { THEMES } from '../constants';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, currentTheme, setTheme, colors }) => {
  const menuItems: { id: AppView; label: string; icon: string }[] = [
    { id: 'board', label: 'Mood Board', icon: '✨' },
    { id: 'planner', label: 'Planner', icon: '🧺' },
    { id: 'rituals', label: 'Rituals', icon: '🕯️' },
    { id: 'notes', label: 'Notes', icon: '✍️' },
  ];

  return (
    <aside className={`w-20 md:w-64 border-r ${colors.border} flex flex-col h-screen py-8 px-4 z-50`}>
      <div className="mb-12 px-2">
        <h1 className="text-2xl font-display italic hidden md:block">Calmly</h1>
        <div className="text-xl md:hidden">✨</div>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-2xl transition-all duration-300 ${
              currentView === item.id 
                ? `${colors.accent} font-medium` 
                : 'hover:bg-black/5 opacity-60 hover:opacity-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden md:inline text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-black/5">
        <p className="text-[10px] uppercase tracking-[0.2em] mb-4 opacity-40 hidden md:block px-2">Palette</p>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 px-2">
          {(Object.keys(THEMES) as ThemeName[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-6 h-6 rounded-full border ${currentTheme === t ? 'ring-2 ring-offset-2 ring-black/20' : ''} ${THEMES[t].accent} transition-transform hover:scale-110`}
              title={t}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
