import { Star } from 'lucide-react';

const NotesTab = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="bg-white border border-zinc-200 rounded p-8">
          <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
            <h3 className="font-h3 text-h3 text-black">Performance Analysis</h3>
            <span className="font-label text-[10px] text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded">Last edited 2h ago</span>
          </div>
          <div className="prose prose-zinc max-w-none font-body text-on-surface space-y-4">
            <p>After reviewing the benchmarks for the M2 Air and the XPS 13, the thermal throttling on the XPS during sustained loads is a significant concern for our compiling workflows.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>M2 Air:</strong> Fanless design maintains 90% peak performance even after 30 mins of load.</li>
              <li><strong>XPS 13:</strong> Drops to 65% base clock after 15 mins due to thermal constraints.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="bg-brand-background border border-accent-orange/30 rounded p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
          <h3 className="font-label text-[10px] uppercase text-accent-orange mb-2 flex items-center gap-2 tracking-widest">
            <Star size={14} /> Final Decision
          </h3>
          <div className="font-h2 text-2xl text-black mb-4">MacBook Air M2</div>
          <p className="font-body text-sm text-zinc-600 mb-6">Selected for superior battery life and sustained performance without thermal throttling.</p>
          <div className="flex gap-2">
            <span className="bg-white border border-zinc-200 px-3 py-1 rounded font-label text-[10px] uppercase tracking-widest text-black">16GB RAM</span>
            <span className="bg-white border border-zinc-200 px-3 py-1 rounded font-label text-[10px] uppercase tracking-widest text-black">512GB SSD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesTab;
