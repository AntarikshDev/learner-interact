import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, PackageCheck, Search, Filter, RotateCcw, Eye, MessageSquare, MoreHorizontal, IndianRupee, FileText, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/reports/MetricCard";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for comprehensive sales reports
const dailySalesData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  sales: Math.floor(Math.random() * 50000) + 20000,
  transactions: Math.floor(Math.random() * 100) + 50,
  revenue: Math.floor(Math.random() * 80000) + 40000,
}));

const revenueByCategory = [
  { name: "Technical Courses", value: 450000, growth: 12.5 },
  { name: "Business & Management", value: 320000, growth: 8.3 },
  { name: "Creative Arts", value: 180000, growth: 15.2 },
  { name: "Health & Wellness", value: 150000, growth: -3.1 },
  { name: "Language Learning", value: 120000, growth: 6.7 },
];

const revenueByInstructor = [
  { name: "Dr. Sarah Johnson", revenue: 280000, students: 1250, courses: 8 },
  { name: "Prof. Michael Chen", revenue: 245000, students: 980, courses: 6 },
  { name: "Alex Rodriguez", revenue: 198000, students: 850, courses: 5 },
  { name: "Emily Davis", revenue: 165000, students: 720, courses: 7 },
  { name: "James Wilson", revenue: 142000, students: 650, courses: 4 },
];

const conversionFunnelData = [
  { stage: "Landing Page Visits", count: 50000, percentage: 100 },
  { stage: "Course Views", count: 25000, percentage: 50 },
  { stage: "Add to Cart", count: 10000, percentage: 20 },
  { stage: "Checkout Started", count: 7500, percentage: 15 },
  { stage: "Payment Completed", count: 6250, percentage: 12.5 },
];

const paymentMethodsData = [
  { name: "Credit/Debit Card", value: 45, color: "hsl(var(--chart-1))" },
  { name: "UPI", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Net Banking", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Wallet", value: 10, color: "hsl(var(--chart-4))" },
];

