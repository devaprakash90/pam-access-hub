
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, PlayCircle, PauseCircle, Settings, Edit, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ScheduledJobs = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([
    { 
      id: "JOB001", 
      name: "User Provisioning", 
      description: "Provisioning of users based on HR feed", 
      schedule: "Daily at 08:00", 
      lastRun: "2023-10-04 08:00", 
      nextRun: "2023-10-05 08:00", 
      status: "Active",
      type: "System" 
    },
    { 
      id: "JOB002", 
      name: "Firefighter ID Deactivation", 
      description: "Automatic deactivation of expired firefighter IDs", 
      schedule: "Daily at 23:00", 
      lastRun: "2023-10-04 23:00", 
      nextRun: "2023-10-05 23:00", 
      status: "Active",
      type: "System" 
    },
    { 
      id: "JOB003", 
      name: "Log Extraction - SAP ERP", 
      description: "Extracts security audit logs from SAP ERP system", 
      schedule: "Hourly", 
      lastRun: "2023-10-05 09:00", 
      nextRun: "2023-10-05 10:00", 
      status: "Active",
      type: "System" 
    },
    { 
      id: "JOB004", 
      name: "Usage Reports Generation", 
      description: "Generates firefighter ID usage reports", 
      schedule: "Weekly on Monday at 07:00", 
      lastRun: "2023-10-02 07:00", 
      nextRun: "2023-10-09 07:00", 
      status: "Active",
      type: "Report" 
    },
    { 
      id: "JOB005", 
      name: "Data Archiving", 
      description: "Archives old request and usage data", 
      schedule: "Monthly on 1st at 01:00", 
      lastRun: "2023-10-01 01:00", 
      nextRun: "2023-11-01 01:00", 
      status: "Inactive",
      type: "Maintenance" 
    },
  ]);

  const [newJobDialog, setNewJobDialog] = useState(false);
  const [editJobDialog, setEditJobDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [newJob, setNewJob] = useState({
    name: "",
    description: "",
    schedule: "",
    type: "",
    status: "Active"
  });

  const handleAddNewJob = () => {
    // Validate form
    if (!newJob.name || !newJob.description || !newJob.schedule || !newJob.type) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate ID and add job
    const jobId = `JOB${String(jobs.length + 1).padStart(3, '0')}`;
    const currentDate = new Date();
    
    // Calculate next run date based on schedule (simplified)
    let nextRun = new Date();
    if (newJob.schedule.includes("Daily")) {
      nextRun.setDate(nextRun.getDate() + 1);
    } else if (newJob.schedule.includes("Weekly")) {
      nextRun.setDate(nextRun.getDate() + 7);
    } else if (newJob.schedule.includes("Monthly")) {
      nextRun.setMonth(nextRun.getMonth() + 1);
    } else if (newJob.schedule.includes("Hourly")) {
      nextRun.setHours(nextRun.getHours() + 1);
    }

    const formattedNextRun = `${nextRun.getFullYear()}-${String(nextRun.getMonth() + 1).padStart(2, '0')}-${String(nextRun.getDate()).padStart(2, '0')} ${String(nextRun.getHours()).padStart(2, '0')}:${String(nextRun.getMinutes()).padStart(2, '0')}`;
    
    const newJobEntry = {
      id: jobId,
      name: newJob.name,
      description: newJob.description,
      schedule: newJob.schedule,
      lastRun: "N/A",
      nextRun: formattedNextRun,
      status: newJob.status,
      type: newJob.type
    };

    setJobs([...jobs, newJobEntry]);
    setNewJobDialog(false);
    setNewJob({
      name: "",
      description: "",
      schedule: "",
      type: "",
      status: "Active"
    });

    toast({
      title: "Job Created",
      description: `Job ${jobId} has been created successfully.`
    });
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: `Job ${jobId} has been deleted.`
    });
  };

  const handleToggleJobStatus = (jobId: string) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        const newStatus = job.status === "Active" ? "Inactive" : "Active";
        return { ...job, status: newStatus };
      }
      return job;
    }));

    const job = jobs.find(j => j.id === jobId);
    const newStatus = job?.status === "Active" ? "Inactive" : "Active";

    toast({
      title: `Job ${newStatus}`,
      description: `Job ${jobId} has been ${newStatus === "Active" ? "activated" : "deactivated"}.`
    });
  };

  return (
    <MainLayout title="Scheduled Jobs" showBackButton>
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Scheduled Jobs</h2>
              <Button 
                onClick={() => setNewJobDialog(true)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add New Job
              </Button>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="report">Reports</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{job.name}</p>
                          <p className="text-xs text-muted-foreground">{job.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.schedule}</span>
                      </TableCell>
                      <TableCell>{job.lastRun}</TableCell>
                      <TableCell>{job.nextRun}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            job.status === "Active" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleToggleJobStatus(job.id)}
                            title={job.status === "Active" ? "Deactivate Job" : "Activate Job"}
                          >
                            {job.status === "Active" ? 
                              <PauseCircle className="h-4 w-4 text-muted-foreground" /> : 
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedJob(job.id);
                              setEditJobDialog(true);
                            }}
                            title="Edit Job"
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteJob(job.id)}
                            title="Delete Job"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Add New Job Dialog */}
      <Dialog open={newJobDialog} onOpenChange={setNewJobDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Scheduled Job</DialogTitle>
            <DialogDescription>
              Create a new job to be executed on a schedule
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Job Name
              </Label>
              <Input
                id="name"
                value={newJob.name}
                onChange={(e) => setNewJob({...newJob, name: e.target.value})}
                className="col-span-3"
                placeholder="e.g. User Provisioning"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Job Type
              </Label>
              <Select
                onValueChange={(value) => setNewJob({...newJob, type: value})}
                value={newJob.type}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="Report">Report</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule" className="text-right">
                Schedule
              </Label>
              <Select
                onValueChange={(value) => setNewJob({...newJob, schedule: value})}
                value={newJob.schedule}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                  <SelectItem value="Daily at 08:00">Daily at 08:00</SelectItem>
                  <SelectItem value="Daily at 23:00">Daily at 23:00</SelectItem>
                  <SelectItem value="Weekly on Monday at 07:00">Weekly on Monday at 07:00</SelectItem>
                  <SelectItem value="Monthly on 1st at 01:00">Monthly on 1st at 01:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                className="col-span-3"
                placeholder="Describe what this job does"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setNewJobDialog(false);
                setNewJob({
                  name: "",
                  description: "",
                  schedule: "",
                  type: "",
                  status: "Active"
                });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNewJob}>Create Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={editJobDialog} onOpenChange={setEditJobDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Scheduled Job</DialogTitle>
            <DialogDescription>
              Modify the selected job's properties
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Edit form fields would go here */}
            <p className="text-center text-muted-foreground">Edit functionality not implemented in this demo</p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditJobDialog(false);
                setSelectedJob(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => setEditJobDialog(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default ScheduledJobs;
