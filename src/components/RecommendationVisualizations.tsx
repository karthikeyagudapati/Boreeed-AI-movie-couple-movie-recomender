
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  const insightsBgClasses = isDarkTheme ? "bg-gray-700/50" : "bg-gray-100";

  return (
    <div className="space-y-4 sm:space-y-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses}`}>Recommendation Analytics</h2>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-600/40">
          <Sun className={`h-5 w-5 ${isDarkTheme ? 'text-gray-400' : 'text-yellow-500'}`} />
          <Switch 
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
          />
          <Moon className={`h-5 w-5 ${isDarkTheme ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
      </div>
      
      <Tabs defaultValue="genre" className="w-full">
        <TabsList className={`grid grid-cols-3 mb-4 sm:mb-6 w-full ${tabsClasses}`}>
          <TabsTrigger value="genre" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-xs sm:text-sm">Genre Analysis</TabsTrigger>
          <TabsTrigger value="algorithm" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-xs sm:text-sm">Algorithm Performance</TabsTrigger>
          <TabsTrigger value="venn" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-xs sm:text-sm">Preference Overlap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="genre" className="space-y-4 sm:space-y-6 w-full">
          <Card className={cardClasses}>
            <CardHeader className="pb-4">
              <CardTitle className={`${themeClasses} text-lg sm:text-xl`}>Genre Preferences Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              {/* Mobile-first responsive design with horizontal scroll */}
              <div className="w-full">
                {/* Mobile Card Layout */}
                <div className="block md:hidden space-y-3">
                  {genreData.map((item, i) => {
                    const diff = Math.abs(item.user1 - item.user2);
                    const compatibility = 100 - (diff * 20);
                    
                    return (
                      <div key={i} className={`p-4 rounded-lg border ${isDarkTheme ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className={`font-semibold ${themeClasses}`}>{item.genre}</h4>
                          <div 
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              compatibility >= 80 
                                ? 'bg-green-600 text-white' 
                                : compatibility >= 60 
                                ? 'bg-yellow-600 text-white'
                                : 'bg-red-600 text-white'
                            }`}
                          >
                            {compatibility}%
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>User 1:</span>
                            <div className="flex items-center gap-2">
                              <div className="bg-red-600 h-2 rounded-sm" style={{ width: `${Math.max(20, item.user1 * 12)}px` }} />
                              <span className={`text-sm ${themeClasses}`}>{item.user1.toFixed(1)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>User 2:</span>
                            <div className="flex items-center gap-2">
                              <div className="bg-red-500 h-2 rounded-sm" style={{ width: `${Math.max(20, item.user2 * 12)}px` }} />
                              <span className={`text-sm ${themeClasses}`}>{item.user2.toFixed(1)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>Movies:</span>
                            <span className={`text-sm ${themeClasses}`}>{item.count}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:block w-full border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader className="sticky top-0 bg-gray-800/90 backdrop-blur-sm">
                        <TableRow className="border-gray-600 hover:bg-transparent">
                          <TableHead className={`font-semibold ${isDarkTheme ? "text-gray-300" : "text-gray-700"} py-3 px-4`}>Genre</TableHead>
                          <TableHead className="font-semibold text-red-400 py-3 px-4">User 1 Rating</TableHead>
                          <TableHead className="font-semibold text-red-400 py-3 px-4">User 2 Rating</TableHead>
                          <TableHead className={`font-semibold ${isDarkTheme ? "text-gray-300" : "text-gray-700"} py-3 px-4`}>Compatibility</TableHead>
                          <TableHead className={`font-semibold ${isDarkTheme ? "text-gray-300" : "text-gray-700"} py-3 px-4`}>Movies</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {genreData.map((item, i) => {
                          const diff = Math.abs(item.user1 - item.user2);
                          const compatibility = 100 - (diff * 20);
                          
                          return (
                            <TableRow key={i} className={`border-gray-700 hover:bg-gray-700/30 ${isDarkTheme ? "bg-gray-800/20" : "bg-white"}`}>
                              <TableCell className={`font-medium ${themeClasses} py-3 px-4`}>{item.genre}</TableCell>
                              <TableCell className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="bg-red-600 h-3 rounded-sm flex-shrink-0" style={{ width: `${Math.max(20, item.user1 * 12)}px` }} />
                                  <span className={`text-sm ${themeClasses}`}>{item.user1.toFixed(1)}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="bg-red-500 h-3 rounded-sm flex-shrink-0" style={{ width: `${Math.max(20, item.user2 * 12)}px` }} />
                                  <span className={`text-sm ${themeClasses}`}>{item.user2.toFixed(1)}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-3 px-4">
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
                              </TableCell>
                              <TableCell className={`py-3 px-4 ${themeClasses}`}>{item.count}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              
              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg ${insightsBgClasses}`}>
                <h4 className={`font-semibold mb-2 ${themeClasses} text-sm sm:text-base`}>Key Insights</h4>
                <ul className={`space-y-1 text-xs sm:text-sm list-disc pl-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                  <li>Both users share high ratings for <span className="font-medium text-red-400">Adventure</span> and <span className="font-medium text-red-400">Drama</span> genres</li>
                  <li>User 1 favors <span className="font-medium text-red-400">Sci-Fi</span> much more than User 2</li>
                  <li>User 2 prefers <span className="font-medium text-red-400">Horror</span> while User 1 doesn't enjoy it</li>
                  <li>Recommended focus: <span className="font-medium text-red-400">Action-Drama</span> combinations for highest joint enjoyment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="algorithm" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className={cardClasses}>
              <CardHeader className="pb-4">
                <CardTitle className={`${themeClasses} text-lg sm:text-xl`}>Algorithm Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-6 sm:space-y-8">
                  {algorithmData.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${themeClasses} text-sm sm:text-base`}>{item.method} Method</span>
                        <span className={`text-xs sm:text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Score: {item.score.toFixed(1)}</span>
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
              <CardHeader className="pb-4">
                <CardTitle className={`${themeClasses} text-lg sm:text-xl`}>Algorithm Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-red-400">Hybrid</div>
                      <div className={`text-xs sm:text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Best Overall</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-red-400">Intersection</div>
                      <div className={`text-xs sm:text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Best Quality</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-red-400">Weighted</div>
                      <div className={`text-xs sm:text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Most Balanced</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 sm:p-4 rounded-lg ${insightsBgClasses}`}>
                    <h4 className={`font-semibold mb-2 ${themeClasses} text-sm sm:text-base`}>Algorithm Insights</h4>
                    <ul className={`space-y-1 text-xs sm:text-sm list-disc pl-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
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
        
        <TabsContent value="venn" className="space-y-4 sm:space-y-6">
          <Card className={cardClasses}>
            <CardHeader className="pb-4">
              <CardTitle className={`${themeClasses} text-lg sm:text-xl`}>User Preference Overlap</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md">
                  <svg width="100%" height="300" viewBox="0 0 400 300" className="w-full h-auto">
                    <circle cx="150" cy="150" r="100" fill="#dc2626" fillOpacity="0.6" stroke="#dc2626" strokeWidth="2" />
                    <circle cx="250" cy="150" r="100" fill="#ef4444" fillOpacity="0.6" stroke="#ef4444" strokeWidth="2" />
                    
                    <text x="100" y="150" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">User 1</text>
                    <text x="300" y="150" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">User 2</text>
                    <text x="200" y="150" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">Common</text>
                    
                    <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12">42 unique</text>
                    <text x="300" y="170" textAnchor="middle" fill="white" fontSize="12">38 unique</text>
                    <text x="200" y="170" textAnchor="middle" fill="white" fontSize="12">29 shared</text>
                  </svg>
                </div>
                
                <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg w-full ${insightsBgClasses}`}>
                  <h4 className={`font-semibold mb-2 ${themeClasses} text-sm sm:text-base`}>Preference Overlap Analysis</h4>
                  <ul className={`space-y-1 text-xs sm:text-sm list-disc pl-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
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
