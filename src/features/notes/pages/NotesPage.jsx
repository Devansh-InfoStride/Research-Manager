import { useEffect, useState } from 'react';
import { getAllNotes } from '../../../services/api/notes.api';
import { StickyNote, Plus, Calendar, Hash } from 'lucide-react';
import NotesEditor from '../components/NotesEditor';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="px-12 py-8 border-b border-zinc-200 flex items-end justify-between bg-white/50 sticky top-0 z-10">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface mb-1">Insights Library</h2>
          <p className="font-body text-on-surface-variant max-w-2xl">Global repository of research notes, strategic decisions, and technical observations.</p>
        </div>
        <button 
          onClick={() => setIsEditorOpen(true)}
          className="px-6 py-2 bg-black text-white font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={16} />
          New Insight
        </button>
      </header>

      <div className="p-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {notes.length === 0 ? (
              <div className="col-span-full py-24 text-center bg-white border border-dashed border-zinc-300 rounded">
                <StickyNote className="mx-auto text-zinc-300 mb-4" size={48} />
                <p className="font-body text-zinc-500">No insights recorded yet. Start by adding notes to your projects.</p>
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="bg-white border border-zinc-200 p-8 rounded-lg hover:border-zinc-400 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-500 font-label text-[10px] uppercase tracking-widest border border-zinc-200 flex items-center gap-1">
                      <Hash size={10} /> {note.project_name || 'General'}
                    </span>
                    <div className="flex items-center gap-1 text-zinc-400 font-code text-[10px] uppercase">
                      <Calendar size={12} />
                      {new Date(note.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="font-h3 text-xl text-black mb-4">{note.title || 'Untitled Note'}</h3>
                  <div className="font-body text-sm text-zinc-600 line-clamp-4 whitespace-pre-wrap">
                    {note.content}
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end">
                    <button className="text-black font-label text-[10px] uppercase tracking-widest hover:underline">
                      Read Full Analysis
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {isEditorOpen && (
        <NotesEditor 
          onClose={() => setIsEditorOpen(false)} 
          onSuccess={handleNoteCreated}
        />
      )}
    </div>
  );
};

export default NotesPage;
