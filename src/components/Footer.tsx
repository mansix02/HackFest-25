import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  HelpCircle, 
  FileText, 
  Shield, 
  Target, 
  MessageSquare, 
  User 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/10 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Performance Tracker</h3>
            <p className="text-white/70 text-sm mb-4">
              Empowering organizations to track, analyze, and improve employee performance with real-time metrics and insights.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/goals" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Goals
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-white/70 text-sm flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                support@performancetracker.com
              </li>
              <li className="text-white/70 text-sm">
                123 Performance Street<br />
                Suite 456<br />
                San Francisco, CA 94107
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} Performance Tracker. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/50 hover:text-white/70 text-xs transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/50 hover:text-white/70 text-xs transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/50 hover:text-white/70 text-xs transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 