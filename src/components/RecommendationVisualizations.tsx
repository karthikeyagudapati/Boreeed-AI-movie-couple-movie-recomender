
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

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
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const themeClasses = isDarkTheme ? "text-white" : "text-gray-900";
  const cardClasses = isDarkTheme ? "bg-gray-800/70 border-gray-700" : "bg-white border-gray-200";
  const tabsClasses = isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-200";
  const tableHeaderClasses = isDarkTheme ? "border-gray-600" : "border-gray-300";
  const tableRowClasses = isDarkTheme ? "border-gray-700" : "border-gray-200";
  const insightsBgClasses = isDarkTheme ? "bg-gray-700/50" : "bg-gray-100";

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${themeClasses}`}>Recommendation Analytics</h2>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch 
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
          />
          <Moon className="h-4 w-4" />
        </div>
      </div>
      
      <Tabs defaultValue="genre">
        <TabsList className={`grid grid-cols-3 mb-6 ${tabsClasses}`}>
          <TabsTrigger value="genre" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Genre Analysis</TabsTrigger>
          <TabsTrigger value="algorithm" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Algorithm Performance</TabsTrigger>
          <TabsTrigger value="venn" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Preference Overlap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="genre" className="space-y-6">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle className={themeClasses}>Genre Preferences Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className={`text-left border-b ${tableHeaderClasses}`}>
                      <th className={`pb-3 font-semibold ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>Genre</th>
                      <th className="pb-3 font-semibold text-red-400">User 1 Rating</th>
                      <th className="pb-3 font-semibold text-red-400">User 2 Rating</th>
                      <th className={`pb-3 font-semibold ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>Compatibility</th>
                      <th className={`pb-3 font-semibold ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>Movies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genreData.map((item, i) => {
                      const diff = Math.abs(item.user1 - item.user2);
                      const compatibility = 100 - (diff * 20);
                      
                      return (
                        <tr key={i} className={`border-b ${tableRowClasses}`}>
                          <td className={`py-3 font-medium ${themeClasses}`}>{item.genre}</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="bg-red-600 h-4 rounded-sm" style={{ width: `${item.user1 * 16}px` }} />
                              <span className={`ml-2 ${themeClasses}`}>{item.user1.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="bg-red-500 h-4 rounded-sm" style={{ width: `${item.user2 * 16}px` }} />
                              <span className={`ml-2 ${themeClasses}`}>{item.user2.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div 
                              className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                                compatibility >= 80 
                                  ? 'bg-green-600 text-white' 
                                  : compatibility >= 60 
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-red-600 text-white'
                              }`}
                            >
                              {compatibility}%
                            </div>
                          </td>
                          <td className={`py-3 ${themeClasses}`}>{item.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className={`mt-6 p-4 rounded-lg ${insightsBgClasses}`}>
                <h4 className={`font-semibold mb-2 ${themeClasses}`}>Key Insights</h4>
                <ul className={`space-y-1 text-sm list-disc pl-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                  <li>Both users share high ratings for <span className="font-medium text-red-400">Adventure</span> and <span className="font-medium text-red-400">Drama</span> genres</li>
                  <li>User 1 favors <span className="font-medium text-red-400">Sci-Fi</span> much more than User 2</li>
                  <li>User 2 prefers <span className="font-medium text-red-400">Horror</span> while User 1 doesn't enjoy it</li>
                  <li>Recommended focus: <span className="font-medium text-red-400">Action-Drama</span> combinations for highest joint enjoyment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="algorithm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={themeClasses}>Algorithm Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {algorithmData.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`font-medium ${themeClasses}`}>{item.method} Method</span>
                        <span className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Score: {item.score.toFixed(1)}</span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkTheme ? "bg-gray-600" : "bg-gray-200"}`}>
                        <div 
                          className={`h-full ${
                            item.method === 'Hybrid' ? 'bg-red-600' : 
                            item.method === 'Intersection' ? 'bg-red-500' :
                            item.method === 'Weighted' ? 'bg-red-400' : 'bg-red-300'
                          }`} 
                          style={{ width: `${(item.score / 5) * 100}%` }} 
                        />
                      </div>
                      <div className={`flex justify-between text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
                        <span>Fairness: {(item.fairness * 100).toFixed(0)}%</span>
                        <span>Processing time: {item.time.toFixed(2)}s</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={themeClasses}>Algorithm Comparison</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-400">Hybrid</div>
                      <div className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Best Overall</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">Intersection</div>
                      <div className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Best Quality</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">Weighted</div>
                      <div className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Most Balanced</div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${insightsBgClasses}`}>
                    <h4 className={`font-semibold mb-2 ${themeClasses}`}>Algorithm Insights</h4>
                    <ul className={`space-y-1 text-sm list-disc pl-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                      <li><span className="font-medium text-red-400">Hybrid method</span> delivered the best results for this user pair</li>
                      <li><span className="font-medium text-red-400">Intersection method</span> found fewer but higher quality recommendations</li>
                      <li><span className="font-medium text-red-400">Weighted approach</span> was faster but slightly less accurate</li>
                      <li><span className="font-medium text-red-400">Least misery</span> ensured no user was completely dissatisfied</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="venn" className="space-y-6">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle className={themeClasses}>User Preference Overlap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <svg width="400" height="300" viewBox="0 0 400 300">
                  <circle cx="150" cy="150" r="100" fill="#dc2626" fillOpacity="0.6" stroke="#dc2626" strokeWidth="2" />
                  <circle cx="250" cy="150" r="100" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" strokeWidth="2" />
                  
                  <text x="100" y="150" textAnchor="middle" fill="white" fontWeight="bold">User 1</text>
                  <text x="300" y="150" textAnchor="middle" fill="white" fontWeight="bold">User 2</text>
                  <text x="200" y="150" textAnchor="middle" fill="white" fontWeight="bold">Common</text>
                  
                  <text x="100" y="170" textAnchor="middle" fill="white">42 unique</text>
                  <text x="300" y="170" textAnchor="middle" fill="white">38 unique</text>
                  <text x="200" y="170" textAnchor="middle" fill="white">29 shared</text>
                </svg>
                
                <div className={`mt-6 p-4 rounded-lg w-full max-w-md ${insightsBgClasses}`}>
                  <h4 className={`font-semibold mb-2 ${themeClasses}`}>Preference Overlap Analysis</h4>
                  <ul className={`space-y-1 text-sm list-disc pl-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                    <li>Users share <span className="font-medium text-red-400">26.6%</span> of their movie preferences</li>
                    <li>Common genres: <span className="font-medium text-red-400">Drama, Action, Adventure</span></li>
                    <li>Most divergent preferences: <span className="font-medium text-red-400">Horror, Romance</span></li>
                    <li>Compatibility score places this pair in the <span className="font-medium text-red-400">top 30%</span> of all user pairs</li>
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
