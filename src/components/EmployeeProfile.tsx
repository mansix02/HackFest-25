import React, { useState } from 'react';
import { 
  User, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Award, 
  Calendar, 
  BarChart, 
  Lightbulb, 
  Target, 
  X, 
  ChevronRight
} from 'lucide-react';

// Mock data types
interface PerformanceData {
  overall: number;
  technical: number;
  communication: number;
  teamwork: number;
  initiative: number;
  lastReviewed: string;
}

interface FeedbackItem {
  id: string;
  from: string;
  date: string;
  content: string;
  type: 'positive' | 'constructive' | 'recognition';
}

interface DevelopmentGoal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface EmployeeData {
  id: string;
  name: string;
  position: string;
  department: string;
  photoUrl: string;
  email: string;
  performance: PerformanceData;
  feedback: FeedbackItem[];
  developmentGoals: DevelopmentGoal[];
}

interface EmployeeProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock employee data
const mockEmployee: EmployeeData = {
  id: 'EMP123',
  name: 'Alex Johnson',
  position: 'Senior Software Developer',
  department: 'Engineering',
  photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  email: 'alex.johnson@gofloww.com',
  performance: {
    overall: 87,
    technical: 92,
    communication: 85,
    teamwork: 88,
    initiative: 83,
    lastReviewed: '2023-10-15'
  },
  feedback: [
    {
      id: 'f1',
      from: 'Sarah Peterson (Manager)',
      date: '2023-11-22',
      content: 'Alex has consistently delivered high-quality code and exceeded expectations on the user authentication project.',
      type: 'positive'
    },
    {
      id: 'f2',
      from: 'Michael Chen (Peer)',
      date: '2023-11-10',
      content: 'Great collaboration on the API integration. Your documentation was extremely helpful.',
      type: 'positive'
    },
    {
      id: 'f3',
      from: 'Emma Roberts (Product)',
      date: '2023-10-28',
      content: 'Consider providing more frequent updates during longer development tasks to keep stakeholders informed.',
      type: 'constructive'
    },
    {
      id: 'f4',
      from: 'Leadership Team',
      date: '2023-10-05',
      content: 'Recognition for going above and beyond to fix the critical production issue during the weekend.',
      type: 'recognition'
    }
  ],
  developmentGoals: [
    {
      id: 'g1',
      title: 'Cloud Architecture Certification',
      description: 'Complete AWS Solutions Architect certification to strengthen cloud infrastructure knowledge.',
      dueDate: '2024-03-30',
      progress: 65,
      status: 'in-progress'
    },
    {
      id: 'g2',
      title: 'Mentorship Program',
      description: 'Mentor junior developers and conduct bi-weekly knowledge sharing sessions.',
      dueDate: '2024-01-15',
      progress: 50,
      status: 'in-progress'
    },
    {
      id: 'g3',
      title: 'Frontend Performance Optimization',
      description: 'Research and implement best practices for React application performance optimization.',
      dueDate: '2023-12-20',
      progress: 80,
      status: 'in-progress'
    },
    {
      id: 'g4',
      title: 'Technical Documentation',
      description: 'Improve team documentation processes and create standardized templates.',
      dueDate: '2023-11-10',
      progress: 100,
      status: 'completed'
    }
  ]
};

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'feedback' | 'goals' | 'reviews'>('overview');
  const [employee] = useState<EmployeeData>(mockEmployee);
  
  if (!isOpen) return null;
  
  // Helper to render performance gauge
  const renderPerformanceGauge = (value: number, label: string) => {
    const getColorClass = (val: number) => {
      if (val >= 90) return "from-emerald-500 to-emerald-400";
      if (val >= 80) return "from-blue-500 to-blue-400";
      if (val >= 70) return "from-amber-500 to-amber-400";
      return "from-red-500 to-red-400";
    };
    
    return (
      <div className="glass p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/80">{label}</span>
          <span className="text-sm font-medium text-white">{value}%</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getColorClass(value)}`} 
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };
  
  // Helper to render a feedback card
  const renderFeedbackCard = (feedback: FeedbackItem) => {
    const getTypeStyles = (type: string) => {
      switch(type) {
        case 'positive':
          return "border-blue-500/30 bg-blue-500/10";
        case 'constructive':
          return "border-amber-500/30 bg-amber-500/10";
        case 'recognition':
          return "border-purple-500/30 bg-purple-500/10";
        default:
          return "border-gray-500/30 bg-gray-500/10";
      }
    };
    
    return (
      <div className={`glass p-4 rounded-lg border ${getTypeStyles(feedback.type)}`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-white">{feedback.from}</h4>
          <span className="text-xs text-white/60">{feedback.date}</span>
        </div>
        <p className="text-sm text-white/80">{feedback.content}</p>
      </div>
    );
  };
  
  // Helper to render a development goal
  const renderGoalCard = (goal: DevelopmentGoal) => {
    const getStatusStyles = (status: string) => {
      switch(status) {
        case 'completed':
          return "text-emerald-400";
        case 'in-progress':
          return "text-blue-400";
        case 'not-started':
          return "text-amber-400";
        default:
          return "text-white/60";
      }
    };
    
    return (
      <div className="glass p-4 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-white">{goal.title}</h4>
          <span className={`text-xs ${getStatusStyles(goal.status)}`}>
            {goal.status === 'completed' ? 'Completed' : 
             goal.status === 'in-progress' ? 'In Progress' : 
             'Not Started'}
          </span>
        </div>
        <p className="text-sm text-white/80 mb-3">{goal.description}</p>
        
        <div className="flex justify-between items-center text-xs text-white/60 mb-2">
          <span>Progress: {goal.progress}%</span>
          <span>Due: {goal.dueDate}</span>
        </div>
        
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              goal.status === 'completed' ? 'bg-emerald-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Profile modal */}
      <div className="relative z-10 w-full max-w-5xl h-[90vh] glass-card rounded-xl overflow-hidden animate-scale-in flex flex-col">
        {/* Cosmic background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
          
          {/* Star field background */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-pulse-slow"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>
        
        {/* Header with close button */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center relative">
          <h2 className="text-xl font-semibold text-white flex items-center">
            Employee Performance Portal
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Profile content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Employee info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="glass p-5 rounded-xl w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-500/30 flex items-center justify-center overflow-hidden border-2 border-indigo-500/50 mb-4">
                <img 
                  src={employee.photoUrl} 
                  alt={employee.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-1">{employee.name}</h3>
              <p className="text-indigo-300 mb-3">{employee.position}</p>
              <p className="text-white/60 text-sm mb-4">{employee.department}</p>
              
              <div className="glass-darker p-2 px-3 rounded-full text-sm flex items-center">
                <User className="w-4 h-4 mr-2 text-indigo-400" />
                {employee.id}
              </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center mb-4">
                <Award className="w-5 h-5 mr-2 text-indigo-400" />
                Performance Overview
              </h3>
              
              <div className="text-center mb-5">
                <div className="inline-flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="transparent" 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="transparent" 
                        stroke="url(#gradient)" 
                        strokeWidth="8" 
                        strokeDasharray="283" 
                        strokeDashoffset={283 - (283 * employee.performance.overall / 100)} 
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold text-white">{employee.performance.overall}%</span>
                      <span className="text-xs text-white/60">Overall</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-2">Last reviewed: {employee.performance.lastReviewed}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderPerformanceGauge(employee.performance.technical, "Technical Skills")}
                {renderPerformanceGauge(employee.performance.communication, "Communication")}
                {renderPerformanceGauge(employee.performance.teamwork, "Teamwork")}
                {renderPerformanceGauge(employee.performance.initiative, "Initiative & Innovation")}
              </div>
            </div>
          </div>
          
          {/* Tabs for different sections */}
          <div className="mb-6 border-b border-white/10">
            <div className="flex gap-1">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-white/60 hover:text-white'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('feedback')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'feedback' 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-white/60 hover:text-white'}`}
              >
                Feedback
              </button>
              <button 
                onClick={() => setActiveTab('goals')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'goals' 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-white/60 hover:text-white'}`}
              >
                Development Goals
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews' 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-white/60 hover:text-white'}`}
              >
                Performance Reviews
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center mb-4">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-400" />
                  Recent Feedback
                </h3>
                <div className="space-y-3">
                  {employee.feedback.slice(0, 2).map(item => renderFeedbackCard(item))}
                  <button className="w-full glass-button py-2 flex items-center justify-center text-white/80 hover:text-white">
                    View All Feedback <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center mb-4">
                  <Target className="w-5 h-5 mr-2 text-indigo-400" />
                  Active Goals
                </h3>
                <div className="space-y-3">
                  {employee.developmentGoals
                    .filter(goal => goal.status !== 'completed')
                    .slice(0, 2)
                    .map(goal => renderGoalCard(goal))
                  }
                  <button className="w-full glass-button py-2 flex items-center justify-center text-white/80 hover:text-white">
                    View All Goals <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-400" />
                  Feedback History
                </h3>
                <button className="glass-button-primary px-4 py-1.5 rounded-lg text-sm flex items-center">
                  Request Feedback
                </button>
              </div>
              
              <div className="space-y-4">
                {employee.feedback.map(item => renderFeedbackCard(item))}
              </div>
            </div>
          )}
          
          {activeTab === 'goals' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-indigo-400" />
                  Development Goals
                </h3>
                <button className="glass-button-primary px-4 py-1.5 rounded-lg text-sm flex items-center">
                  Add New Goal
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employee.developmentGoals.map(goal => renderGoalCard(goal))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-indigo-400" />
                  Performance Review History
                </h3>
              </div>
              
              <div className="glass p-6 rounded-xl text-center">
                <Calendar className="w-16 h-16 text-indigo-400 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-white mb-2">Annual Performance Review</h4>
                <p className="text-white/70 mb-3">Your next review is scheduled for December 15, 2023</p>
                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  <button className="glass-button-primary px-4 py-2 rounded-lg text-sm">
                    Prepare Self-assessment
                  </button>
                  <button className="glass-button px-4 py-2 rounded-lg text-sm">
                    View Previous Reviews
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-white mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-indigo-400" />
                  Development Suggestions
                </h4>
                <div className="glass p-4 rounded-lg">
                  <p className="text-white/80 text-sm">Based on your performance metrics and feedback, you might benefit from focusing on:</p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white/70 text-sm">Advanced project management skills to handle larger team initiatives</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white/70 text-sm">Technical communication workshops to share complex information with non-technical stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white/70 text-sm">Leadership training to prepare for senior roles in the engineering department</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile; 