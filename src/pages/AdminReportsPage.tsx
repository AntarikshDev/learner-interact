import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentsReportsTab } from "@/components/reports/StudentsReportsTab";
import { InstructorsReportsTab } from "@/components/reports/InstructorsReportsTab";
import { SalesReportsTab } from "@/components/reports/SalesReportsTab";
import { PlatformUsageReportsTab } from "@/components/reports/PlatformUsageReportsTab";

const AdminReportsPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("last30days");
  const [activeTab, setActiveTab] = useState("students");

  const handleExport = (format: string) => {
    console.log(`Exporting report as ${format}`);
    // Export functionality would be implemented here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin-dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Advanced Reports</h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analytics and insights across your platform
                </p>
              </div>
            </div>
          </div>

          {/* Global Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[200px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("json")}>
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="platform">Platform Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <StudentsReportsTab dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="instructors" className="space-y-6">
            <InstructorsReportsTab dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <SalesReportsTab dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="platform" className="space-y-6">
            <PlatformUsageReportsTab dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminReportsPage;
