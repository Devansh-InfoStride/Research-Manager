import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Folder, 
  Bookmark, 
  Lightbulb, 
  ArrowLeftRight,
  Plus
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: Folder },
  { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  { name: 'Insights', path: '/insights', icon: Lightbulb },
  { name: 'Comparisons', path: '/comparisons', icon: ArrowLeftRight },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-zinc-200 bg-brand-background flex flex-col z-50">
      <div className="p-6 border-b border-zinc-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center font-bold font-h3">
            C
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-black uppercase font-h3 leading-none">
              CompareHub
            </h1>
            <p className="font-label text-[10px] text-zinc-500 uppercase mt-1 tracking-widest">
              Research Systems
            </p>
          </div>
        </div>
        
        <button className="w-full bg-black text-white font-label text-label py-3 px-4 rounded hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
          <Plus size={16} />
          New Comparison
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 font-label text-sm tracking-tight uppercase">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 px-6 py-3 transition-all",
                    isActive
                      ? "text-black font-bold border-l-2 border-accent-orange bg-white/50"
                      : "text-zinc-500 hover:bg-zinc-100/50"
                  )
                }
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-zinc-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden border border-zinc-300">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVNPLaQAhBcnWPAgQKZMoK9WCvVDb61ONztnZoKuM8PyFTS3q2BBCsIZDJ2Wg403PWyTaK9JaoeGN8l8uJMUat5yzi_2QQnAvU6d_Wo7tS1RWTSdStSgNus4usOdXgGKRJscKBm76oMtiOrEtQeGcmDldxuhPFtAuusVbTc0mlETSWSTtrHiWt1O7A3JWhZBfODCwEWxoWlCVGk8zWyP4_XWiS884sqRjgQPySHkRJepQ34rybHIbV27oYZxm1gLr__LPicMXVT7U" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black truncate">Researcher 01</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
