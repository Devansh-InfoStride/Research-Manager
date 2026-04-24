import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createNote } from '../../../services/api/notes.api';
import { getProjects } from '../../../services/api/projects.api';

const NotesEditor = ({ onClose, onSuccess, projectId: initialProjectId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [projectId, setProjectId] = useState(initialProjectId || '');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialProjectId) {
      const fetchProjects = async () => {
        try {
          const res = await getProjects();
          setProjects(res.data.projects);
          if (res.data.projects.length > 0) {
            setProjectId(res.data.projects[0].id.toString());
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchProjects();
    }
  }, [initialProjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newNote = await createNote({ title, content, projectId });
      onSuccess(newNote);
      onClose();
    } catch (error) {
      console.error('Failed to create note', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-zinc-200 rounded p-8 max-w-2xl w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="font-h2 text-xl text-black mb-6">Create New Insight</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Insight Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
                placeholder="e.g. Architectural Trade-offs"
              />
            </div>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Associated Project</label>
              <select 
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                disabled={!!initialProjectId}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm disabled:opacity-50"
              >
                {!initialProjectId && projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
                {initialProjectId && <option value={initialProjectId}>Current Project</option>}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Analysis Content</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm h-64 resize-none leading-relaxed"
              placeholder="Structure your thoughts here..."
            />
          </div>
          <div className="pt-2 flex justify-end gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3 font-label text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-black text-white px-8 py-3 font-label text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Insight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesEditor;
