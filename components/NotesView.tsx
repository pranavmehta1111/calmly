
import React, { useState } from 'react';
import { Note, ThemeColors } from '../types';
import { processNoteContent } from '../geminiService';

interface NotesViewProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  colors: ThemeColors;
}

const NotesView: React.FC<NotesViewProps> = ({ notes, setNotes, colors }) => {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addNote = async () => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    const id = Date.now().toString();
    const newNote: Note = {
      id,
      content,
      category: 'Unsorted',
      createdAt: Date.now()
    };

    setNotes(prev => [newNote, ...prev]);
    const currentContent = content;
    setContent('');

    // Async processing via Gemini
    const result = await processNoteContent(currentContent);
    if (result) {
      setNotes(prev => prev.map(n => n.id === id ? { 
        ...n, 
        category: result.category as Note['category'], 
        summary: result.summary 
      } : n));
    }
    setIsProcessing(false);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotes = notes.filter(n => 
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-4xl font-display italic mb-2">Creative Thoughts</h2>
          <p className={`${colors.muted} font-serif italic`}>A mess-free brain dump for your dreaming mind.</p>
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search your mind..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-transparent border-b ${colors.border} py-2 text-sm italic focus:outline-none focus:border-black/20`}
          />
        </div>
      </div>

      <div className={`mb-12 p-8 rounded-[2.5rem] ${colors.card} border ${colors.border}`}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your heart? (Write freely, I'll organize it for you...)"
          className="w-full h-32 bg-transparent resize-none focus:outline-none italic placeholder:opacity-30 leading-relaxed"
        />
        <div className="flex justify-end mt-4">
          <button 
            onClick={addNote}
            disabled={isProcessing || !content.trim()}
            className={`px-8 py-3 rounded-full ${colors.accent} text-[10px] uppercase tracking-widest font-bold transition-all ${isProcessing ? 'animate-pulse' : 'hover:scale-105'}`}
          >
            {isProcessing ? 'Gently Organizing...' : 'Save Thought'}
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredNotes.map((note) => (
          <div 
            key={note.id}
            className={`group p-8 rounded-[2rem] ${colors.card} border ${colors.border} transition-all duration-500 hover:shadow-md relative`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${colors.accent} opacity-60`}>
                {note.category}
              </span>
              <button 
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-30 hover:!opacity-100 transition-opacity text-xs"
              >
                Delete
              </button>
            </div>
            
            <p className="leading-relaxed mb-6 opacity-80 whitespace-pre-wrap">{note.content}</p>
            
            {note.summary && (
              <div className="pt-4 border-t border-black/5">
                <p className="text-xs italic font-serif opacity-50">“{note.summary}”</p>
              </div>
            )}

            {!note.summary && isProcessing && note.id === notes[0]?.id && (
              <div className="pt-4 border-t border-black/5 animate-pulse">
                <p className="text-[10px] uppercase tracking-widest opacity-20">Summarizing...</p>
              </div>
            )}
          </div>
        ))}
        {filteredNotes.length === 0 && (
          <div className="text-center py-20 opacity-20 italic">
            No memories found. Start writing.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesView;
