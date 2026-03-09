import React from 'react';
import { Job } from '../types';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
  onToggleBookmark: (e: React.MouseEvent) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onClick, onToggleBookmark }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`p-5 rounded-2xl border cursor-pointer job-card-hover ${
        isSelected ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 p-2">
            <img 
              src={job.logo} 
              alt={job.company} 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">{job.title}</h3>
            <p className="text-sm text-slate-500">{job.company}</p>
          </div>
        </div>
        <button 
          onClick={onToggleBookmark}
          className={`p-2 rounded-full transition-colors ${
            job.isBookMarked ? 'text-brand-600 bg-brand-100' : 'text-slate-400 hover:bg-slate-100'
          }`}
        >
          {job.isBookMarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          <MapPin size={14} />
          {job.location}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          <Clock size={14} />
          {job.type}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          <DollarSign size={14} />
          {job.salary.toLocaleString()} / year
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-slate-400">
          Posted {new Date(job.postedAt).toLocaleDateString()}
        </span>
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
          {job.experienceLevel}
        </span>
      </div>
    </motion.div>
  );
};
