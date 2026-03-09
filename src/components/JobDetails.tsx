import React, { useState } from 'react';
import { Job } from '../types';
import { MapPin, Clock, DollarSign, Building2, Globe, Share2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface JobDetailsProps {
  job: Job;
  isApplied: boolean;
  onApply: (id: string) => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job, isApplied, onApply }) => {
  const handleApply = () => {
    onApply(job.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={job.id}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden sticky top-6"
    >
      <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-400 relative">
        <div className="absolute -bottom-8 left-8 w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center p-3">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="pt-12 px-8 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{job.title}</h1>
            <div className="flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-1">
                <Building2 size={16} />
                <span className="text-sm font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe size={16} />
                <span className="text-sm">Website</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <Share2 size={20} />
            </button>
            <button 
              onClick={handleApply}
              disabled={isApplied}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                isApplied 
                  ? 'bg-emerald-500 text-white cursor-default' 
                  : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20'
              }`}
            >
              {isApplied ? 'Applied Successfully' : 'Apply Now'}
              {!isApplied && <ExternalLink size={18} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Salary</p>
            <div className="flex items-center gap-1 text-slate-900 font-bold">
              <DollarSign size={16} />
              {job.salary.toLocaleString()}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Job Type</p>
            <div className="flex items-center gap-1 text-slate-900 font-bold">
              <Clock size={16} />
              {job.type}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Experience</p>
            <div className="text-slate-900 font-bold">
              {job.experienceLevel}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">About the role</h2>
            <p className="text-slate-600 leading-relaxed">
              {job.description}
            </p>
          </section>

          {job.requirements && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          {job.benefits && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                {job.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
};
