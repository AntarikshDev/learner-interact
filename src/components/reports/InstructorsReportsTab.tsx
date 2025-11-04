import { UserCheck, Star, Clock, BookOpen, MessageSquare, TrendingUp } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface InstructorsReportsTabProps {
  dateRange: string;
}

const performanceData = [
  { instructor: "Dr. Smith", satisfaction: 4.8, completionRate: 92 },
  { instructor: "Prof. Johnson", satisfaction: 4.6, completionRate: 88 },
  { instructor: "Ms. Williams", satisfaction: 4.9, completionRate: 95 },
  { instructor: "Dr. Brown", satisfaction: 4.5, completionRate: 85 },
  { instructor: "Prof. Davis", satisfaction: 4.7, completionRate: 90 },
];

const workloadData = [
  { month: "Jan", avgStudents: 45 },
  { month: "Feb", avgStudents: 48 },
  { month: "Mar", avgStudents: 52 },
  { month: "Apr", avgStudents: 50 },
  { month: "May", avgStudents: 55 },
  { month: "Jun", avgStudents: 58 },
];

const engagementMetrics = [
  { metric: "Response Time", value: 85 },
  { metric: "Content Quality", value: 92 },
  { metric: "Student Interaction", value: 78 },
  { metric: "Assessment Design", value: 88 },
  { metric: "Feedback Quality", value: 90 },
];

export const InstructorsReportsTab = ({ dateRange }: InstructorsReportsTabProps) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Instructors"
          value="127"
          change={8.2}
          icon={UserCheck}
          trend="up"
        />
        <MetricCard
          title="Active Instructors"
          value="98"
          change={5.4}
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Avg Rating"
          value="4.7"
          change={3.1}
          icon={Star}
          trend="up"
        />
        <MetricCard
          title="Avg Response Time"
          value="2.3h"
          change={-12.5}
          icon={Clock}
          trend="up"
        />
        <MetricCard
          title="Courses Managed"
          value="342"
          change={15.7}
          icon={BookOpen}
          trend="up"
        />
        <MetricCard
          title="Student Interactions"
          value="8,934"
          change={18.3}
          icon={MessageSquare}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructor Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Instructor Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="instructor" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="satisfaction" fill="hsl(var(--primary))" name="Satisfaction (out of 5)" />
                <Bar dataKey="completionRate" fill="hsl(var(--chart-2))" name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Workload Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Average Students per Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgStudents"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  name="Avg Students"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Metrics Radar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Instructor Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={engagementMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData
              .sort((a, b) => b.satisfaction - a.satisfaction)
              .slice(0, 5)
              .map((instructor, index) => (
                <div
                  key={instructor.instructor}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{instructor.instructor}</p>
                      <p className="text-sm text-muted-foreground">
                        {instructor.completionRate}% completion rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{instructor.satisfaction}</span>
                  </div>
                </div>
              ))}
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
              <span>Ms. Williams maintains the highest satisfaction rating at <strong>4.9/5</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Average response time improved by <strong>12.5%</strong> to 2.3 hours</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              <span>Student interactions increased by <strong>18.3%</strong> this period</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>Content quality scores highest at <strong>92%</strong> across all metrics</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
