import { useState } from 'react';
import { X } from 'lucide-react';
import { createProject } from '../../../services/api/projects.api';

const CreateProjectForm = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createProject({ name, description, status });
      onSuccess(response.data.project);
      onClose();
    } catch (error) {
      console.error('Failed to create project', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-zinc-200 rounded p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="font-h2 text-xl text-black mb-6">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Project Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
              placeholder="e.g. Headless CMS Evaluation"
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Description</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm h-24 resize-none"
              placeholder="Briefly describe the research..."
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
            >
              <option value="active">Active</option>
              <option value="review">Requires Review</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-3 font-label text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
