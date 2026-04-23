import React, { useEffect, useState } from 'react';
import { Star, Link as LinkIcon, Plus, MoreHorizontal } from 'lucide-react';
import client from '../../../../services/api/client';

const BookmarksTab = ({ projectId }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await client.get(`/bookmarks?projectId=${projectId}`);
        // Filter for this project if backend doesn't handle it yet
        const filtered = response.data.data.bookmarks.filter(b => b.project_id === parseInt(projectId));
        setBookmarks(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookmarks();
  }, [projectId]);

  return (
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
          <a href={bookmark.url} className="text-zinc-500 text-sm font-body hover:text-black hover:underline flex items-center gap-1 mb-6 truncate">
            <LinkIcon size={12} /> {bookmark.url}
          </a>
          <div className="space-y-4">
            <div>
              <h4 className="font-label text-[10px] text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1">Pros</h4>
              <ul className="font-body text-xs text-zinc-700 list-disc pl-4 space-y-1">
                <li>Feature analysis point 1</li>
                <li>Feature analysis point 2</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
      <button className="border border-dashed border-zinc-300 rounded p-6 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-black hover:border-zinc-400 transition-colors min-h-[250px]">
        <Plus size={32} className="mb-2" />
        <span className="font-label text-[10px] uppercase tracking-widest">Add Resource</span>
      </button>
    </div>
  );
};

export default BookmarksTab;
