import { Job } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    type: 'Full-time',
    salary: 95000,
    description: 'We are looking for a Software Engineer to join our core infrastructure team. You will be responsible for developing and maintaining high-performance web applications and services that power our global platform.',
    company: 'Google',
    logo: 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    isBookMarked: true,
    location: 'San Francisco, USA',
    experienceLevel: 'Mid Level',
    currency: 'USD',
    postedAt: '2024-03-01',
    category: 'Engineering',
    requirements: [
      '3+ years of experience with React and Node.js',
      'Strong understanding of distributed systems',
      'Experience with cloud platforms (GCP/AWS)',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Flexible working hours',
      'Professional development budget'
    ]
  },
  {
    id: '2',
    title: 'Product Designer',
    type: 'Full-time',
    salary: 120000,
    description: 'Join our design team to create intuitive and beautiful user experiences. You will work closely with product managers and engineers to define the future of our product interface.',
    company: 'Airbnb',
    logo: 'https://logo.clearbit.com/airbnb.com',
    isBookMarked: false,
    location: 'Remote',
    experienceLevel: 'Senior Level',
    currency: 'USD',
    postedAt: '2024-03-02',
    category: 'Design',
    requirements: [
      '5+ years of product design experience',
      'Expertise in Figma and design systems',
      'Strong portfolio demonstrating user-centric design',
      'Excellent communication skills'
    ]
  },
  {
    id: '3',
    title: 'Marketing Manager',
    type: 'Contract',
    salary: 85000,
    description: 'Lead our growth initiatives and manage multi-channel marketing campaigns. We need a data-driven marketer who can scale our user acquisition efforts.',
    company: 'Stripe',
    logo: 'https://logo.clearbit.com/stripe.com',
    isBookMarked: false,
    location: 'Dublin, Ireland',
    experienceLevel: 'Mid Level',
    currency: 'EUR',
    postedAt: '2024-03-03',
    category: 'Marketing'
  },
  {
    id: '4',
    title: 'Frontend Developer',
    type: 'Full-time',
    salary: 110000,
    description: 'Build responsive and performant user interfaces using modern web technologies. Focus on accessibility and user experience.',
    company: 'Vercel',
    logo: 'https://logo.clearbit.com/vercel.com',
    isBookMarked: true,
    location: 'New York, USA',
    experienceLevel: 'Mid Level',
    currency: 'USD',
    postedAt: '2024-03-04',
    category: 'Engineering'
  },
  {
    id: '5',
    title: 'Data Scientist',
    type: 'Full-time',
    salary: 140000,
    description: 'Apply machine learning and statistical analysis to solve complex business problems. Help us derive insights from massive datasets.',
    company: 'Netflix',
    logo: 'https://logo.clearbit.com/netflix.com',
    isBookMarked: false,
    location: 'Los Gatos, USA',
    experienceLevel: 'Senior Level',
    currency: 'USD',
    postedAt: '2024-03-05',
    category: 'Data Science'
  }
];

export const CATEGORIES = ['Engineering', 'Design', 'Marketing', 'Data Science', 'Sales', 'Customer Support'];
export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
export const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];
