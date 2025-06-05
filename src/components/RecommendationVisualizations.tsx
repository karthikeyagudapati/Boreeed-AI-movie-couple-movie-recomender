
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample Data for Visualizations
const genreData = [
  { genre: 'Drama', user1: 4.2, user2: 3.8, count: 58 },
  { genre: 'Action', user1: 3.7, user2: 4.3, count: 43 },
  { genre: 'Comedy', user1: 3.9, user2: 4.1, count: 39 },
  { genre: 'Sci-Fi', user1: 4.5, user2: 3.6, count: 27 },
  { genre: 'Thriller', user1: 4.3, user2: 3.9, count: 31 },
  { genre: 'Horror', user1: 2.8, user2: 3.7, count: 19 },
  { genre: 'Romance', user1: 3.4, user2: 2.9, count: 22 },
  { genre: 'Adventure', user1: 4.0, user2: 4.2, count: 25 },
];

const algorithmData = [
  { method: 'Intersection', score: 4.3, fairness: 0.91, time: 0.42 },
  { method: 'Weighted', score: 4.1, fairness: 0.87, time: 0.38 },
  { method: 'Least Misery', score: 3.8, fairness: 0.76, time: 0.35 },
  { method: 'Hybrid', score: 4.5, fairness: 0.94, time: 0.51 },
];

const RecommendationVisualizations = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Recommendation Insights</h2>
      
      <Tabs defaultValue="genre">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="genre">Genre Analysis</TabsTrigger>
          <TabsTrigger value="algorithm">Algorithm Performance</TabsTrigger>
          <TabsTrigger value="venn">Preference Overlap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="genre" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Genre Preferences Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-semibold">Genre</th>
                      <th className="pb-3 font-semibold text-blue-600">User 1 Rating</th>
                      <th className="pb-3 font-semibold text-green-600">User 2 Rating</th>
                      <th className="pb-3 font-semibold">Compatibility</th>
                      <th className="pb-3 font-semibold">Movies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genreData.map((item, i) => {
                      const diff = Math.abs(item.user1 - item.user2);
                      const compatibility = 100 - (diff * 20); // Simple calculation for display
                      
                      return (
                        <tr key={i} className="border-b">
                          <td className="py-3 font-medium">{item.genre}</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="bg-blue-100 h-4 rounded-sm" style={{ width: `${item.user1 * 16}px` }} />
                              <span className="ml-2">{item.user1.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="bg-green-100 h-4 rounded-sm" style={{ width: `${item.user2 * 16}px` }} />
                              <span className="ml-2">{item.user2.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div 
                              className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                                compatibility >= 80 
                                  ? 'bg-green-100 text-green-800' 
                                  : compatibility >= 60 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {compatibility}%
                            </div>
                          </td>
                          <td className="py-3">{item.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Insights</h4>
                <ul className="space-y-1 text-sm text-gray-700 list-disc pl-4">
                  <li>Both users share high ratings for <span className="font-medium">Adventure</span> and <span className="font-medium">Drama</span> genres</li>
                  <li>User 1 favors <span className="font-medium">Sci-Fi</span> much more than User 2</li>
                  <li>User 2 prefers <span className="font-medium">Horror</span> while User 1 doesn't enjoy it</li>
                  <li>Recommended focus: <span className="font-medium">Action-Drama</span> combinations for highest joint enjoyment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="algorithm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Algorithm Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {algorithmData.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.method} Method</span>
                        <span className="text-gray-500 text-sm">Score: {item.score.toFixed(1)}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            item.method === 'Hybrid' ? 'bg-purple-500' : 
                            item.method === 'Intersection' ? 'bg-blue-500' :
                            item.method === 'Weighted' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} 
                          style={{ width: `${(item.score / 5) * 100}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Fairness: {(item.fairness * 100).toFixed(0)}%</span>
                        <span>Processing time: {item.time.toFixed(2)}s</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Algorithm Comparison</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">Hybrid</div>
                      <div className="text-sm text-gray-500">Best Overall</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">Intersection</div>
                      <div className="text-sm text-gray-500">Best Quality</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Weighted</div>
                      <div className="text-sm text-gray-500">Most Balanced</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Algorithm Insights</h4>
                    <ul className="space-y-1 text-sm text-gray-700 list-disc pl-4">
                      <li><span className="font-medium">Hybrid method</span> delivered the best results for this user pair</li>
                      <li><span className="font-medium">Intersection method</span> found fewer but higher quality recommendations</li>
                      <li><span className="font-medium">Weighted approach</span> was faster but slightly less accurate</li>
                      <li><span className="font-medium">Least misery</span> ensured no user was completely dissatisfied</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="venn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Preference Overlap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {/* SVG Venn Diagram */}
                <svg width="400" height="300" viewBox="0 0 400 300">
                  {/* User 1 Circle */}
                  <circle cx="150" cy="150" r="100" fill="#3b82f6" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                  {/* User 2 Circle */}
                  <circle cx="250" cy="150" r="100" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
                  
                  {/* Labels */}
                  <text x="100" y="150" textAnchor="middle" fill="#1e40af" fontWeight="bold">User 1</text>
                  <text x="300" y="150" textAnchor="middle" fill="#047857" fontWeight="bold">User 2</text>
                  <text x="200" y="150" textAnchor="middle" fill="#4f46e5" fontWeight="bold">Common</text>
                  
                  {/* Statistics */}
                  <text x="100" y="170" textAnchor="middle" fill="#1e40af">42 unique</text>
                  <text x="300" y="170" textAnchor="middle" fill="#047857">38 unique</text>
                  <text x="200" y="170" textAnchor="middle" fill="#4f46e5">29 shared</text>
                </svg>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full max-w-md">
                  <h4 className="font-semibold mb-2">Preference Overlap Analysis</h4>
                  <ul className="space-y-1 text-sm text-gray-700 list-disc pl-4">
                    <li>Users share <span className="font-medium">26.6%</span> of their movie preferences</li>
                    <li>Common genres: <span className="font-medium">Drama, Action, Adventure</span></li>
                    <li>Most divergent preferences: <span className="font-medium">Horror, Romance</span></li>
                    <li>Compatibility score places this pair in the <span className="font-medium">top 30%</span> of all user pairs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendationVisualizations;
