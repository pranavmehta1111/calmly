
import React, { useState, useEffect } from 'react';
import { ThemeName, AppView, MoodEntry, Priority, Note, MoodBoardItem, Ritual } from './types';
import { THEMES, DEFAULT_RITUALS } from './constants';
import Sidebar from './components/Sidebar';
import MoodBoard from './components/MoodBoard';
import SoftPlanner from './components/SoftPlanner';
import RitualsView from './components/RitualsView';
import NotesView from './components/NotesView';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeName>(ThemeName.Beige);
  const [view, setView] = useState<AppView>('board');
  
  // Data Persistence (Local Storage)
  const [moods, setMoods] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('calmly_moods');
    return saved ? JSON.parse(saved) : [];
  });

  const [priorities, setPriorities] = useState<Priority[]>(() => {
    const saved = localStorage.getItem('calmly_priorities');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('calmly_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [boardItems, setBoardItems] = useState<MoodBoardItem[]>(() => {
    const saved = localStorage.getItem('calmly_board');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'affirmation', content: 'You are blooming in your own time.' },
      { id: '2', type: 'color', content: '#E5E1D8' },
      { id: '3', type: 'image', content: 'https://picsum.photos/seed/calm1/400/400' }
    ];
  });

  const [rituals, setRituals] = useState<Ritual[]>(() => {
    const saved = localStorage.getItem('calmly_rituals');
    return saved ? JSON.parse(saved) : DEFAULT_RITUALS;
  });

  useEffect(() => {
    localStorage.setItem('calmly_moods', JSON.stringify(moods));
    localStorage.setItem('calmly_priorities', JSON.stringify(priorities));
    localStorage.setItem('calmly_notes', JSON.stringify(notes));
    localStorage.setItem('calmly_board', JSON.stringify(boardItems));
    localStorage.setItem('calmly_rituals', JSON.stringify(rituals));
    localStorage.setItem('calmly_theme', theme);
  }, [moods, priorities, notes, boardItems, rituals, theme]);

  const activeTheme = THEMES[theme];

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} flex transition-all duration-500 overflow-hidden`}>
      <Sidebar 
        currentView={view} 
        setView={setView} 
        currentTheme={theme} 
        setTheme={setTheme} 
        colors={activeTheme}
      />
      
      <main className="flex-1 h-screen overflow-y-auto pt-8 px-6 md:px-12 lg:px-24 pb-20 relative">
        <div className="max-w-4xl mx-auto w-full min-h-full flex flex-col">
          <div className="flex-1">
            {view === 'board' && (
              <MoodBoard 
                items={boardItems} 
                setItems={setBoardItems} 
                colors={activeTheme} 
              />
            )}
            {view === 'planner' && (
              <SoftPlanner 
                moods={moods} 
                setMoods={setMoods}
                priorities={priorities}
                setPriorities={setPriorities}
                colors={activeTheme}
              />
            )}
            {view === 'rituals' && (
              <RitualsView 
                rituals={rituals}
                setRituals={setRituals}
                colors={activeTheme}
              />
            )}
            {view === 'notes' && (
              <NotesView 
                notes={notes}
                setNotes={setNotes}
                colors={activeTheme}
              />
            )}
          </div>
          
          {/* Credit Footer */}
          <footer className="mt-24 mb-8 text-center">
            <p className={`font-serif italic text-sm opacity-40 ${activeTheme.text}`}>
              made by pranav mehta with love
            </p>
          </footer>
        </div>
        
        {/* Subtle Decorative Elements */}
        <div className="fixed bottom-0 right-0 p-8 opacity-5 pointer-events-none select-none">
          <span className="text-8xl font-serif italic">Calmly</span>
        </div>
      </main>
    </div>
  );
};

export default App;
