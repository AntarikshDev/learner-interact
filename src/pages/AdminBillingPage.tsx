import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CreditCard, Download, Eye, Calendar, IndianRupee, TrendingUp, Users, Database, Zap, Crown, Shield } from "lucide-react";

export default function AdminBillingPage() {
  const navigate = useNavigate();
  const [autoRenew, setAutoRenew] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const currentPlan = {
    name: "Professional Plan",
    price: 4999,
    interval: "month",
    nextBilling: "2025-12-04",
    status: "active",
    users: 45,
    maxUsers: 100,
    storage: 75,
    maxStorage: 100,
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 999,
      features: ["Up to 25 users", "10 GB storage", "Basic support", "Core features"],
      icon: Users,
      color: "text-blue-500",
    },
    {
      id: "professional",
      name: "Professional",
      price: 4999,
      features: ["Up to 100 users", "100 GB storage", "Priority support", "Advanced analytics", "White labeling"],
      icon: Crown,
      color: "text-purple-500",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 14999,
      features: ["Unlimited users", "1 TB storage", "24/7 support", "Custom integrations", "Dedicated account manager", "SLA guarantee"],
      icon: Shield,
      color: "text-orange-500",
    },
  ];

  const paymentMethods = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "08/26", isDefault: false },
  ];

  const invoices = [
    { id: "INV-2025-001", date: "2025-01-04", amount: 4999, status: "paid", plan: "Professional" },
    { id: "INV-2024-012", date: "2024-12-04", amount: 4999, status: "paid", plan: "Professional" },
    { id: "INV-2024-011", date: "2024-11-04", amount: 4999, status: "paid", plan: "Professional" },
    { id: "INV-2024-010", date: "2024-10-04", amount: 4999, status: "paid", plan: "Professional" },
    { id: "INV-2024-009", date: "2024-09-04", amount: 999, status: "paid", plan: "Starter" },
  ];

  const usageMetrics = [
    { name: "Active Users", current: 45, max: 100, unit: "users", icon: Users },
    { name: "Storage Used", current: 75, max: 100, unit: "GB", icon: Database },
    { name: "API Calls", current: 125000, max: 200000, unit: "calls", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin-dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Current Plan */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Plan</CardTitle>
                    <Badge variant={currentPlan.status === "active" ? "default" : "secondary"}>
                      {currentPlan.status}
                    </Badge>
                  </div>
                  <CardDescription>Your active subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <IndianRupee className="h-5 w-5 text-muted-foreground" />
                    <span className="text-3xl font-bold">{currentPlan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/{currentPlan.interval}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span className="font-medium">{currentPlan.nextBilling}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Auto-renew</span>
                      <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1">Change Plan</Button>
                    <Button variant="destructive" className="flex-1">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Summary</CardTitle>
                  <CardDescription>Current billing period overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Users</span>
                      <span className="text-sm font-medium">{currentPlan.users}/{currentPlan.maxUsers}</span>
                    </div>
                    <Progress value={(currentPlan.users / currentPlan.maxUsers) * 100} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Storage</span>
                      <span className="text-sm font-medium">{currentPlan.storage}/{currentPlan.maxStorage} GB</span>
                    </div>
                    <Progress value={(currentPlan.storage / currentPlan.maxStorage) * 100} />
                  </div>
                  <Button variant="outline" className="w-full mt-4">View Detailed Usage</Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Your latest billing transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.plan}</TableCell>
                          <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">{invoice.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-primary' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${plan.color}`} />
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription className="flex items-baseline gap-1 mt-2">
                            <IndianRupee className="h-4 w-4" />
                            <span className="text-2xl font-bold text-foreground">{plan.price.toLocaleString()}</span>
                            <span>/month</span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={selectedPlan === plan.id ? "default" : "outline"}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? "Current Plan" : "Upgrade"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods for subscription billing</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Add Payment Method</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>Enter your card details to add a new payment method</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>Card Number</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Expiry Date</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input placeholder="123" type="password" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Cardholder Name</Label>
                          <Input placeholder="John Doe" />
                        </div>
                        <Button className="w-full">Add Card</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className={method.isDefault ? 'border-2 border-primary' : ''}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{method.type} •••• {method.last4}</p>
                            {method.isDefault && <Badge>Default</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <Button variant="outline" size="sm">Set as Default</Button>
                        )}
                        <Button variant="destructive" size="sm">Remove</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View and download all your invoices</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {invoice.date}
                            </div>
                          </TableCell>
                          <TableCell>{invoice.plan}</TableCell>
                          <TableCell className="font-semibold">₹{invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">{invoice.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {usageMetrics.map((metric) => {
                const Icon = metric.icon;
                const percentage = (metric.current / metric.max) * 100;
                return (
                  <Card key={metric.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{metric.name}</CardTitle>
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{metric.current.toLocaleString()}</span>
                        <span className="text-muted-foreground">/ {metric.max.toLocaleString()}</span>
                      </div>
                      <Progress value={percentage} />
                      <p className="text-sm text-muted-foreground">
                        {percentage.toFixed(1)}% used
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Monitor your resource consumption over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 mx-auto" />
                  <p>Usage chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
