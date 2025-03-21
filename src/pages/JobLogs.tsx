
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const JobLogs = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  // Sample job logs data
  const logs = [
    { id: 1, jobName: "Transaction Usage Logs Extraction - PROD-ERP", startTime: "2023-10-05 23:00:00", endTime: "2023-10-05 23:05:22", status: "Success", details: "Extracted 156 records" },
    { id: 2, jobName: "Security Audit Logs Extraction - PROD-ERP", startTime: "2023-10-05 00:15:00", endTime: "2023-10-05 00:18:43", status: "Success", details: "Extracted 89 records" },
    { id: 3, jobName: "Change Document Logs Extraction - PROD-ERP", startTime: "2023-10-05 01:30:00", endTime: "2023-10-05 01:32:15", status: "Success", details: "Extracted 27 records" },
    { id: 4, jobName: "Transaction Usage Logs Extraction - PROD-HR", startTime: "2023-10-04 23:15:00", endTime: "2023-10-04 23:19:37", status: "Success", details: "Extracted 112 records" },
    { id: 5, jobName: "Security Audit Logs Extraction - PROD-HR", startTime: "2023-10-05 00:30:00", endTime: "2023-10-05 00:30:59", status: "Failed", details: "Error: Connection timeout" },
    { id: 6, jobName: "Change Document Logs Extraction - PROD-HR", startTime: "2023-10-05 01:45:00", endTime: "2023-10-05 01:45:00", status: "Canceled", details: "Job canceled by administrator" },
    { id: 7, jobName: "Transaction Usage Logs Extraction - PROD-FIN", startTime: "2023-10-04 23:30:00", endTime: "2023-10-04 23:35:14", status: "Success", details: "Extracted 203 records" },
    { id: 8, jobName: "Security Audit Logs Extraction - PROD-FIN", startTime: "2023-10-05 00:45:00", endTime: "", status: "Running", details: "" },
    { id: 9, jobName: "Change Document Logs Extraction - PROD-FIN", startTime: "2023-10-05 02:00:00", endTime: "2023-10-05 02:03:27", status: "Success", details: "Extracted 45 records" },
  ];

  const viewDetails = (log: any) => {
    setSelectedLog(log);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      case "Running":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Running</Badge>;
      case "Canceled":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout title="Job Logs" showBackButton>
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Last 30 Days Job Logs</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search job logs..." className="pl-10" />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Name</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const startTime = new Date(log.startTime).getTime();
                    const endTime = log.endTime ? new Date(log.endTime).getTime() : Date.now();
                    const durationMs = endTime - startTime;
                    const durationMins = Math.floor(durationMs / 60000);
                    const durationSecs = Math.floor((durationMs % 60000) / 1000);
                    const durationFormatted = log.status === "Running" 
                      ? "Running..." 
                      : `${durationMins}m ${durationSecs}s`;
                    
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.jobName}</TableCell>
                        <TableCell>{log.startTime}</TableCell>
                        <TableCell>{log.endTime || "-"}</TableCell>
                        <TableCell>{durationFormatted}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => viewDetails(log)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Job Execution Details</DialogTitle>
            <DialogDescription>
              Details for job execution #{selectedLog?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Job Name</p>
                <p>{selectedLog?.jobName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p>{getStatusBadge(selectedLog?.status || "")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                <p>{selectedLog?.startTime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">End Time</p>
                <p>{selectedLog?.endTime || "-"}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Details</p>
              <p>{selectedLog?.details}</p>
            </div>
            
            {selectedLog?.status === "Failed" && (
              <div className="bg-red-50 border border-red-100 rounded-md p-4">
                <p className="text-sm font-medium text-red-800 mb-2">Error Information</p>
                <pre className="text-xs text-red-700 overflow-auto max-h-40 whitespace-pre-wrap">
                  Error: Connection timeout when connecting to SAP system PROD-HR.
                  Details: CPIC (TCP/IP) RC=1 LOCATION=HOSTNAME ERROR=TIMEOUT
                  TIME=2023-10-05 00:30:59
                  Connection attempt to destination PROD-HR (TCP/IP, hostname: prod-hr.example.com, port: 3300) failed
                  
                  Stack Trace:
                  at com.example.sapconnector.ConnectionManager.connect(ConnectionManager.java:156)
                  at com.example.sapconnector.SessionManager.openSession(SessionManager.java:87)
                  at com.example.extractor.LogExtractor.extract(LogExtractor.java:43)
                  at com.example.jobrunner.JobExecutor.execute(JobExecutor.java:128)
                </pre>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default JobLogs;
