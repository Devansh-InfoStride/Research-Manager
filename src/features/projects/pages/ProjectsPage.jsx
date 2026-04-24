import { useEffect, useState } from 'react';
import { Plus, Database, FolderOpen, MoreVertical } from 'lucide-react';
import { getProjects } from '../../../services/api/projects.api';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-12 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-h1 text-h1 text-on-background mb-1">Projects</h2>
          <p className="font-body text-body text-on-surface-variant">Manage and track your active research initiatives.</p>
        </div>
        <button className="bg-black text-white font-label text-label uppercase px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center gap-2 h-fit">
          <Plus size={18} />
          Create New Project
        </button>
      </div>

      <div className="flex gap-8 border-b border-zinc-200 mb-8 pb-2">
        <button className="font-label text-label uppercase tracking-widest text-on-background border-b-2 border-on-background px-2 pb-2">All Projects</button>
        <button className="font-label text-label uppercase tracking-widest text-on-surface-variant hover:text-on-background px-2 pb-2 transition-colors">Requires Review</button>
        <button className="font-label text-label uppercase tracking-widest text-on-surface-variant hover:text-on-background px-2 pb-2 transition-colors">Archived</button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {/* Empty state or Add button could go here */}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col justify-between h-64 hover:border-black transition-colors cursor-pointer group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="font-label text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded">
            {project.status || 'Active'}
          </span>
          <button className="text-zinc-400 hover:text-black">
            <MoreVertical size={16} />
          </button>
        </div>
        <h3 className="font-h3 text-h3 text-on-surface line-clamp-2 leading-tight">
          {project.name}
        </h3>
        <p className="font-body text-sm text-on-surface-variant mt-2 line-clamp-2">
          {project.description || 'No description provided.'}
        </p>
      </div>
      <div>
        <div className="h-[1px] w-full bg-zinc-100 mb-4"></div>
        <div className="flex justify-between items-center text-zinc-500">
          <div className="flex items-center gap-2">
            <Database size={16} />
            <span className="font-code text-xs">24 Datapoints</span>
          </div>
          <div className="flex items-center gap-2">
            <FolderOpen size={16} />
            <span className="font-code text-xs">12 Resources</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsPage;
