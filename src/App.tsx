import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import InstituteAdminDashboard from "./components/InstituteAdminDashboard";
import ProInstructorDashboard from "./components/ProInstructorDashboard";
import UltimateSubAdminDashboard from "./components/UltimateSubAdminDashboard";
import StudentActivityPage from "./pages/StudentActivityPage";
import StudentPerformancePage from "./pages/StudentPerformancePage";
import AdminProfileSettings from "./pages/AdminProfileSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/admin-dashboard" element={<InstituteAdminDashboard />} />
          <Route path="/admin-profile-settings" element={<AdminProfileSettings />} />
          <Route path="/instructor-dashboard" element={<ProInstructorDashboard />} />
          <Route path="/sub-admin-dashboard" element={<UltimateSubAdminDashboard />} />
          <Route path="/student-activity" element={<StudentActivityPage />} />
          <Route path="/student-performance" element={<StudentPerformancePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
