
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Sample data for charts
  const requestsByStatus = [
    { name: "Completed", value: 42, color: "#10b981" },
    { name: "Pending Review", value: 15, color: "#3b82f6" },
    { name: "Awaiting Approval", value: 8, color: "#f59e0b" },
    { name: "Rejected", value: 3, color: "#ef4444" },
  ];
  
  const firefighterUsage = [
    { name: "FF_SEC_01", value: 15 },
    { name: "FF_SEC_02", value: 12 },
    { name: "FF_ABAP_01", value: 9 },
    { name: "FF_ABAP_02", value: 7 },
    { name: "FF_BASIS_01", value: 14 },
    { name: "FF_BASIS_02", value: 11 },
    { name: "FF_FUNC_01", value: 18 },
    { name: "FF_FUNC_02", value: 13 },
  ];
  
  const requestTrends = [
    { month: "Jan", requests: 32 },
    { month: "Feb", requests: 40 },
    { month: "Mar", requests: 35 },
    { month: "Apr", requests: 28 },
    { month: "May", requests: 42 },
    { month: "Jun", requests: 38 },
    { month: "Jul", requests: 45 },
    { month: "Aug", requests: 52 },
    { month: "Sep", requests: 48 },
    { month: "Oct", requests: 56 },
    { month: "Nov", requests: 0 },
    { month: "Dec", requests: 0 },
  ];
  
  const systemActivity = [
    { name: "PROD-ERP", transactions: 245, auditLogs: 186, changeLogs: 58 },
    { name: "PROD-HR", transactions: 178, auditLogs: 142, changeLogs: 32 },
    { name: "PROD-FIN", transactions: 289, auditLogs: 203, changeLogs: 79 },
    { name: "PROD-SCM", transactions: 156, auditLogs: 124, changeLogs: 45 },
  ];

  return (
    <MainLayout title="Analytics Dashboard" showBackButton>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Firefighter Analytics</h2>
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Requests by Status</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    Completed: { color: "#10b981" },
                    "Pending Review": { color: "#3b82f6" },
                    "Awaiting Approval": { color: "#f59e0b" },
                    Rejected: { color: "#ef4444" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={requestsByStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {requestsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-2 border rounded shadow-sm">
                                <p className="font-medium">{data.name}</p>
                                <p className="text-sm">Count: {data.value}</p>
                              </div>
                            );
                          }
                          return null;
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Firefighter ID Usage</h3>
              <div className="h-[250px]">
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={firefighterUsage} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" name="Usage Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Request Trends</h3>
              <div className="h-[300px]">
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={requestTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="requests" 
                        stroke="#3b82f6" 
                        activeDot={{ r: 8 }} 
                        name="Request Count"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">System Activity</h3>
              <div className="h-[300px]">
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={systemActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="transactions" fill="#3b82f6" name="Transactions" />
                      <Bar dataKey="auditLogs" fill="#10b981" name="Audit Logs" />
                      <Bar dataKey="changeLogs" fill="#f59e0b" name="Change Logs" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
