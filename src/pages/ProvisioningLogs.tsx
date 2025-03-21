
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download, RefreshCw } from "lucide-react";

const ProvisioningLogs = () => {
  // Sample data for provisioning logs
  const logs = [
    { id: 1, timestamp: "2023-10-05 08:30:22", system: "PROD-ERP", operation: "User Provisioning", status: "Success", details: "" },
    { id: 2, timestamp: "2023-10-05 09:15:43", system: "PROD-HR", operation: "Firefighter Activation", status: "Success", details: "" },
    { id: 3, timestamp: "2023-10-04 14:22:11", system: "PROD-FIN", operation: "Log Extraction", status: "Failed", details: "Connection timeout" },
    { id: 4, timestamp: "2023-10-04 16:08:37", system: "PROD-ERP", operation: "Firefighter Deactivation", status: "Success", details: "" },
    { id: 5, timestamp: "2023-10-03 11:45:19", system: "PROD-HR", operation: "User Provisioning", status: "Failed", details: "Invalid user data" },
    { id: 6, timestamp: "2023-10-03 13:30:52", system: "PROD-FIN", operation: "Log Extraction", status: "Success", details: "" },
    { id: 7, timestamp: "2023-10-02 09:18:45", system: "PROD-ERP", operation: "Firefighter Activation", status: "Success", details: "" },
  ];

  return (
    <MainLayout title="Provisioning Logs" showBackButton>
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Last 7 Days Provisioning Logs</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Operation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Error Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.system}</TableCell>
                      <TableCell>{log.operation}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === "Success" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-red-50 text-red-700"
                        }`}>
                          {log.status}
                        </span>
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProvisioningLogs;
