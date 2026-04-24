import { useEffect, useState } from 'react';
import { getProjects } from '../../../services/api/projects.api';
import { getAllBookmarks } from '../../../services/api/bookmarks.api';
import { Folder, Bookmark, Star, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalBookmarks: 0,
    avgRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [projectsRes, bookmarks] = await Promise.all([
          getProjects(),
          getAllBookmarks()
        ]);
        
        const projects = projectsRes.data.projects;
        const activeProjects = projects.filter(p => p.status !== 'archived').length;
        
        const totalRating = bookmarks.reduce((sum, b) => sum + (b.rating || 0), 0);
        const avgRating = bookmarks.length > 0 ? (totalRating / bookmarks.length).toFixed(1) : 0;

        setMetrics({
          totalProjects: projects.length,
          activeProjects,
          totalBookmarks: bookmarks.length,
          avgRating,
        });
      } catch (error) {
        console.error('Error fetching global metrics', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-12 max-w-[1440px] mx-auto">
      <div className="mb-12">
        <h1 className="font-h1 text-h1 text-on-surface mb-2">Global Metrics</h1>
        <p className="font-body text-on-surface-variant">Overview of your research repository and active initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard 
          icon={Folder} 
          title="Active Projects" 
          value={metrics.activeProjects} 
          subtitle={`Out of ${metrics.totalProjects} total`} 
        />
        <MetricCard 
          icon={Bookmark} 
          title="Total Resources" 
          value={metrics.totalBookmarks} 
          subtitle="Saved across all projects" 
        />
        <MetricCard 
          icon={Star} 
          title="Average Rating" 
          value={metrics.avgRating} 
          subtitle="Quality of resources" 
        />
        <MetricCard 
          icon={Database} 
          title="Data Points" 
          value="--*" 
          subtitle="Comparison matrix entries" 
        />
      </div>

      <div className="bg-white border border-zinc-200 p-8 rounded">
        <h2 className="font-h2 text-2xl text-on-surface mb-4">Welcome to CompareHub</h2>
        <p className="font-body text-on-surface-variant mb-6">
          CompareHub is an advanced research and comparison tool. Use the navigation to manage your projects, save bookmarks, or draw insights from comparison matrices.
        </p>
        <Link 
          to="/projects" 
          className="inline-block bg-black text-white font-label text-label uppercase px-6 py-3 rounded hover:opacity-90 transition-opacity"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="bg-white border border-zinc-200 p-6 rounded hover:border-zinc-400 transition-colors group">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-label text-[10px] uppercase tracking-widest text-zinc-500">{title}</h3>
      <div className="text-zinc-300 group-hover:text-black transition-colors">
        <Icon size={20} />
      </div>
    </div>
    <div className="font-h1 text-4xl text-black mb-2">{value}</div>
    <p className="font-body text-xs text-zinc-500">{subtitle}</p>
  </div>
);

export default DashboardPage;
