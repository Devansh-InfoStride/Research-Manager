import { useEffect, useState } from 'react';
import { Star, Link as LinkIcon, Plus, MoreHorizontal } from 'lucide-react';
import client from '../../../../services/api/client';
import BookmarkForm from '../../../bookmarks/components/BookmarkForm';

const BookmarksTab = ({ projectId }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await client.get(`/bookmarks?projectId=${projectId}`);
        setBookmarks(response.data.data.bookmarks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookmarks();
  }, [projectId]);

  const handleAddSuccess = (newBookmark) => {
    setBookmarks([newBookmark, ...bookmarks]);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bg-white border border-zinc-200 rounded p-6 hover:border-zinc-400 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-1 text-accent-orange">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < bookmark.rating ? 'currentColor' : 'none'} className={i < bookmark.rating ? '' : 'text-zinc-200'} />
                ))}
              </div>
              <button className="text-zinc-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <h3 className="font-h3 text-h3 text-black mb-1 leading-tight">{bookmark.title}</h3>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm font-body hover:text-black hover:underline flex items-center gap-1 mb-6 truncate">
              <LinkIcon size={12} /> {bookmark.url}
            </a>
            <div className="space-y-4">
              <div>
                <h4 className="font-label text-[10px] text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1">Type</h4>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-500 font-label text-[10px] uppercase tracking-widest border border-zinc-200 rounded">
                  {bookmark.type || 'Resource'}
                </span>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setIsFormOpen(true)} className="border border-dashed border-zinc-300 rounded p-6 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-black hover:border-zinc-400 transition-colors min-h-[250px]">
          <Plus size={32} className="mb-2" />
          <span className="font-label text-[10px] uppercase tracking-widest">Add Resource</span>
        </button>
      </div>
      
      {isFormOpen && (
        <BookmarkForm 
          projectId={projectId} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={handleAddSuccess}
        />
      )}
    </>
  );
};

export default BookmarksTab;
