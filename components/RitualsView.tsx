
import React, { useState, useEffect, useRef } from 'react';
import { Ritual, ThemeColors } from '../types';

interface RitualsViewProps {
  rituals: Ritual[];
  setRituals: React.Dispatch<React.SetStateAction<Ritual[]>>;
  colors: ThemeColors;
}

const RitualsView: React.FC<RitualsViewProps> = ({ rituals, setRituals, colors }) => {
  const [activeRitual, setActiveRitual] = useState<Ritual | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to ensure compatibility in browser environments without Node.js types.
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const startRitual = (ritual: Ritual) => {
    setActiveRitual(ritual);
    setTimeLeft(ritual.duration * 60);
    setIsActive(true);
  };

  const toggleTask = (ritualId: string, taskId: string) => {
    setRituals(prev => prev.map(r => {
      if (r.id === ritualId) {
        return {
          ...r,
          tasks: r.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        };
      }
      return r;
    }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (activeRitual) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-12">
          <button 
            onClick={() => setActiveRitual(null)}
            className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 mb-8"
          >
            ← Back to Rituals
          </button>
          <div className="text-6xl mb-6 transform hover:rotate-12 transition-transform duration-500">{activeRitual.icon}</div>
          <h2 className="text-4xl font-display italic mb-4">{activeRitual.name}</h2>
          <div className="text-6xl font-serif tracking-tighter tabular-nums mb-4">{formatTime(timeLeft)}</div>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3 rounded-full ${colors.accent} text-sm uppercase tracking-widest hover:opacity-80 transition-all`}
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div className={`p-10 rounded-[2.5rem] ${colors.card} border ${colors.border} max-w-md mx-auto`}>
          <p className="text-xs uppercase tracking-widest mb-8 opacity-40 text-center">Reset Checklist</p>
          <div className="space-y-6">
            {activeRitual.tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(activeRitual.id, task.id)}
                className="flex items-center space-x-4 cursor-pointer"
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full border ${colors.border} flex items-center justify-center transition-colors ${task.completed ? colors.accent : ''}`}>
                  {task.completed && <span className="text-[10px]">✓</span>}
                </div>
                <span className={`transition-all ${task.completed ? 'opacity-30 line-through italic' : 'opacity-80'}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-16">
        <h2 className="text-4xl font-display italic mb-4">Space Rituals</h2>
        <p className={`${colors.muted} font-serif italic`}>Small intentional resets for a peaceful mind.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {rituals.map((ritual) => (
          <div 
            key={ritual.id}
            className={`group p-10 rounded-[3rem] ${colors.card} border ${colors.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
          >
            <div className="text-4xl mb-6">{ritual.icon}</div>
            <h3 className="text-2xl font-display italic mb-2">{ritual.name}</h3>
            <p className={`${colors.muted} text-sm mb-8 italic`}>{ritual.duration} minutes of mindful reset.</p>
            <button 
              onClick={() => startRitual(ritual)}
              className={`w-full py-4 rounded-2xl ${colors.accent} text-[10px] uppercase tracking-widest font-medium opacity-80 hover:opacity-100 transition-opacity`}
            >
              Begin Ritual
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RitualsView;
