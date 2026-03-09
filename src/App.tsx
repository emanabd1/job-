import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS, MOCK_JOBS } from './constants';
import { Job, FilterState } from './types';
import { Navbar } from './components/Navbar';
import { JobCard } from './components/JobCard';
import { JobDetails } from './components/JobDetails';
import { CompaniesView } from './components/CompaniesView';
import { SalariesView } from './components/SalariesView';
import { MyApplicationsView } from './components/MyApplicationsView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { QuickApplyModal } from './components/QuickApplyModal';
import { Search, Filter, X, ChevronDown, MapPin, Clock, DollarSign, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'jobs' | 'companies' | 'salaries' | 'applications' | 'contact'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuickApplyModal, setShowQuickApplyModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: [],
    experience: [],
    category: [],
    location: '',
    salaryRange: [0, 200000],
    currency: 'USD',
    timeRange: 'all'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
          setSelectedJobId(data[0].id);
        } else {
          // Fallback to mock data if API returns empty or non-array
          setJobs(MOCK_JOBS);
          if (MOCK_JOBS.length > 0) setSelectedJobId(MOCK_JOBS[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        // Fallback to mock data if backend fails
        setJobs(MOCK_JOBS);
        if (MOCK_JOBS.length > 0) setSelectedJobId(MOCK_JOBS[0].id);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const selectedJob = useMemo(() => 
    jobs.find(j => j.id === selectedJobId) || jobs[0],
    [jobs, selectedJobId]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          job.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
      const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.experienceLevel);
      const matchesCategory = filters.category.length === 0 || filters.category.includes(job.category);
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSalary = job.salary >= filters.salaryRange[0] && job.salary <= filters.salaryRange[1];
      const matchesSaved = !showSavedOnly || job.isBookMarked;
      
      return matchesSearch && matchesType && matchesExperience && matchesCategory && matchesLocation && matchesSalary && matchesSaved;
    });
  }, [jobs, filters, showSavedOnly]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, isBookMarked: !job.isBookMarked } : job
    ));
  };

  const toggleFilter = (key: keyof Omit<FilterState, 'search' | 'location' | 'salaryRange' | 'currency' | 'timeRange'>, value: string) => {
    setFilters(prev => {
      const current = prev[key] as string[];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: [],
      experience: [],
      category: [],
      location: '',
      salaryRange: [0, 200000],
      currency: 'USD',
      timeRange: 'all'
    });
  };

  const resetDatabase = async () => {
    if (window.confirm("This will delete all current jobs and reload the original ones. Continue?")) {
      setIsLoading(true);
      try {
        await fetch('/api/jobs/reset', { method: 'POST' });
        // The useEffect will trigger a re-seed on next load or we can manually call it
        window.location.reload();
      } catch (error) {
        console.error("Reset failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleApply = (id: string) => {
    if (isLoggedIn) {
      if (!appliedJobIds.includes(id)) {
        setAppliedJobIds(prev => [...prev, id]);
      }
    } else {
      setShowQuickApplyModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isLoggedIn={isLoggedIn}
        activeView={view}
        onViewChange={setView}
        onLoginClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
        onSignupClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
        onLogout={() => setIsLoggedIn(false)}
        onResetData={resetDatabase}
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Connecting to MongoDB...</p>
          </div>
        ) : view === 'jobs' ? (
          <>
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[40px] overflow-hidden mb-12 bg-slate-900 h-[400px] flex items-center justify-center text-center px-6"
            >
              <div className="absolute inset-0 opacity-40">
                <img 
                  src="https://picsum.photos/seed/office/1920/1080" 
                  alt="Modern Office" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Over 10,000+ Jobs Available
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                  Find Your <span className="text-brand-400">Dream Career</span> in One Place
                </h1>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
                  Connect with top companies like <span className="text-white font-bold">Google</span>, <span className="text-white font-bold">Airbnb</span>, and <span className="text-white font-bold">Stripe</span>.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white">
                      +2k
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">Joined by 2,000+ job seekers this week</span>
                </div>
              </div>
            </motion.div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search job title, company, or keywords..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${
              isFilterOpen ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Filter size={20} />
            <span className="font-semibold">Filters</span>
            {Object.values(filters).some(v => Array.isArray(v) && v.length > 0) && (
              <span className="w-5 h-5 bg-brand-600 text-white text-[10px] rounded-full flex items-center justify-center">
                {filters.type.length + filters.experience.length + filters.category.length}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm max-w-md mx-auto">
                <div className="space-y-8">
                  {/* Time Range */}
                  <div>
                    <div className="relative">
                      <select 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl appearance-none text-slate-600 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        value={filters.timeRange}
                        onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
                      >
                        <option value="all">All Time</option>
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Job Type</h4>
                    <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      {JOB_TYPES.map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div 
                            onClick={() => toggleFilter('type', type)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                              filters.type.includes(type as any) 
                                ? 'bg-brand-600 border-brand-600 text-white' 
                                : 'bg-white border-slate-300 group-hover:border-brand-400'
                            }`}
                          >
                            {filters.type.includes(type as any) && <div className="w-2 h-2 bg-white rounded-sm" />}
                          </div>
                          <span className={`text-sm font-medium ${filters.type.includes(type as any) ? 'text-slate-900' : 'text-slate-500'}`}>
                            {type}
                          </span>
                        </label>
                      ))}
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-slate-300 bg-white group-hover:border-brand-400 flex items-center justify-center transition-all"></div>
                        <span className="text-sm font-medium text-slate-500">Volunteer</span>
                      </label>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Location</h4>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text"
                        placeholder="Enter your location"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Experience Level</h4>
                    <div className="relative">
                      <select 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl appearance-none text-slate-600 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        value={filters.experience[0] || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value ? [e.target.value as any] : [] }))}
                      >
                        <option value="">Select Level</option>
                        {EXPERIENCE_LEVELS.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Salary Range</h4>
                    <div className="px-2 pb-8">
                      <div className="relative h-1.5 bg-slate-100 rounded-full mb-8">
                        <div 
                          className="absolute h-full bg-brand-600 rounded-full"
                          style={{ 
                            left: `${(filters.salaryRange[0] / 200000) * 100}%`, 
                            right: `${100 - (filters.salaryRange[1] / 200000) * 100}%` 
                          }}
                        />
                        <div 
                          className="absolute w-5 h-5 bg-white border-2 border-brand-600 rounded-full -top-2 -translate-x-1/2 cursor-pointer shadow-sm flex flex-col items-center"
                          style={{ left: `${(filters.salaryRange[0] / 200000) * 100}%` }}
                        >
                           <span className="absolute -top-6 text-[10px] font-bold text-slate-400">${filters.salaryRange[0].toLocaleString()}</span>
                        </div>
                        <div 
                          className="absolute w-5 h-5 bg-white border-2 border-brand-600 rounded-full -top-2 -translate-x-1/2 cursor-pointer shadow-sm flex flex-col items-center"
                          style={{ left: `${(filters.salaryRange[1] / 200000) * 100}%` }}
                        >
                           <span className="absolute -top-6 text-[10px] font-bold text-slate-400">${filters.salaryRange[1].toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-bold text-slate-400 text-center">Input Manually</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">From</span>
                            <input 
                              type="number"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                              value={filters.salaryRange[0]}
                              onChange={(e) => setFilters(prev => ({ ...prev, salaryRange: [Number(e.target.value), prev.salaryRange[1]] }))}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">To</span>
                            <input 
                              type="number"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                              value={filters.salaryRange[1]}
                              onChange={(e) => setFilters(prev => ({ ...prev, salaryRange: [prev.salaryRange[0], Number(e.target.value)] }))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Currency */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Currency</h4>
                    <div className="relative">
                      <select 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl appearance-none text-slate-600 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        value={filters.currency}
                        onChange={(e) => setFilters(prev => ({ ...prev, currency: e.target.value }))}
                      >
                        <option value="USD">Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">Pound (£)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button 
                    onClick={clearFilters}
                    className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20"
                  >
                    Reset all filter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Job List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowSavedOnly(false)}
                  className={`text-sm font-bold pb-1 transition-all ${!showSavedOnly ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  All Jobs
                </button>
                <button 
                  onClick={() => setShowSavedOnly(true)}
                  className={`text-sm font-bold pb-1 transition-all ${showSavedOnly ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Saved Jobs
                </button>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-900 cursor-pointer">
                Newest <ChevronDown size={16} />
              </div>
            </div>
            
            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id}
                    job={job}
                    isSelected={selectedJobId === job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    onToggleBookmark={(e) => toggleBookmark(job.id, e)}
                  />
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">No jobs found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-7 hidden lg:block">
            {selectedJob && (
              <JobDetails 
                job={selectedJob} 
                isApplied={appliedJobIds.includes(selectedJob.id)}
                onApply={handleApply}
              />
            )}
          </div>
        </div>
      </>
    ) : view === 'companies' ? (
      <CompaniesView />
    ) : view === 'salaries' ? (
      <SalariesView />
    ) : view === 'applications' ? (
      <MyApplicationsView appliedJobs={jobs.filter(j => appliedJobIds.includes(j.id))} />
    ) : (
      <ContactView />
    )}
  </main>

      {/* Mobile Job Details Modal (Simplified for this demo) */}
      {/* In a real app, this would be a separate route or a full-screen drawer */}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        setMode={setAuthMode}
        onSuccess={() => setIsLoggedIn(true)}
      />

      <QuickApplyModal 
        isOpen={showQuickApplyModal}
        onClose={() => setShowQuickApplyModal(false)}
        job={selectedJob}
        onSuccess={(id) => {
          if (!appliedJobIds.includes(id)) {
            setAppliedJobIds(prev => [...prev, id]);
          }
        }}
      />
    </div>
  );
}
