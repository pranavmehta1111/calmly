
import React, { useState } from 'react';
import { MoodBoardItem, ThemeColors } from '../types';

interface MoodBoardProps {
  items: MoodBoardItem[];
  setItems: React.Dispatch<React.SetStateAction<MoodBoardItem[]>>;
  colors: ThemeColors;
}

const MoodBoard: React.FC<MoodBoardProps> = ({ items, setItems, colors }) => {
  const [isLocked, setIsLocked] = useState(false);

  const addItem = (type: MoodBoardItem['type']) => {
    let content = '';
    if (type === 'affirmation') content = 'Write your own light...';
    if (type === 'color') content = '#E2E8F0';
    if (type === 'image') content = `https://picsum.photos/seed/${Math.random()}/400/400`;

    const newItem: MoodBoardItem = {
      id: Date.now().toString(),
      type,
      content
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    if (isLocked) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-display italic mb-2">Visual Dreams</h2>
          <p className={`${colors.muted} font-serif italic`}>A space for soft inspiration.</p>
        </div>
        <button 
          onClick={() => setIsLocked(!isLocked)}
          className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border ${colors.border} ${isLocked ? colors.accent : ''} transition-colors`}
        >
          {isLocked ? 'Locked 🔒' : 'Unlock Board'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`relative group rounded-3xl overflow-hidden aspect-square ${colors.card} shadow-sm border ${colors.border} transition-all duration-500 hover:shadow-md`}
          >
            {item.type === 'image' && (
              <img src={item.content} alt="Inspiration" className="w-full h-full object-cover filter brightness-[0.9] hover:brightness-100 transition-all duration-700" />
            )}
            {item.type === 'color' && (
              <div style={{ backgroundColor: item.content }} className="w-full h-full" />
            )}
            {item.type === 'affirmation' && (
              <div className="w-full h-full flex items-center justify-center p-8 text-center">
                <p className="font-serif italic text-lg leading-relaxed">{item.content}</p>
              </div>
            )}
            
            {!isLocked && (
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        
        {!isLocked && (
          <div className={`border-2 border-dashed ${colors.border} rounded-3xl flex flex-col items-center justify-center space-y-4 min-h-[200px] p-6`}>
            <p className="text-xs uppercase tracking-widest opacity-40">Add Elements</p>
            <div className="flex space-x-3">
              <button onClick={() => addItem('image')} className="text-2xl hover:scale-125 transition-transform" title="Image">🖼️</button>
              <button onClick={() => addItem('color')} className="text-2xl hover:scale-125 transition-transform" title="Color">🎨</button>
              <button onClick={() => addItem('affirmation')} className="text-2xl hover:scale-125 transition-transform" title="Affirmation">✨</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodBoard;
