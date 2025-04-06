import React, { useState } from 'react';
import { Lock, User, EyeOff, Eye, LogIn, AlertCircle } from 'lucide-react';

interface EmployeeLoginProps {
  onLogin: (employeeId: string, password: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  fullPage?: boolean; // Optional prop for using as a standalone page
  error?: string | null; // Optional error from parent
}

const EmployeeLogin: React.FC<EmployeeLoginProps> = ({ 
  onLogin, 
  isOpen, 
  onClose, 
  fullPage = false,
  error: externalError = null
}) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use external error if provided
  const displayError = externalError || error;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !password) {
      setError('Please enter both employee ID and password');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await onLogin(employeeId, password);
      // Login successful - onLogin will handle navigation
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setEmployeeId('');
    setPassword('');
    setShowPassword(false);
    setError(null);
  };
  
  // If closed and not fullPage, don't render
  if (!isOpen && !fullPage) return null;
  
  const loginForm = (
    <div className="relative p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Employee Login</h2>
        <p className="text-white/60 text-sm">Enter your credentials to access the system</p>
      </div>
      
      {displayError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center text-sm text-white">
          <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
          {displayError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-white/80 mb-1">
              Employee ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-indigo-400" />
              </div>
              <input
                id="employeeId"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="glass-input w-full pl-10 pr-3 py-2 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Enter your employee ID"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-indigo-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full pl-10 pr-10 py-2 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-white/60 hover:text-white/80 transition-colors" />
                ) : (
                  <Eye className="w-4 h-4 text-white/60 hover:text-white/80 transition-colors" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded bg-white/10 border-white/20"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button-primary py-2 rounded-lg flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-colors relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          Need help? <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Contact support</a>
        </p>
      </div>
    </div>
  );
  
  // If in fullPage mode, render differently
  if (fullPage) {
    return (
      <div className="glass-card rounded-xl overflow-hidden animate-scale-in w-full max-w-md">
        {/* Shimmering border effect */}
        <div className="absolute inset-0 animated-gradient opacity-10"></div>
        
        {/* Cosmic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-600/30 rounded-full filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/20 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {loginForm}
      </div>
    );
  }
  
  // Modal version
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Login modal */}
      <div className="relative z-10 w-full max-w-md glass-card rounded-xl overflow-hidden animate-scale-in">
        {/* Shimmering border effect */}
        <div className="absolute inset-0 animated-gradient opacity-10"></div>
        
        {/* Cosmic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-600/30 rounded-full filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/20 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {loginForm}
      </div>
    </div>
  );
};

export default EmployeeLogin; 