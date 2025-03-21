
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubmitRequest from "./pages/SubmitRequest";
import MyRequests from "./pages/MyRequests";
import ManageRequests from "./pages/ManageRequests";
import ApprovalInbox from "./pages/ApprovalInbox";
import ProvisioningLogs from "./pages/ProvisioningLogs";
import FirefighterRequests from "./pages/FirefighterRequests";
import Analytics from "./pages/Analytics";
import ScheduledJobs from "./pages/ScheduledJobs";
import JobLogs from "./pages/JobLogs";
import DeleteLogs from "./pages/DeleteLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit-request" element={<SubmitRequest />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/manage-requests" element={<ManageRequests />} />
          <Route path="/approval-inbox" element={<ApprovalInbox />} />
          <Route path="/provisioning-logs" element={<ProvisioningLogs />} />
          <Route path="/firefighter-requests" element={<FirefighterRequests />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/scheduled-jobs" element={<ScheduledJobs />} />
          <Route path="/job-logs" element={<JobLogs />} />
          <Route path="/delete-logs" element={<DeleteLogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
