import { useState } from "react";
import { DollarSign, TrendingUp, ShoppingCart, Users, Percent, CreditCard, Search, Filter, Download, RotateCcw, Eye, MessageSquare, MoreHorizontal } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ComposedChart,
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

// Daily sales data for trend chart (like bandwidth usage)
const dailySalesData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-${String(Math.floor(i / 30) + 10).padStart(2, '0')}-${String((i % 30) + 1).padStart(2, '0')}`,
  sales: Math.floor(Math.random() * 50000) + 20000,
  transactions: Math.floor(Math.random() * 100) + 50,
}));

// Sample transaction data
const transactionData = [
  {
    id: "1",
    date: "2025/09/26 20:00:59",
    status: "Success",
    amount: "Free",
    channel: "Android",
    orderId: "FREE1758897059439",
    transactionId: "FREE1758897059439",
    userName: "Mudit Singh",
    userEmail: "mudit@example.com",
    userPhone: "+919415932028",
    items: "1. Free Geology Quiz",
    category: "Free Course",
    type: "Free Enrollment",
  },
  {
    id: "2",
    date: "2025/09/12 20:06:23",
    status: "Success",
    amount: "Free",
    channel: "Android",
    orderId: "FREE1757687783521",
    transactionId: "FREE1757687783521",
    userName: "Akriti",
    userEmail: "akriti@example.com",
    userPhone: "+919305548640",
    items: "1. Free Geology Quiz",
    category: "Free Course",
    type: "Free Enrollment",
  },
  {
    id: "3",
    date: "2025/08/28 15:30:45",
    status: "Success",
    amount: "$299",
    channel: "Web",
    orderId: "ORD1756234567890",
    transactionId: "TXN9876543210",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@example.com",
    userPhone: "+1234567890",
    items: "1. Web Development Bootcamp",
    category: "Paid Course",
    type: "Course Purchase",
  },
  {
    id: "4",
    date: "2025/08/27 10:15:22",
    status: "Pending",
    amount: "$149",
    channel: "iOS",
    orderId: "ORD1756198765432",
    transactionId: "TXN5678901234",
    userName: "Michael Chen",
    userEmail: "m.chen@example.com",
    userPhone: "+8612345678",
    items: "1. Data Science Fundamentals",
    category: "Paid Course",
    type: "Course Purchase",
  },
  {
    id: "5",
    date: "2025/08/26 18:45:10",
    status: "Failed",
    amount: "$499",
    channel: "Web",
    orderId: "ORD1756123456789",
    transactionId: "TXN1234567890",
    userName: "Emily Davis",
    userEmail: "emily.d@example.com",
    userPhone: "+4491234567",
    items: "1. Full Stack Bundle",
    category: "Bundle",
    type: "Bundle Purchase",
  },
];

export const SalesReportsTab = ({ dateRange }: SalesReportsTabProps) => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

      {/* Daily Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="sales" 
                fill="hsl(var(--primary))" 
                name="Sales ($)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="transactions"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Transactions"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Advanced Filters Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </CardHeader>
        {showFilters && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input placeholder="Order ID" />
              <Input placeholder="Transaction ID" />
              <Input placeholder="User Email" />
              <Input placeholder="Course/Package" />
              
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="free">Free Enrollment</SelectItem>
                  <SelectItem value="paid">Course Purchase</SelectItem>
                  <SelectItem value="bundle">Bundle Purchase</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="PROMO CODE" />
              <Input placeholder="Affiliate" />
              <Input placeholder="Category" />
              <Input placeholder="UTM Source" />
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button variant="default" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" size="sm" className="ml-auto">
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Channel / Order ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-xs">{transaction.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Success"
                            ? "default"
                            : transaction.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{transaction.amount}</TableCell>
                    <TableCell className="text-xs">
                      <div>{transaction.channel}</div>
                      <div className="text-muted-foreground">{transaction.orderId}</div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-xs">
                          {transaction.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.userName}</div>
                          <div className="text-muted-foreground">{transaction.userPhone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{transaction.items}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Refund
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {transactionData.length} of {transactionData.length} transactions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
