
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RecommendationVisualizations: React.FC = () => {
  // Sample data for visualizations
  const genreData = [
    { name: 'Action', count: 45, percentage: 25 },
    { name: 'Drama', count: 38, percentage: 21 },
    { name: 'Comedy', count: 32, percentage: 18 },
    { name: 'Thriller', count: 28, percentage: 16 },
    { name: 'Sci-Fi', count: 22, percentage: 12 },
    { name: 'Romance', count: 15, percentage: 8 }
  ];

  const platformData = [
    { name: 'Netflix', movies: 4200, shows: 2100, total: 6300 },
    { name: 'Prime', movies: 3800, shows: 1900, total: 5700 },
    { name: 'Disney+', movies: 2200, shows: 800, total: 3000 },
    { name: 'HBO Max', movies: 1800, shows: 900, total: 2700 },
    { name: 'Hulu', movies: 1500, shows: 1200, total: 2700 }
  ];

  const userOverlapData = [
    { name: 'User 1', value: 42, color: '#ef4444' },
    { name: 'Common', value: 29, color: '#dc2626' },
    { name: 'User 2', value: 38, color: '#b91c1c' }
  ];

  const COLORS = ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];

  return (
    <div className="w-full space-y-4">
      {/* Mobile-optimized grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Genre Analysis - Mobile Optimized */}
        <div className="bg-gray-800/80 p-3 sm:p-4 rounded-lg border border-gray-700">
          <h4 className="font-semibold mb-3 text-green-400 text-sm sm:text-base">Genre Analysis</h4>
          <div className="h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Statistics - Mobile Optimized */}
        <div className="bg-gray-800/80 p-3 sm:p-4 rounded-lg border border-gray-700">
          <h4 className="font-semibold mb-3 text-blue-400 text-sm sm:text-base">Platform Content Count</h4>
          <div className="h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* User Preference Overlap - Full Width on Mobile */}
      <div className="bg-gray-800/80 p-3 sm:p-4 rounded-lg border border-gray-700">
        <h4 className="font-semibold mb-3 text-purple-400 text-sm sm:text-base">User Preference Overlap</h4>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="w-full lg:w-1/2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userOverlapData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelStyle={{ fontSize: '10px', fill: '#fff' }}
                >
                  {userOverlapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    fontSize: '12px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2 space-y-2">
            <div className="text-xs sm:text-sm text-gray-300">
              <h5 className="font-semibold mb-2">Preference Overlap Analysis</h5>
              <ul className="space-y-1">
                <li>• Users share <span className="text-red-400 font-semibold">26.6%</span> of their movie preferences</li>
                <li>• Common genres: <span className="text-blue-400">Drama, Action, Comedy</span></li>
                <li>• Recommendation accuracy: <span className="text-green-400">94.2%</span></li>
                <li>• Cross-platform compatibility: <span className="text-purple-400">89.1%</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Performance Metrics - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-lg sm:text-xl font-bold text-green-400">94.2%</div>
          <div className="text-xs text-gray-400">Match Accuracy</div>
        </div>
        <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-lg sm:text-xl font-bold text-blue-400">1.2s</div>
          <div className="text-xs text-gray-400">Response Time</div>
        </div>
        <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-lg sm:text-xl font-bold text-purple-400">6,847</div>
          <div className="text-xs text-gray-400">Movies Analyzed</div>
        </div>
        <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-lg sm:text-xl font-bold text-yellow-400">98.7%</div>
          <div className="text-xs text-gray-400">User Satisfaction</div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationVisualizations;
