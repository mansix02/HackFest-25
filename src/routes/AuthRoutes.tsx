import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EmployeeProfile from '../components/EmployeeProfile';
import EmployeeLogin from '../components/EmployeeLogin';
import { LogIn } from 'lucide-react';

// Authentication context type
interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (employeeId: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create a context for authentication
export const AuthContext = React.createContext<AuthContextType | null>(null);

// Authentication provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = async (employeeId: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (employeeId === 'EMP123' && password === 'password') {
          const userData = {
            id: 'EMP123',
            name: 'Alex Johnson',
            role: 'employee',
            department: 'Engineering'
          };
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('auth_user', JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error('Invalid employee ID or password'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing stored auth data', err);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Login route component
const LoginRoute: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Get the previous location from state, or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // If already authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (employeeId: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await login(employeeId, password);
      // Login successful - will redirect due to isAuthenticated state change
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <EmployeeLogin 
        isOpen={true} 
        onClose={() => {}} 
        onLogin={handleLogin}
        fullPage={true}
        error={error}
      />
    </div>
  );
};

// Employee dashboard component
const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = React.useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <div className="glass-card p-6 rounded-xl max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl text-white font-semibold">
            Welcome, {user?.name} | Employee Dashboard
          </h1>
          <button 
            onClick={logout}
            className="glass-button-primary px-4 py-2 rounded-lg text-sm flex items-center"
          >
            <LogIn className="w-4 h-4 mr-2 rotate-180" />
            Logout
          </button>
        </div>
        
        <div className="rounded-xl overflow-hidden">
          <EmployeeProfile 
            isOpen={showProfile} 
            onClose={() => setShowProfile(false)} 
          />
        </div>
      </div>
    </div>
  );
};

// Main Auth Routes component
const AuthRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AuthRoutes; 