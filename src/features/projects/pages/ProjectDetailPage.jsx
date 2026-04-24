import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../../../services/api/projects.api';
import { 
  Bookmark, 
  TableProperties, 
  StickyNote, 
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
// For now, I'll just put the sub-components in the same file to be quick
import BookmarksTab from './tabs/BookmarksTab';
import ComparisonsTab from './tabs/ComparisonsTab';
import NotesTab from './tabs/NotesTab';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('resources');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setProject(response.data.project);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject(id);
  }, [id]);

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!project) return <div className="p-12 text-center">Project not found</div>;

  return (
    <div className="max-w-[1200px] mx-auto p-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-label uppercase tracking-widest mb-4">
        <a href="/projects" className="hover:text-black transition-colors">Projects</a>
        <ChevronRight size={10} />
        <span className="text-black">{project.name}</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-h1 text-h1 text-black mb-2">{project.name}</h1>
          <p className="font-body text-lg text-zinc-600 max-w-2xl">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-zinc-100 text-black font-label text-[10px] uppercase tracking-widest rounded border border-zinc-200 flex items-center gap-1">
            Active
          </span>
          <span className="px-3 py-1 bg-zinc-100 text-black font-label text-[10px] uppercase tracking-widest rounded border border-zinc-200 flex items-center gap-1">
            12 Items
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 mb-8 flex gap-8">
        <TabButton 
          active={activeTab === 'resources'} 
          onClick={() => setActiveTab('resources')}
          icon={Bookmark}
          label="Resources"
        />
        <TabButton 
          active={activeTab === 'comparisons'} 
          onClick={() => setActiveTab('comparisons')}
          icon={TableProperties}
          label="Comparison View"
        />
        <TabButton 
          active={activeTab === 'notes'} 
          onClick={() => setActiveTab('notes')}
          icon={StickyNote}
          label="Notes"
        />
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'resources' && <BookmarksTab projectId={id} />}
        {activeTab === 'comparisons' && <ComparisonsTab projectId={id} />}
        {activeTab === 'notes' && <NotesTab projectId={id} />}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={clsx(
      "pb-3 font-label text-xs uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all",
      active 
        ? "text-black border-black font-bold" 
        : "text-zinc-500 border-transparent hover:text-black hover:border-zinc-300"
    )}
  >
    <Icon size={16} fill={active ? 'currentColor' : 'none'} />
    {label}
  </button>
);

export default ProjectDetailPage;
