import React from 'react';
import { Job } from '../types';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MyApplicationsViewProps {
  appliedJobs: Job[];
}

export const MyApplicationsView: React.FC<MyApplicationsViewProps> = ({ appliedJobs }) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Applications</h1>
        <p className="text-slate-500">Track the status of your job applications.</p>
      </div>

      {appliedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {appliedJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <p className="text-slate-500 font-medium">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={16} />
                  Applied on {new Date().toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
                  <CheckCircle2 size={14} />
                  Submitted
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Briefcase size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No applications yet</h3>
          <p className="text-slate-500">Start applying to jobs to see them here.</p>
        </div>
      )}
    </div>
  );
};
