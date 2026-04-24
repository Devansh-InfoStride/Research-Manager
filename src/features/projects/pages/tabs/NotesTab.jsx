import { useEffect, useState } from 'react';
import { Star, Plus, StickyNote, Calendar } from 'lucide-react';
import { getAllNotes } from '../../../../services/api/notes.api';
import NotesEditor from '../../../notes/components/NotesEditor';

const NotesTab = ({ projectId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes(projectId);
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [projectId]);

  const handleAddSuccess = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-h3 text-xl text-black flex items-center gap-2">
              <StickyNote size={20} /> Project Insights
            </h3>
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="px-4 py-2 border border-zinc-200 font-label text-[10px] uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center gap-2"
            >
              <Plus size={14} /> Add Note
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="bg-white border border-dashed border-zinc-300 rounded p-12 text-center">
              <p className="font-body text-zinc-500">No notes found for this project.</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-white border border-zinc-200 rounded p-8 hover:border-zinc-300 transition-colors">
                <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                  <h3 className="font-h3 text-lg text-black">{note.title || 'Untitled Note'}</h3>
                  <span className="font-label text-[10px] text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded flex items-center gap-1">
                    <Calendar size={12} /> {new Date(note.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="prose prose-zinc max-w-none font-body text-on-surface whitespace-pre-wrap text-sm leading-relaxed">
                  {note.content}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-brand-background border border-accent-orange/30 rounded p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
            <h3 className="font-label text-[10px] uppercase text-accent-orange mb-2 flex items-center gap-2 tracking-widest">
              <Star size={14} /> Final Decision
            </h3>
            <div className="font-h2 text-2xl text-black mb-4 italic">Pending Analysis</div>
            <p className="font-body text-sm text-zinc-600 mb-6">Aggregate your research and insights to finalize your selection.</p>
            <button className="w-full bg-white border border-zinc-200 px-4 py-3 rounded font-label text-[10px] uppercase tracking-widest text-black hover:bg-zinc-50 transition-colors">
              Set Final Decision
            </button>
          </div>
        </div>
      </div>

      {isEditorOpen && (
        <NotesEditor 
          projectId={projectId}
          onClose={() => setIsEditorOpen(false)} 
          onSuccess={handleAddSuccess}
        />
      )}
    </>
  );
};

export default NotesTab;
