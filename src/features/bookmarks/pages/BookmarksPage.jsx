import React, { useEffect, useState } from 'react';
import { Search, Download, Star, ExternalLink, MoreHorizontal } from 'lucide-react';
import client from '../../../services/api/client';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await client.get('/bookmarks');
        setBookmarks(response.data.data.bookmarks);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <header className="px-12 py-8 border-b border-zinc-200 flex items-end justify-between bg-white/50 sticky top-0 z-10">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface mb-1">Bookmarks Library</h2>
          <p className="font-body text-on-surface-variant max-w-2xl">Global repository of saved resources, categorized by project and technical rating.</p>
        </div>
        <button className="px-6 py-2 border border-zinc-200 text-on-surface font-label text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </button>
      </header>

      <div className="p-12 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-zinc-200">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                placeholder="Search resources..." 
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 font-body text-sm outline-none focus:border-black"
              />
            </div>
            <div className="w-px h-6 bg-zinc-200"></div>
            <select className="bg-zinc-50 border border-zinc-200 px-4 py-2 font-label text-xs uppercase tracking-widest outline-none cursor-pointer">
              <option>All Projects</option>
              <option>Frontend Eval</option>
              <option>DB Scaling</option>
              <option>Design Systems</option>
            </select>
          </div>
          <div className="font-label text-xs uppercase tracking-widest text-zinc-500">
            Showing {bookmarks.length} Results
          </div>
        </div>

        <div className="bg-white border border-zinc-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 font-label text-xs uppercase tracking-widest text-zinc-500">
                <th className="py-4 px-6 font-semibold">Resource Title</th>
                <th className="py-4 px-6 font-semibold">URL</th>
                <th className="py-4 px-6 font-semibold">Project Focus</th>
                <th className="py-4 px-6 font-semibold">Rating</th>
                <th className="py-4 px-6 font-semibold text-right">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-body text-sm">
              {bookmarks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-zinc-500">
                    No bookmarks found. Seed the database to see example data.
                  </td>
                </tr>
              ) : (
                bookmarks.map((bookmark) => (
                  <tr key={bookmark.id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="font-medium text-on-surface">{bookmark.title}</div>
                      <div className="text-xs text-zinc-500 mt-1">{bookmark.type}</div>
                    </td>
                    <td className="py-4 px-6">
                      <a href={bookmark.url} className="text-primary hover:underline flex items-center gap-1 font-code">
                        <ExternalLink size={12} />
                        {bookmark.url}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-zinc-100 text-zinc-500 font-label text-[10px] uppercase tracking-widest border border-zinc-200">
                        {bookmark.project_name || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-0.5 text-accent-orange">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < bookmark.rating ? 'currentColor' : 'none'} className={i < bookmark.rating ? '' : 'text-zinc-200'} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-code text-zinc-500">
                      {new Date(bookmark.created_at).toISOString().split('T')[0]}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
