
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, CheckCircle, Clock, Play, Pause, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ScheduledJobs = () => {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  
  // Sample scheduled jobs data
  const jobs = [
    { 
      id: 1, 
      name: "Transaction Usage Logs Extraction - PROD-ERP", 
      type: "Extraction", 
      system: "PROD-ERP", 
      schedule: "Daily at 23:00", 
      lastRun: "2023-10-04 23:00", 
      nextRun: "2023-10-05 23:00", 
      status: "Completed", 
      enabled: true 
    },
    { 
      id: 2, 
      name: "Security Audit Logs Extraction - PROD-ERP", 
      type: "Extraction", 
      system: "PROD-ERP", 
      schedule: "Daily at 00:15", 
      lastRun: "2023-10-05 00:15", 
      nextRun: "2023-10-06 00:15", 
      status: "Completed", 
      enabled: true 
    },
    { 
      id: 3, 
      name: "Change Document Logs Extraction - PROD-ERP", 
      type: "Extraction", 
      system: "PROD-ERP", 
      schedule: "Daily at 01:30", 
      lastRun: "2023-10-05 01:30", 
      nextRun: "2023-10-06 01:30", 
      status: "Completed", 
      enabled: true 
    },
    { 
      id: 4, 
      name: "Transaction Usage Logs Extraction - PROD-HR", 
      type: "Extraction", 
      system: "PROD-HR", 
      schedule: "Daily at 23:15", 
      lastRun: "2023-10-04 23:15", 
      nextRun: "2023-10-05 23:15", 
      status: "Completed", 
      enabled: true 
    },
    { 
      id: 5, 
      name: "Security Audit Logs Extraction - PROD-HR", 
      type: "Extraction", 
      system: "PROD-HR", 
      schedule: "Daily at 00:30", 
      lastRun: "2023-10-05 00:30", 
      nextRun: "2023-10-06 00:30", 
      status: "Failed", 
      enabled: true 
    },
    { 
      id: 6, 
      name: "Change Document Logs Extraction - PROD-HR", 
      type: "Extraction", 
      system: "PROD-HR", 
      schedule: "Daily at 01:45", 
      lastRun: "2023-10-05 01:45", 
      nextRun: "2023-10-06 01:45", 
      status: "Paused", 
      enabled: false 
    },
    { 
      id: 7, 
      name: "Transaction Usage Logs Extraction - PROD-FIN", 
      type: "Extraction", 
      system: "PROD-FIN", 
      schedule: "Daily at 23:30", 
      lastRun: "2023-10-04 23:30", 
      nextRun: "2023-10-05 23:30", 
      status: "Completed", 
      enabled: true 
    },
    { 
      id: 8, 
      name: "Security Audit Logs Extraction - PROD-FIN", 
      type: "Extraction", 
      system: "PROD-FIN", 
      schedule: "Daily at 00:45", 
      lastRun: "2023-10-05 00:45", 
      nextRun: "2023-10-06 00:45", 
      status: "Running", 
      enabled: true 
    },
    { 
      id: 9, 
      name: "Change Document Logs Extraction - PROD-FIN", 
      type: "Extraction", 
      system: "PROD-FIN", 
      schedule: "Daily at 02:00", 
      lastRun: "2023-10-05 02:00", 
      nextRun: "2023-10-06 02:00", 
      status: "Scheduled", 
      enabled: true 
    },
  ];

  const handleScheduleJob = (job: any) => {
    setSelectedJob(job);
    setScheduleDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      case "Running":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Running</Badge>;
      case "Paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>;
      case "Scheduled":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Scheduled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout title="Scheduled Jobs" showBackButton>
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Scheduled Jobs</h2>
              <Button variant="outline" size="sm">
                Add New Job
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Name</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} className={cn(!job.enabled && "opacity-60")}>
                      <TableCell className="font-medium">{job.name}</TableCell>
                      <TableCell>{job.system}</TableCell>
                      <TableCell>{job.schedule}</TableCell>
                      <TableCell>{job.lastRun}</TableCell>
                      <TableCell>{job.nextRun}</TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            title="Run Now"
                            disabled={job.status === "Running" || !job.enabled}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            title="Schedule"
                            onClick={() => handleScheduleJob(job)}
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                          {job.enabled ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              title="Pause"
                              disabled={job.status === "Paused"}
                            >
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-green-600" 
                              title="Resume"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600" 
                            title="Cancel"
                            disabled={job.status !== "Running" && job.status !== "Scheduled"}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule Job: {selectedJob?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Start Date</label>
                <div className="flex relative">
                  <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="date"
                    className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Start Time</label>
                <div className="flex relative">
                  <Clock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="time"
                    className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Frequency</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="once">Run Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Job description or notes"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button>
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default ScheduledJobs;
