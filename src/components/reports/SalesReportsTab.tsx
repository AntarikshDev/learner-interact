import { DollarSign, TrendingUp, ShoppingCart, Users, Percent, CreditCard } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface SalesReportsTabProps {
  dateRange: string;
}

const revenueData = [
  { month: "Jan", revenue: 45000, enrollments: 145 },
  { month: "Feb", revenue: 52000, enrollments: 178 },
  { month: "Mar", revenue: 61000, enrollments: 203 },
  { month: "Apr", revenue: 58000, enrollments: 189 },
  { month: "May", revenue: 72000, enrollments: 234 },
  { month: "Jun", revenue: 85000, enrollments: 267 },
];

const courseRevenueData = [
  { course: "Web Development", revenue: 125000 },
  { course: "Data Science", revenue: 98000 },
  { course: "UX/UI Design", revenue: 87000 },
  { course: "Digital Marketing", revenue: 76000 },
  { course: "Business Analytics", revenue: 65000 },
];

const paymentMethodData = [
  { name: "Credit Card", value: 65, color: "hsl(var(--primary))" },
  { name: "Debit Card", value: 20, color: "hsl(var(--chart-2))" },
  { name: "PayPal", value: 10, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 5, color: "hsl(var(--muted))" },
];

const conversionFunnelData = [
  { stage: "Visitors", count: 10000 },
  { stage: "Course Views", count: 5000 },
  { stage: "Add to Cart", count: 2000 },
  { stage: "Checkout", count: 1500 },
  { stage: "Completed", count: 1216 },
];

export const SalesReportsTab = ({ dateRange }: SalesReportsTabProps) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Revenue"
          value="$373K"
          change={23.5}
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Revenue Growth"
          value="18.7%"
          change={4.2}
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Total Enrollments"
          value="1,216"
          change={15.3}
          icon={ShoppingCart}
          trend="up"
        />
        <MetricCard
          title="Avg Revenue/Student"
          value="$307"
          change={7.1}
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Conversion Rate"
          value="12.16%"
          change={2.8}
          icon={Percent}
          trend="up"
        />
        <MetricCard
          title="Refund Rate"
          value="2.3%"
          change={-0.5}
          icon={CreditCard}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="enrollments"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Enrollments"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Course</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="course" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
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
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--chart-3))" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseRevenueData.map((course, index) => (
              <div
                key={course.course}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{course.course}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(course.revenue / 1000).toFixed(1)}K revenue
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-semibold text-green-600">
                    {Math.floor(Math.random() * 20 + 10)}%
                  </span>
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
              <span>Total revenue grew by <strong>23.5%</strong> compared to the previous period</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Web Development course is the top revenue generator at <strong>$125K</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              <span>Conversion rate improved to <strong>12.16%</strong> from the funnel</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>Credit cards account for <strong>65%</strong> of all transactions</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>Refund rate decreased to <strong>2.3%</strong>, lowest in 6 months</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
