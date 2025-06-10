
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, Film, Target } from 'lucide-react';

const RecommendationVisualizations: React.FC = () => {
  // Mock data for visualization
  const genreData = [
    { name: 'Action', value: 35, color: '#ef4444' },
    { name: 'Comedy', value: 25, color: '#f59e0b' },
    { name: 'Drama', value: 20, color: '#3b82f6' },
    { name: 'Sci-Fi', value: 12, color: '#10b981' },
    { name: 'Horror', value: 8, color: '#8b5cf6' },
  ];

  const platformData = [
    { platform: 'Netflix', movies: 120, match: 78 },
    { platform: 'Prime Video', movies: 95, match: 72 },
    { platform: 'Disney+', movies: 85, match: 68 },
    { platform: 'HBO Max', movies: 75, match: 65 },
  ];

  const matchData = [
    { range: '90-100%', count: 15 },
    { range: '80-89%', count: 28 },
    { range: '70-79%', count: 42 },
    { range: '60-69%', count: 35 },
    { range: '50-59%', count: 20 },
  ];

  const stats = [
    { icon: Film, label: 'Total Movies', value: '1000+', color: 'text-blue-400' },
    { icon: Users, label: 'User Profiles', value: '4', color: 'text-green-400' },
    { icon: Target, label: 'Avg Match', value: '78%', color: 'text-yellow-400' },
    { icon: TrendingUp, label: 'Success Rate', value: '92%', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genre Distribution */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Genre Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Analysis */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Platform Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="platform" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="movies" fill="#3b82f6" />
                  <Bar dataKey="match" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match Score Distribution - Mobile Responsive Table */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Match Score Distribution</h3>
          
          {/* Mobile: Stack cards */}
          <div className="lg:hidden space-y-3">
            {matchData.map((item, index) => (
              <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{item.range}</span>
                  <Badge className="bg-blue-600 text-white">{item.count} movies</Badge>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop: Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Match Range</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Movie Count</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {matchData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4 text-white">{item.range}</td>
                      <td className="py-3 px-4 text-gray-300">{item.count}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-600 text-white">
                          {Math.round((item.count / 140) * 100)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationVisualizations;
