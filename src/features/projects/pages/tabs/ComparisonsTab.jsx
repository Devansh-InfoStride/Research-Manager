import { useEffect, useState } from 'react';
import { getComparison } from '../../../../services/api/comparisons.api';
import { Plus, Info } from 'lucide-react';

const ComparisonsTab = ({ projectId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getComparison(projectId);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  if (!data) return (
    <div className="bg-white border border-dashed border-zinc-300 rounded p-12 text-center">
      <h3 className="font-h3 text-xl text-black mb-2">No Comparison Matrix</h3>
      <p className="font-body text-zinc-500 mb-6">You haven't created a comparison matrix for this project yet.</p>
      <button className="bg-black text-white px-6 py-2 font-label text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity">
        Create Matrix
      </button>
    </div>
  );

  const { fields, items, values } = data;

  const getValue = (itemId, fieldId) => {
    const cell = values.find(v => v.item_id === itemId && v.field_id === fieldId);
    return cell ? cell.value : '-';
  };

  return (
    <div className="bg-white border border-zinc-200 rounded overflow-hidden">
      <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
        <div className="flex items-center gap-2 text-zinc-500">
          <Info size={14} />
          <span className="font-label text-[10px] uppercase tracking-widest">Comparison Matrix: {data.name}</span>
        </div>
        <button className="text-black font-label text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline">
          <Plus size={14} /> Add Option
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 font-label text-xs uppercase tracking-widest text-zinc-500">
              <th className="p-6 w-1/5 font-semibold">Feature / Field</th>
              {items.map(item => (
                <th key={item.id} className="p-6 border-l border-zinc-200 min-w-[200px]">
                  {item.is_top_pick && (
                    <span className="block text-accent-orange text-[10px] mb-1 font-bold">Top Pick</span>
                  )}
                  {!item.is_top_pick && (
                    <span className="block text-zinc-400 text-[10px] mb-1">Option</span>
                  )}
                  <h3 className="font-h3 text-lg text-black">{item.name}</h3>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-body text-sm">
            {fields.map((field, idx) => (
              <tr key={field.id} className={`border-b border-zinc-100 ${idx % 2 === 1 ? 'bg-zinc-50/30' : ''}`}>
                <td className="p-6 font-label text-[10px] uppercase text-zinc-500 tracking-wider bg-zinc-50/50">{field.name}</td>
                {items.map(item => (
                  <td key={`${item.id}-${field.id}`} className="p-6 border-l border-zinc-100 font-medium text-on-surface">
                    {getValue(item.id, field.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonsTab;
