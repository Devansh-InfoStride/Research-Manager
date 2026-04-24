import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/layout/Sidebar';
import { Search, Share, Download, Bell, Settings } from 'lucide-react';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 py-3 bg-white/80 backdrop-blur-md border-b border-zinc-200">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="SEARCH REPOSITORY..." 
                className="w-full pl-10 pr-4 py-2 bg-zinc-100/50 border-none rounded font-label text-xs uppercase tracking-widest focus:ring-1 focus:ring-black outline-none"
              />
            </div>
            <nav className="hidden lg:flex gap-8 font-label text-xs font-medium uppercase tracking-widest">
              <a href="#" className="text-accent-orange border-b border-accent-orange pb-1">Active Projects</a>
              <a href="#" className="text-zinc-500 hover:text-black transition-colors">Global Metrics</a>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors font-label text-xs uppercase">
              <Share size={16} />
              Share Analysis
            </button>
            <button className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors font-label text-xs uppercase">
              <Download size={16} />
              Export
            </button>
            <div className="h-4 w-px bg-zinc-200 mx-2" />
            <button className="text-zinc-500 hover:text-black transition-colors">
              <Bell size={20} />
            </button>
            <button className="text-zinc-500 hover:text-black transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
