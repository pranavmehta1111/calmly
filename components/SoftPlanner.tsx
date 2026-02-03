
import React, { useState } from 'react';
import { MoodEntry, Priority, ThemeColors, MoodType } from '../types';
import { MOOD_ICONS } from '../constants';

interface SoftPlannerProps {
  moods: MoodEntry[];
  setMoods: React.Dispatch<React.SetStateAction<MoodEntry[]>>;
  priorities: Priority[];
  setPriorities: React.Dispatch<React.SetStateAction<Priority[]>>;
  colors: ThemeColors;
}

const SoftPlanner: React.FC<SoftPlannerProps> = ({ moods, setMoods, priorities, setPriorities, colors }) => {
  const [newPriority, setNewPriority] = useState('');
  const today = new Date().toLocaleDateString();

  const currentMood = moods.find(m => m.date === today)?.mood;

  const handleMoodSelect = (mood: MoodType) => {
    setMoods(prev => {
      const filtered = prev.filter(m => m.date !== today);
      return [...filtered, { date: today, mood }];
    });
  };

  const addPriority = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPriority || priorities.length >= 5) return;
    const item: Priority = {
      id: Date.now().toString(),
      text: newPriority,
      completed: false
    };
    setPriorities(prev => [...prev, item]);
    setNewPriority('');
  };

  const togglePriority = (id: string) => {
    setPriorities(prev => prev.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  const clearCompleted = () => {
    setPriorities(prev => prev.filter(p => !p.completed));
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-display italic mb-4">Gentle Day</h2>
        <p className={`${colors.muted} font-serif`}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Mood Selector */}
      <div className={`mb-16 p-8 rounded-[2.5rem] ${colors.card} border ${colors.border} text-center`}>
        <p className="text-xs uppercase tracking-widest mb-6 opacity-60">Today feels like...</p>
        <div className="flex justify-center space-x-6">
          {(Object.keys(MOOD_ICONS) as MoodType[]).map((m) => (
            <button
              key={m}
              onClick={() => handleMoodSelect(m)}
              className={`text-3xl transition-all duration-300 hover:scale-125 ${currentMood === m ? 'opacity-100 scale-125' : 'opacity-30'}`}
              title={m}
            >
              {MOOD_ICONS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Priorities */}
      <div className={`p-10 rounded-[2.5rem] ${colors.card} border ${colors.border}`}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-display italic">Priorities</h3>
          <span className="text-[10px] uppercase tracking-widest opacity-40">{priorities.length}/5</span>
        </div>

        <div className="space-y-4 mb-8">
          {priorities.map((p) => (
            <div 
              key={p.id} 
              onClick={() => togglePriority(p.id)}
              className="flex items-center space-x-4 cursor-pointer group"
            >
              <div className={`w-5 h-5 rounded-full border ${colors.border} flex items-center justify-center transition-colors ${p.completed ? colors.accent : ''}`}>
                {p.completed && <span className="text-[10px]">✓</span>}
              </div>
              <span className={`transition-all duration-300 ${p.completed ? 'line-through opacity-30 italic' : 'opacity-80'}`}>
                {p.text}
              </span>
            </div>
          ))}
          {priorities.length === 0 && (
            <p className={`text-center py-4 italic ${colors.muted}`}>Nothing planned yet. Rest is productive too.</p>
          )}
        </div>

        {priorities.length < 5 && (
          <form onSubmit={addPriority} className="relative">
            <input
              type="text"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              placeholder="What truly matters today?"
              className={`w-full bg-transparent border-b ${colors.border} py-2 focus:outline-none focus:border-black/20 placeholder:italic transition-all`}
            />
            <button type="submit" className="absolute right-0 bottom-2 text-xl opacity-40 hover:opacity-100 transition-opacity">＋</button>
          </form>
        )}
        
        {priorities.some(p => p.completed) && (
          <button 
            onClick={clearCompleted}
            className="mt-8 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
          >
            Clear Finished
          </button>
        )}
      </div>
    </div>
  );
};

export default SoftPlanner;
