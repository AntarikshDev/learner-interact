import { Users, TrendingUp, Award, Clock, Target, UserCheck } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StudentsReportsTabProps {
  dateRange: string;
}

const enrollmentData = [
  { month: "Jan", students: 145 },
  { month: "Feb", students: 178 },
  { month: "Mar", students: 203 },
  { month: "Apr", students: 189 },
  { month: "May", students: 234 },
  { month: "Jun", students: 267 },
];

const performanceData = [
  { course: "Web Dev", avgScore: 85 },
  { course: "Data Science", avgScore: 78 },
  { course: "UX Design", avgScore: 92 },
  { course: "Marketing", avgScore: 81 },
  { course: "Business", avgScore: 88 },
];

const engagementData = [
  { name: "High Engagement", value: 45, color: "hsl(var(--primary))" },
  { name: "Medium Engagement", value: 35, color: "hsl(var(--secondary))" },
  { name: "Low Engagement", value: 20, color: "hsl(var(--muted))" },
];

const retentionData = [
  { month: "Jan", retention: 85 },
  { month: "Feb", retention: 87 },
  { month: "Mar", retention: 84 },
  { month: "Apr", retention: 86 },
  { month: "May", retention: 88 },
  { month: "Jun", retention: 90 },
];

export const StudentsReportsTab = ({ dateRange }: StudentsReportsTabProps) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Students"
          value="3,847"
          change={12.5}
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Active Students"
          value="2,934"
          change={8.3}
          icon={UserCheck}
          trend="up"
        />
        <MetricCard
          title="Avg Completion Rate"
          value="78%"
          change={3.2}
          icon={Target}
          trend="up"
        />
        <MetricCard
          title="Avg Performance Score"
          value="84.7"
          change={5.1}
          icon={Award}
          trend="up"
        />
        <MetricCard
          title="Retention Rate"
          value="90%"
          change={2.4}
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Avg Learning Time"
          value="12.4h"
          change={15.8}
          icon={Clock}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance by Course */}
        <Card>
          <CardHeader>
            <CardTitle>Average Performance by Course</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
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
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Retention Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Student Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Student enrollment increased by <strong>12.5%</strong> compared to the previous period</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>UX Design course shows the highest average performance at <strong>92%</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>20% of students show low engagement and may need intervention</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              <span>Retention rate improved to <strong>90%</strong>, highest in 6 months</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
