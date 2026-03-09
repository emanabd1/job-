import React, { useState } from 'react';
import { X, Send, User, Mail, FileText, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../types';

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSuccess: (jobId: string) => void;
}

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({ isOpen, onClose, job, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFileName(file.name);
      // Simulate upload
      setTimeout(() => setIsUploading(false), 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      onSuccess(job.id);
      onClose();
    }
  };

  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Quick Apply</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Applying for <span className="font-bold text-brand-600">{job.title}</span> at {job.company}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Resume / CV</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      required={!fileName}
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`w-full flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                        fileName ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-brand-300 hover:bg-brand-50'
                      }`}
                    >
                      {isUploading ? (
                        <div className="flex items-center gap-2 text-brand-600 font-semibold">
                          <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </div>
                      ) : fileName ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                          <FileText size={20} />
                          {fileName}
                        </div>
                      ) : (
                        <>
                          <Upload className="text-slate-400" size={24} />
                          <span className="text-sm text-slate-500">Click to upload or drag and drop</span>
                          <span className="text-xs text-slate-400">PDF, DOCX (Max 5MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  Submit Application
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-6">
                By applying, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