const recentSignups = Array.from({ length: 20 }, (_, i) => ({
  id: `SU${1000 + i}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  phone: `+91 98765${String(43210 + i).slice(-5)}`,
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  course: ["React Masterclass", "Python Fundamentals", "Data Science", "Web Development", "JavaScript Advanced"][i % 5],
  source: ["Organic", "Social Media", "Referral", "Paid Ads", "Email Campaign"][i % 5],
}));

const transactionData = Array.from({ length: 50 }, (_, i) => ({
  id: `TXN${10000 + i}`,
  orderId: `ORD${5000 + i}`,
  date: new Date(Date.now() - i * 3600000).toISOString().split('T')[0],
  time: `${String(10 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')} ${i % 2 === 0 ? 'AM' : 'PM'}`,
  status: ["completed", "pending", "failed"][i % 3] as "completed" | "pending" | "failed",
  amount: Math.floor(Math.random() * 5000) + 1000,
  channel: ["Web", "Mobile App", "Affiliate"][i % 3],
  user: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+91 ${String(9876543210 - i).slice(0, 10)}`,
  course: ["React Masterclass", "Python Fundamentals", "Data Science Bootcamp", "JavaScript Advanced", "Web Development"][i % 5],
  paymentMethod: ["Card", "UPI", "Net Banking", "Wallet"][i % 4],
  promoCode: i % 5 === 0 ? "SAVE20" : "",
  affiliate: i % 7 === 0 ? "Partner XYZ" : "",
}));

const AdminSalesReportsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = transactionData.filter(tx => {
    const matchesStatus = selectedStatus === "all" || tx.status === selectedStatus;
    const matchesChannel = selectedChannel === "all" || tx.channel === selectedChannel;
    const matchesPayment = selectedPaymentMethod === "all" || tx.paymentMethod === selectedPaymentMethod;
    const matchesSearch = searchQuery === "" || 
      tx.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesChannel && matchesPayment && matchesSearch;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleExport = () => {
    console.log("Exporting sales data...");
  };

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedChannel("all");
    setSelectedPaymentMethod("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin-dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Comprehensive Sales Reports</h1>
                <p className="text-sm text-muted-foreground">Complete revenue analytics and transaction insights</p>
              </div>
            </div>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value="₹12,45,890"
            change={18.2}
            changeLabel="vs last month"
            icon={IndianRupee}
            trend="up"
          />
          <MetricCard
            title="Total Transactions"
            value="1,847"
            change={12.5}
            changeLabel="vs last month"
            icon={ShoppingCart}
            trend="up"
          />
          <MetricCard
            title="New Enrollments"
            value="342"
            change={24.8}
            changeLabel="vs last month"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Avg. Transaction Value"
            value="₹6,745"
            change={-3.2}
            changeLabel="vs last month"
            icon={TrendingUp}
            trend="down"
          />
        </div>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="signups">Recent Signups</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="instructors">By Instructor</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Daily Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Trend (Last 30 Days)</CardTitle>
                <CardDescription>Revenue and transaction volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dailySalesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px"
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="sales" fill="hsl(var(--chart-1))" name="Sales (₹)" />
                      <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Transactions" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Distribution of payment types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="hsl(var(--chart-1))"
                          dataKey="value"
                        >
                          {paymentMethodsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>From visit to purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversionFunnelData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="stage" type="category" width={150} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--chart-3))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                  <CardDescription>Revenue by course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByCategory.slice(0, 5).map((category, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-sm font-semibold">₹{category.value.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${(category.value / 450000) * 100}%` }}
                              />
                            </div>
                            <span className={`text-xs font-medium flex items-center gap-1 ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {category.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {Math.abs(category.growth)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* All Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            {/* Advanced Filters */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transaction Filters</CardTitle>
                    <CardDescription>Filter and search all transactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide" : "Show"} Filters
                  </Button>
                </div>
              </CardHeader>
              {showFilters && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Order ID, User, Email..." 
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Channel</label>
                      <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Channels</SelectItem>
                          <SelectItem value="Web">Web</SelectItem>
                          <SelectItem value="Mobile App">Mobile App</SelectItem>
                          <SelectItem value="Affiliate">Affiliate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Payment Method</label>
                      <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="Net Banking">Net Banking</SelectItem>
                          <SelectItem value="Wallet">Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                    <Button size="sm" onClick={handleExport}>
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
                <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
                <CardDescription>Complete transaction history with details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Channel / Order ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{transaction.date}</div>
                              <div className="text-muted-foreground">{transaction.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "default"
                                  : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">₹{transaction.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{transaction.channel}</div>
                              <div className="text-muted-foreground">{transaction.orderId}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                {transaction.user.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="text-sm">
                                <div className="font-medium">{transaction.user}</div>
                                <div className="text-muted-foreground">{transaction.phone}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{transaction.course}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{transaction.paymentMethod}</div>
                              {transaction.promoCode && (
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {transaction.promoCode}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Generate Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Contact User
                                </DropdownMenuItem>
                                {transaction.status === "completed" && (
                                  <DropdownMenuItem className="text-destructive">
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Refund
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Signups Tab */}
          <TabsContent value="signups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Signups & Enrollments</CardTitle>
                <CardDescription>New students and their course enrollments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Enrolled Course</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSignups.map((signup) => (
                        <TableRow key={signup.id}>
                          <TableCell className="font-medium">{signup.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                {signup.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium">{signup.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{signup.email}</div>
                              <div className="text-muted-foreground">{signup.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>{signup.course}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{signup.source}</Badge>
                          </TableCell>
                          <TableCell>{signup.date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* By Category Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Performance breakdown by course categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {revenueByCategory.map((category, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{category.name}</h4>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-medium flex items-center gap-1 ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {category.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {Math.abs(category.growth)}%
                          </span>
                          <span className="text-lg font-bold">₹{category.value.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all" 
                          style={{ width: `${(category.value / 450000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* By Instructor Tab */}
          <TabsContent value="instructors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Instructor</CardTitle>
                <CardDescription>Top performing instructors and their earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Avg per Student</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenueByInstructor.map((instructor, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-bold">#{idx + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                {instructor.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium">{instructor.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-lg">₹{instructor.revenue.toLocaleString()}</TableCell>
                          <TableCell>{instructor.students.toLocaleString()}</TableCell>
                          <TableCell>{instructor.courses}</TableCell>
                          <TableCell>₹{Math.round(instructor.revenue / instructor.students).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSalesReportsPage;
