
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
