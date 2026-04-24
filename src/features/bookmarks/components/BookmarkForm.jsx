import { useState } from 'react';
import { X } from 'lucide-react';
import { createBookmark } from '../../../services/api/bookmarks.api';

const BookmarkForm = ({ projectId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('Article');
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newBookmark = await createBookmark({ title, url, type, rating, projectId });
      onSuccess(newBookmark);
      onClose();
    } catch (error) {
      console.error('Failed to create bookmark', error);
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
        
        <h2 className="font-h2 text-xl text-black mb-6">Add New Resource</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
              placeholder="e.g. React Docs"
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">URL</label>
            <input 
              type="url" 
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
              >
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Documentation">Documentation</option>
                <option value="Tool">Tool</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Rating</label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 focus:border-black outline-none font-body text-sm"
              >
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
            </div>
          </div>
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-3 font-label text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkForm;
