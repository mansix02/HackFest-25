import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ChevronRight, 
  ExternalLink,
  MessageCircle,
  HelpCircle,
  FileText,
  Shield,
  Sparkles,
  TrendingUp,
  Brain,
  BarChart3,
  Award,
  ArrowRight,
  AlertCircle,
  InfoIcon,
  LogIn,
  User
} from 'lucide-react';
import EmployeeLogin from './EmployeeLogin';
import EmployeeProfile from './EmployeeProfile';

// Mock ML prediction service - in a real app, this would call your backend API
const predictPerformanceIncrease = (
  currentPerformance: number,
  workHours: number,
  learningHours: number,
  feedbackScore: number
): number => {
  // Simple weighted model (this would be a real ML model in production)
  const baseImprovement = 0.5; // Everyone improves at least 0.5% by default
  const workEffect = workHours * 0.2; // Each hour of work contributes 0.2%
  const learningEffect = learningHours * 0.5; // Each hour of learning contributes 0.5%
  const feedbackEffect = feedbackScore * 0.3; // Feedback score (0-10) contributes proportionally
  
  // Performance ceiling effect - harder to improve when already high
  const ceilingFactor = 1 - (currentPerformance / 150); // Diminishing returns above 75%
  
  const predictedImprovement = (baseImprovement + workEffect + learningEffect + feedbackEffect) * ceilingFactor;
  return Math.min(Math.round(predictedImprovement * 10) / 10, 15); // Cap at 15% and round to 1 decimal
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Performance prediction state
  const [showPredictionTool, setShowPredictionTool] = useState(false);
  const [currentPerformance, setCurrentPerformance] = useState(75);
  const [workHours, setWorkHours] = useState(40);
  const [learningHours, setLearningHours] = useState(5);
  const [feedbackScore, setFeedbackScore] = useState(7);
  const [predictedIncrease, setPredictedIncrease] = useState(0);
  const [salaryIncrease, setSalaryIncrease] = useState(0);
  
  // Handle login
  const handleLogin = async (employeeId: string, password: string) => {
    // In a real app, you would call your auth service here
    console.log('Login attempt:', { employeeId, password });
    
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - in a real app, this would be your API authentication
        if (employeeId === 'EMP123' && password === 'password') {
          setShowLoginModal(false);
          setIsLoggedIn(true);
          setShowProfileModal(true);
          resolve();
          // In a real app, you would set the auth state and redirect
        } else {
          reject(new Error('Invalid employee ID or password'));
        }
      }, 1000);
    });
  };
  
  // Calculate prediction when inputs change
  useEffect(() => {
    const increase = predictPerformanceIncrease(
      currentPerformance,
      workHours,
      learningHours,
      feedbackScore
    );
    setPredictedIncrease(increase);
    
    // Calculate predicted salary increase based on performance increase
    // This is a simple model: 1% performance increase = 0.5% salary increase
    const predictedSalaryIncrease = Math.round(increase * 0.5 * 10) / 10;
    setSalaryIncrease(predictedSalaryIncrease);
  }, [currentPerformance, workHours, learningHours, feedbackScore]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription state after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };
  
  return (
    <footer className="relative glass-darker w-full py-8 mt-auto overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated aurora effect */}
        <div className="absolute inset-0 aurora-effect opacity-40"></div>
        
        {/* Enhanced orbs */}
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 -right-8 w-64 h-64 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        
        {/* Enhanced star field background with different sizes */}
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
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
        
        {/* Medium stars with glow */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`medium-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 3px 1px rgba(255, 255, 255, 0.4)',
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
        
        {/* Shooting stars */}
        <div className="absolute w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent top-[20%] right-[10%] animate-shooting-star"></div>
        <div className="absolute w-[150px] h-[1px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent top-[60%] left-[5%] animate-shooting-star animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cosmic section divider */}
        <div className="w-full max-w-xs mx-auto h-0.5 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Employee Login/Profile Button */}
        <div className="text-center mb-8">
          {isLoggedIn ? (
            <button 
              onClick={() => setShowProfileModal(true)}
              className="glass-button-primary px-5 py-2 rounded-lg inline-flex items-center bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-500 hover:to-purple-500 transition-colors group"
            >
              <User className="w-4 h-4 mr-2" />
              View Employee Profile
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="glass-button-primary px-5 py-2 rounded-lg inline-flex items-center bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-500 hover:to-purple-500 transition-colors group"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Employee Login
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          )}
        </div>
        
        {/* ML Performance Prediction Tool */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-flex items-center">
              <Brain className="w-6 h-6 mr-2 text-indigo-400" />
              AI Performance Predictor
            </h2>
            <p className="text-white/70 mt-2 max-w-2xl mx-auto">
              Our advanced ML algorithm predicts your performance improvement and potential salary increase based on key metrics.
            </p>
          </div>
          
          <div className={`glass-card rounded-xl backdrop-blur-xl border border-white/10 shadow-xl shadow-indigo-500/5 transition-all duration-500 overflow-hidden ${showPredictionTool ? 'max-h-[800px]' : 'max-h-20'}`}>
            <div 
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => setShowPredictionTool(!showPredictionTool)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Performance Prediction Tool</h3>
                  <p className="text-white/60 text-sm">Calculate your potential growth and rewards</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-white/70 transition-transform duration-300 ${showPredictionTool ? 'rotate-90' : ''}`} />
            </div>
            
            <div className="px-4 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1.5">
                      Current Performance Score (%)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="30"
                        max="98"
                        value={currentPerformance}
                        onChange={(e) => setCurrentPerformance(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        aria-label="Current Performance Score"
                        title="Current Performance Score"
                      />
                      <span className="ml-3 w-10 text-center text-indigo-300">{currentPerformance}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1.5">
                      Work Hours per Week
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="20"
                        max="60"
                        value={workHours}
                        onChange={(e) => setWorkHours(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        aria-label="Work Hours per Week"
                        title="Work Hours per Week"
                      />
                      <span className="ml-3 w-10 text-center text-indigo-300">{workHours}h</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1.5">
                      Learning Hours per Week
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={learningHours}
                        onChange={(e) => setLearningHours(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        aria-label="Learning Hours per Week"
                        title="Learning Hours per Week"
                      />
                      <span className="ml-3 w-10 text-center text-indigo-300">{learningHours}h</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1.5">
                      Average Feedback Score (0-10)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={feedbackScore}
                        onChange={(e) => setFeedbackScore(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        aria-label="Average Feedback Score"
                        title="Average Feedback Score"
                      />
                      <span className="ml-3 w-10 text-center text-indigo-300">{feedbackScore}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-5 flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h4 className="text-white font-medium mb-1">AI Prediction Results</h4>
                    <p className="text-white/60 text-sm">Based on machine learning analysis</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/80 text-sm">Predicted Performance Increase</span>
                        <span className="text-white font-medium text-lg">{predictedIncrease}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                          style={{ width: `${Math.min(predictedIncrease * 6.66, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-white/40 text-xs">0%</span>
                        <span className="text-white/40 text-xs">15%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/80 text-sm">Potential Salary Increase</span>
                        <span className="text-white font-medium text-lg">{salaryIncrease}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" 
                          style={{ width: `${Math.min(salaryIncrease * 13.33, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-white/40 text-xs">0%</span>
                        <span className="text-white/40 text-xs">7.5%</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-3 flex items-start mt-2">
                      <InfoIcon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 mr-2" />
                      <p className="text-white/70 text-xs">
                        This AI prediction is based on historical performance data and company metrics. 
                        Individual results may vary based on additional factors. 
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 ml-1 inline-flex items-center">
                          Learn more <ArrowRight className="w-3 h-3 ml-0.5" />
                        </a>
                      </p>
                    </div>
                    
                    <div className="text-center pt-2">
                      <button className="glass-button-primary px-4 py-2 text-sm">
                        <Award className="w-4 h-4 mr-1.5 inline" />
                        View Detailed Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company section */}
          <div className="glass p-5 rounded-xl backdrop-blur-lg border border-white/10 transform transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-white text-lg font-medium mb-4 flex items-center">
              <Sparkles size={16} className="text-indigo-400 mr-2 animate-pulse" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Your Company</span>
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Elevating performance management through cosmic innovation and data-driven insights.
            </p>
            <div className="flex space-x-3">
              {/* Social Media Links */}
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-indigo-300 hover:bg-indigo-900/30 transition-colors hover:shadow-lg hover:shadow-indigo-500/20">
                <Github size={16} />
              </a>
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-purple-300 hover:bg-purple-900/30 transition-colors hover:shadow-lg hover:shadow-purple-500/20">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-blue-300 hover:bg-blue-900/30 transition-colors hover:shadow-lg hover:shadow-blue-500/20">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/70 hover:text-pink-300 hover:bg-pink-900/30 transition-colors hover:shadow-lg hover:shadow-pink-500/20">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="glass p-5 rounded-xl backdrop-blur-lg border border-white/10 transform transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-indigo-300 transition-colors flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-indigo-400" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-purple-300 transition-colors flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-purple-400" />
                  Performance Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-blue-300 transition-colors flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-blue-400" />
                  Feedback System
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-pink-300 transition-colors flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-pink-400" />
                  Goals Tracker
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="glass p-5 rounded-xl backdrop-blur-lg border border-white/10 transform transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-indigo-300 transition-colors flex items-center group">
                  <FileText size={14} className="mr-2 text-indigo-400" />
                  Documentation
                  <ExternalLink size={12} className="ml-1.5 text-white/50 group-hover:text-indigo-400/70" />
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-purple-300 transition-colors flex items-center group">
                  <HelpCircle size={14} className="mr-2 text-purple-400" />
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-blue-300 transition-colors flex items-center group">
                  <MessageCircle size={14} className="mr-2 text-blue-400" />
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-pink-300 transition-colors flex items-center group">
                  <Shield size={14} className="mr-2 text-pink-400" />
                  Security
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="glass p-5 rounded-xl backdrop-blur-lg border border-white/10 transform transition-transform hover:scale-[1.02] duration-300">
            <h3 className="text-white text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            {subscribed ? (
              <div className="glass p-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-sm flex items-center justify-center animate-pulse">
                <Mail className="w-4 h-4 mr-2 text-indigo-400" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="glass-input text-sm rounded-l-lg px-3 py-2 flex-grow focus:z-10 border-indigo-500/30 focus:border-indigo-500/50 focus:ring-indigo-500/30"
                  required
                />
                <button
                  type="submit"
                  className="glass-button-primary rounded-r-lg rounded-l-none px-3 py-2 flex items-center justify-center bg-gradient-to-r from-indigo-500/70 to-purple-500/70 hover:from-indigo-500/90 hover:to-purple-500/90 relative overflow-hidden group"
                  aria-label="Subscribe to newsletter"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="pt-6 border-t border-indigo-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-white/70">
                &copy; {currentYear} Your Company. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-indigo-300 transition-colors duration-200 text-sm relative group">
                Privacy Policy
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-white/70 hover:text-purple-300 transition-colors duration-200 text-sm relative group">
                Terms of Service
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-200 text-sm relative group">
                Contact Us
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <EmployeeLogin 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      
      {/* Employee Profile Modal */}
      <EmployeeProfile
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </footer>
  );
};

export default Footer; 