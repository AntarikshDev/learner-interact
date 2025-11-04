import { Activity, Users, HardDrive, Zap, MonitorPlay, Smartphone } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface PlatformUsageReportsTabProps {
  dateRange: string;
}

const activeUsersData = [
  { date: "Mon", dau: 1240, mau: 3847 },
  { date: "Tue", dau: 1580, mau: 3892 },
  { date: "Wed", dau: 1820, mau: 3945 },
  { date: "Thu", dau: 1650, mau: 3978 },
  { date: "Fri", dau: 1920, mau: 4012 },
  { date: "Sat", dau: 980, mau: 4045 },
  { date: "Sun", dau: 850, mau: 4078 },
];

const deviceUsageData = [
  { name: "Desktop", value: 55, color: "hsl(var(--primary))" },
  { name: "Mobile", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 10, color: "hsl(var(--chart-3))" },
];

const featureUsageData = [
  { feature: "Video Player", usage: 92 },
  { feature: "Quizzes", usage: 78 },
  { feature: "Discussion", usage: 65 },
  { feature: "Downloads", usage: 58 },
  { feature: "Live Sessions", usage: 45 },
  { feature: "Chat", usage: 38 },
];

const peakHoursData = [
  { hour: "00:00", users: 120 },
  { hour: "04:00", users: 80 },
  { hour: "08:00", users: 450 },
  { hour: "12:00", users: 890 },
  { hour: "16:00", users: 1240 },
  { hour: "20:00", users: 1580 },
  { hour: "24:00", users: 340 },
];

export const PlatformUsageReportsTab = ({ dateRange }: PlatformUsageReportsTabProps) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Daily Active Users"
          value="1,820"
          change={12.8}
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Monthly Active Users"
          value="4,078"
          change={6.2}
          icon={Activity}
          trend="up"
        />
        <MetricCard
          title="Storage Used"
          value="2.4 TB"
          change={15.3}
          icon={HardDrive}
          trend="up"
        />
        <MetricCard
          title="API Requests"
          value="234K"
          change={18.7}
          icon={Zap}
          trend="up"
        />
        <MetricCard
          title="Platform Uptime"
          value="99.8%"
          change={0.1}
          icon={Activity}
          trend="up"
        />
        <MetricCard
          title="Avg Load Time"
          value="1.2s"
          change={-8.5}
          icon={MonitorPlay}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Active Users (DAU vs MAU)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activeUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="dau"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Daily Active Users"
                />
                <Line
                  type="monotone"
                  dataKey="mau"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Monthly Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature Adoption */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage & Adoption Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="feature" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="hsl(var(--chart-3))" name="Usage %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Usage Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feature Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureUsageData.map((feature) => (
              <div key={feature.feature} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{feature.feature}</span>
                  <span className="text-sm text-muted-foreground">{feature.usage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${feature.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Server Response Time</p>
              <p className="text-2xl font-bold">245ms</p>
              <p className="text-xs text-green-600">↓ 12% faster</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Error Rate</p>
              <p className="text-2xl font-bold">0.02%</p>
              <p className="text-xs text-green-600">↓ 0.01% decrease</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Concurrent Users Peak</p>
              <p className="text-2xl font-bold">1,580</p>
              <p className="text-xs text-blue-600">@ 8:00 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Bandwidth Usage</p>
              <p className="text-2xl font-bold">1.2 TB</p>
              <p className="text-xs text-yellow-600">↑ 15% increase</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Platform uptime maintained at <strong>99.8%</strong> with excellent reliability</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Peak usage occurs at <strong>8:00 PM</strong> with 1,580 concurrent users</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              <span>Video player is the most used feature at <strong>92%</strong> adoption</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>Mobile usage accounts for <strong>35%</strong> of total traffic</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>Chat feature has lowest adoption at <strong>38%</strong> - opportunity for improvement</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
