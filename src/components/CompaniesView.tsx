import React from 'react';
import { Building2, Users, Briefcase, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const COMPANIES = [
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com', employees: '150,000+', jobs: 12, description: 'Organizing the world\'s information and making it universally accessible and useful.' },
  { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com', employees: '6,000+', jobs: 8, description: 'Airbnb is a community-based marketplace for listing, discovering, and booking unique accommodations.' },
  { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', employees: '8,000+', jobs: 15, description: 'Stripe is a suite of APIs powering online payment processing and commerce solutions.' },
  { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com', employees: '12,000+', jobs: 5, description: 'Netflix is the world\'s leading streaming entertainment service.' },
  { name: 'Vercel', logo: 'https://logo.clearbit.com/vercel.com', employees: '500+', jobs: 4, description: 'Vercel is the platform for frontend developers, providing the speed and reliability needed to innovate.' },
];

export const CompaniesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Top Companies</h1>
        <p className="text-slate-500">Explore the best companies to work for and their open positions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPANIES.map((company, i) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                <img src={company.logo} alt={company.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <button className="p-2 text-slate-400 group-hover:text-brand-600 transition-colors">
                <ExternalLink size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-1">{company.name}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{company.description}</p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Users size={14} />
                {company.employees}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                <Briefcase size={14} />
                {company.jobs} Open Jobs
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
