import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp, 
  User, 
  BarChart2,
  ChevronRight
} from 'lucide-react';
import { getAllEmployees, getAllFeedbacks, subscribeToPerformanceMetrics } from '../services/realtimeDbService';
import { Employee, Feedback, PerformanceMetric } from '../types/models';

interface LeaderboardEntry {
  id: string;
  name: string;
  department: string;
  position: string;
  score: number;
  metrics: {
    productivity: number;
    quality: number;
    attendance: number;
    teamwork: number;
  };
  feedbackRating: number;
  feedbackCount: number;
}

interface LeaderboardProps {
  limit?: number;
  showDetails?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  limit = 10, 
  showDetails = false,
  variant = 'default'
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all employees
        const employees = await getAllEmployees();
        
        // Fetch all feedbacks
        const feedbacks = await getAllFeedbacks();
        
        // Process data to create leaderboard entries
        const leaderboardData: LeaderboardEntry[] = employees.map(employee => {
          // Get feedbacks for this employee
          const employeeFeedbacks = feedbacks.filter(f => f.employeeId === employee.id);
          
          // Calculate average feedback rating
          const feedbackRating = employeeFeedbacks.length > 0
            ? employeeFeedbacks.reduce((sum, f) => sum + f.rating, 0) / employeeFeedbacks.length
            : 0;
          
          // Get performance metrics from employee data
          const metrics = {
            productivity: employee.metrics?.productivity || 0,
            quality: employee.metrics?.quality || 0,
            attendance: employee.metrics?.attendance || 0,
            teamwork: employee.metrics?.teamwork || 0
          };
          
          // Calculate overall score (weighted average of metrics and feedback)
          const metricsScore = (metrics.productivity + metrics.quality + metrics.attendance + metrics.teamwork) / 4;
          const overallScore = (metricsScore * 0.7) + (feedbackRating * 0.3);
          
          return {
            id: employee.id,
            name: employee.name,
            department: employee.department,
            position: employee.position,
            score: overallScore,
            metrics,
            feedbackRating,
            feedbackCount: employeeFeedbacks.length
          };
        });
        
        // Sort by score (highest first)
        const sortedEntries = leaderboardData.sort((a, b) => b.score - a.score);
        
        // Apply limit
        const limitedEntries = sortedEntries.slice(0, limit);
        
        setEntries(limitedEntries);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [limit]);

  // Get rank icon based on position
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-indigo-400" />;
    }
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-indigo-400';
    if (score >= 60) return 'text-purple-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="text-center text-white/70">
          <p>No data available for the leaderboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass p-${variant === 'compact' ? '3' : '6'} rounded-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          Top Performers
        </h2>
        {variant !== 'compact' && (
          <div className="text-sm text-white/60">
            Based on performance metrics and feedback
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div 
            key={entry.id} 
            className={`glass p-${variant === 'compact' ? '2' : '4'} rounded-lg flex items-center justify-between hover:bg-white/5 transition-colors`}
          >
            <div className="flex items-center">
              <div className="mr-3">
                {getRankIcon(index + 1)}
              </div>
              <div>
                <div className="font-medium text-white">{entry.name}</div>
                {variant !== 'compact' && (
                  <div className="text-xs text-white/60">
                    {entry.department} • {entry.position}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`text-lg font-bold ${getScoreColor(entry.score)}`}>
                {Math.round(entry.score)}%
              </div>
              
              {showDetails && (
                <ChevronRight className="w-4 h-4 ml-2 text-white/40" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showDetails && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {entries.map((entry, index) => (
              <div key={`details-${entry.id}`} className="glass p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="mr-2">{getRankIcon(index + 1)}</div>
                  <div className="font-medium text-white">{entry.name}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Productivity</span>
                    <span className="text-white">{entry.metrics.productivity}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-blue-400 h-1.5 rounded-full" 
                      style={{ width: `${entry.metrics.productivity}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Quality</span>
                    <span className="text-white">{entry.metrics.quality}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-green-400 h-1.5 rounded-full" 
                      style={{ width: `${entry.metrics.quality}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Attendance</span>
                    <span className="text-white">{entry.metrics.attendance}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-purple-400 h-1.5 rounded-full" 
                      style={{ width: `${entry.metrics.attendance}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Teamwork</span>
                    <span className="text-white">{entry.metrics.teamwork}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-400 h-1.5 rounded-full" 
                      style={{ width: `${entry.metrics.teamwork}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-white/70">Feedback Rating</span>
                    <span className="text-white">{entry.feedbackRating.toFixed(1)}/5 ({entry.feedbackCount} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard; 