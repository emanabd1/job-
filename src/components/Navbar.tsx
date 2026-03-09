import React from 'react';
import { Search, Bell, User, Briefcase, LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  activeView: 'jobs' | 'companies' | 'salaries' | 'applications' | 'contact';
  onViewChange: (view: 'jobs' | 'companies' | 'salaries' | 'applications' | 'contact') => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  onResetData?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, activeView, onViewChange, onLoginClick, onSignupClick, onLogout, onResetData }) => {
  return (
    <nav className="h-16 border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onViewChange('jobs')}
          id="app-logo"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
              <Briefcase size={22} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-brand-600 transition-colors">
              JOB<span className="text-brand-600">SPHERE</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-0.5">Career Portal</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => onViewChange('jobs')}
            className={`text-sm font-semibold transition-colors ${activeView === 'jobs' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Find Jobs
          </button>
          <button 
            onClick={() => onViewChange('companies')}
            className={`text-sm font-semibold transition-colors ${activeView === 'companies' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Companies
          </button>
          <button 
            onClick={() => onViewChange('salaries')}
            className={`text-sm font-semibold transition-colors ${activeView === 'salaries' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Salaries
          </button>
          <button 
            onClick={() => onViewChange('applications')}
            className={`text-sm font-semibold transition-colors ${activeView === 'applications' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            My Applications
          </button>
          <button 
            onClick={() => onViewChange('contact')}
            className={`text-sm font-semibold transition-colors ${activeView === 'contact' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Contact Us
          </button>
          {onResetData && (
            <button 
              onClick={onResetData}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-wider transition-colors"
            >
              Reset Data
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
              </button>
              <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden sm:inline">User</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={onLoginClick}
                className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={onSignupClick}
                className="text-sm font-bold bg-brand-600 text-white px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-all shadow-md shadow-brand-500/10"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
