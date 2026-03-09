import React from 'react';
import { TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SALARY_DATA = [
  { title: 'Software Engineer', min: 90000, max: 160000, avg: 125000 },
  { title: 'Product Designer', min: 85000, max: 150000, avg: 115000 },
  { title: 'Data Scientist', min: 100000, max: 180000, avg: 140000 },
  { title: 'Marketing Manager', min: 70000, max: 130000, avg: 95000 },
  { title: 'Sales Executive', min: 60000, max: 120000, avg: 85000 },
];

export const SalariesView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Salary Insights</h1>
        <p className="text-slate-500">Compare market salaries and find your worth in the current job market.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-brand-600" size={20} />
          Average Salary by Role (USD)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SALARY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="title" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="avg" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SALARY_DATA.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between group hover:border-brand-300 transition-all"
          >
            <div>
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="flex items-center gap-0.5"><DollarSign size={14} />{item.min.toLocaleString()}</span>
                <span>-</span>
                <span className="flex items-center gap-0.5"><DollarSign size={14} />{item.max.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Average</p>
              <p className="text-xl font-black text-brand-600">${(item.avg/1000).toFixed(0)}k</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
