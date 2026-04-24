import { useEffect, useState } from 'react';
import { getComparison } from '../../../services/api/comparisons.api';
import { ArrowLeftRight, Plus, ExternalLink, Calendar, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComparisonsPage = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const data = await getComparison(); // No projectId fetches all
        setComparisons(data);
      } catch (error) {
        console.error('Error fetching comparisons', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComparisons();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <header className="px-12 py-8 border-b border-zinc-200 flex items-end justify-between bg-white/50 sticky top-0 z-10">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface mb-1">Comparison Matrices</h2>
          <p className="font-body text-on-surface-variant max-w-2xl">Manage and evaluate high-density technical data across all research projects.</p>
        </div>
        <button 
          onClick={() => alert('New Comparison Matrix creation coming soon!')}
          className="px-6 py-2 bg-black text-white font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={16} />
          New Matrix
        </button>
      </header>

      <div className="p-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comparisons.length === 0 ? (
              <div className="col-span-full py-24 text-center bg-white border border-dashed border-zinc-300 rounded">
                <ArrowLeftRight className="mx-auto text-zinc-300 mb-4" size={48} />
                <p className="font-body text-zinc-500">No comparison matrices found. Create one within a project to get started.</p>
              </div>
            ) : (
              comparisons.map((comp) => (
                <div key={comp.id} className="bg-white border border-zinc-200 rounded p-8 hover:border-black transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-500 font-label text-[10px] uppercase tracking-widest border border-zinc-200">
                      Project: {comp.project_name}
                    </span>
                    <div className="text-zinc-400">
                      <ArrowLeftRight size={20} />
                    </div>
                  </div>
                  <h3 className="font-h3 text-xl text-black mb-2">{comp.name}</h3>
                  <div className="flex gap-6 mt-6 pt-6 border-t border-zinc-100">
                    <div className="flex items-center gap-2 text-zinc-500 font-code text-xs">
                      <Database size={14} />
                      Technical Matrix
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 font-code text-[10px] uppercase">
                      <Calendar size={14} />
                      Created {new Date(comp.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Link 
                      to={`/projects/${comp.project_id}`}
                      className="text-black font-label text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      View Full Matrix <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonsPage;
