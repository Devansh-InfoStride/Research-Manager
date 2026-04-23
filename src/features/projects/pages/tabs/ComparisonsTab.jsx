import React from 'react';

const ComparisonsTab = () => {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 font-label text-xs uppercase tracking-widest text-zinc-500">
            <th className="p-4 w-1/5">Feature</th>
            <th className="p-4 w-1/5 border-l border-zinc-200">
              <span className="block text-accent-orange mb-1">Top Pick</span>
              <h3 className="font-h3 text-h3 text-black">MacBook Air M2</h3>
            </th>
            <th className="p-4 w-1/5 border-l border-zinc-200">
              <span className="block text-zinc-500 mb-1">Option B</span>
              <h3 className="font-h3 text-h3 text-black">Dell XPS 13</h3>
            </th>
            <th className="p-4 w-1/5 border-l border-zinc-200">
              <span className="block text-zinc-500 mb-1">Option C</span>
              <h3 className="font-h3 text-h3 text-black">ThinkPad X1</h3>
            </th>
          </tr>
        </thead>
        <tbody className="font-body text-sm">
          <tr className="border-b border-zinc-100">
            <td className="p-4 font-label text-[10px] uppercase text-zinc-500">Price</td>
            <td className="p-4 border-l border-zinc-100 font-medium">₹99,900</td>
            <td className="p-4 border-l border-zinc-100">₹95,000</td>
            <td className="p-4 border-l border-zinc-100">₹1,10,000</td>
          </tr>
          <tr className="border-b border-zinc-100 bg-zinc-50/50">
            <td className="p-4 font-label text-[10px] uppercase text-zinc-500">RAM</td>
            <td className="p-4 border-l border-zinc-100">8GB Unified</td>
            <td className="p-4 border-l border-zinc-100">16GB LPDDR5</td>
            <td className="p-4 border-l border-zinc-100">16GB LPDDR5x</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonsTab;
