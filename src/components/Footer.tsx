import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
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
    </footer>
  );
};

export default Footer; 