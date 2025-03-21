
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const FirefighterRequests = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  
  // Sample data
  const requests = [
    { id: "REQFF000123", requestedBy: "John Smith", requestedFor: "Self", firefighterId: "FF_SEC_01", status: "Completed", createdOn: "2023-10-01 09:15" },
    { id: "REQFF000124", requestedBy: "Sarah Johnson", requestedFor: "David Lee", firefighterId: "FF_ABAP_02", status: "Pending For Review", createdOn: "2023-10-02 11:30" },
    { id: "REQFF000125", requestedBy: "Michael Brown", requestedFor: "Self", firefighterId: "FF_BASIS_01", status: "Awaiting Approval", createdOn: "2023-10-03 14:45" },
    { id: "REQFF000126", requestedBy: "Emily Davis", requestedFor: "Robert Wilson", firefighterId: "FF_FUNC_01", status: "Completed", createdOn: "2023-10-03 16:20" },
    { id: "REQFF000127", requestedBy: "James Anderson", requestedFor: "Self", firefighterId: "FF_SEC_02", status: "Completed", createdOn: "2023-10-04 10:05" },
    { id: "REQFF000128", requestedBy: "Christopher Martinez", requestedFor: "Self", firefighterId: "FF_ABAP_01", status: "Pending For Review", createdOn: "2023-10-05 08:30" },
  ];

  const viewRequest = (requestId: string) => {
    setSelectedRequest(requestId);
  };

  // Sample transaction usage data
  const transactionLogs = [
    { id: 1, timestamp: "2023-10-05 10:15:22", transaction: "FB01", description: "Post Document", user: "FF_FUNC_01", client: "800", system: "PROD-FIN" },
    { id: 2, timestamp: "2023-10-05 10:18:43", transaction: "FB03", description: "Display Document", user: "FF_FUNC_01", client: "800", system: "PROD-FIN" },
    { id: 3, timestamp: "2023-10-05 10:25:11", transaction: "MIRO", description: "Enter Incoming Invoice", user: "FF_FUNC_01", client: "800", system: "PROD-FIN" },
  ];

  // Sample audit logs
  const auditLogs = [
    { id: 1, timestamp: "2023-10-05 10:14:30", event: "Login", user: "FF_FUNC_01", terminal: "192.168.1.105", system: "PROD-FIN" },
    { id: 2, timestamp: "2023-10-05 10:30:15", event: "Password Change", user: "FF_FUNC_01", terminal: "192.168.1.105", system: "PROD-FIN" },
    { id: 3, timestamp: "2023-10-05 10:45:22", event: "Logout", user: "FF_FUNC_01", terminal: "192.168.1.105", system: "PROD-FIN" },
  ];

  // Sample change logs
  const changeLogs = [
    { id: 1, timestamp: "2023-10-05 10:16:30", object: "VENDOR", objectId: "1000123", field: "PAYMENT_TERMS", oldValue: "NET30", newValue: "NET45", user: "FF_FUNC_01" },
    { id: 2, timestamp: "2023-10-05 10:22:15", object: "CUSTOMER", objectId: "2000456", field: "CREDIT_LIMIT", oldValue: "10000", newValue: "15000", user: "FF_FUNC_01" },
  ];

  return (
    <MainLayout title="Firefighter Requests" showBackButton>
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">All Firefighter Requests</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {filterOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/20 rounded-md border">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <Input type="date" className="w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Firefighter ID</label>
                  <Input type="text" placeholder="e.g. FF_SEC_01" className="w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Requested For</label>
                  <Input type="text" placeholder="Search by name" className="w-full" />
                </div>
                <div className="md:col-span-3 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            )}

            <div className="mb-6 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests..." className="pl-10" />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Number</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Requested For</TableHead>
                    <TableHead>Firefighter ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{request.requestedFor}</TableCell>
                      <TableCell>{request.firefighterId}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === "Completed" 
                            ? "bg-green-50 text-green-700" 
                            : request.status === "Awaiting Approval"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-blue-50 text-blue-700"
                        }`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>{request.createdOn}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => viewRequest(request.id)}
                        >
                          View Request
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Request Details - {selectedRequest}</DialogTitle>
            <DialogDescription>
              Firefighter request details and activity logs
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Requested By</p>
                <p>James Anderson</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Requested For</p>
                <p>Self</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Firefighter ID</p>
                <p>FF_SEC_02</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">Completed</span></p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Date/Time</p>
                <p>2023-10-04 09:00</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">End Date/Time</p>
                <p>2023-10-04 17:00</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">ITSM Ticket</p>
                <p>INC0012345</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">System</p>
                <p>PROD-FIN</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Purpose</p>
                <p>Emergency fix for payment processing issue affecting end-of-month financial close.</p>
              </div>
            </div>

            <Tabs defaultValue="transaction">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="transaction">Transaction Usage</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
                <TabsTrigger value="change">Change Doc Logs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transaction" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>System</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.transaction}</TableCell>
                          <TableCell>{log.description}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.client}</TableCell>
                          <TableCell>{log.system}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="audit" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Terminal</TableHead>
                        <TableHead>System</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.event}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.terminal}</TableCell>
                          <TableCell>{log.system}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="change" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Object</TableHead>
                        <TableHead>Object ID</TableHead>
                        <TableHead>Field</TableHead>
                        <TableHead>Old Value</TableHead>
                        <TableHead>New Value</TableHead>
                        <TableHead>User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {changeLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.object}</TableCell>
                          <TableCell>{log.objectId}</TableCell>
                          <TableCell>{log.field}</TableCell>
                          <TableCell>{log.oldValue}</TableCell>
                          <TableCell>{log.newValue}</TableCell>
                          <TableCell>{log.user}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default FirefighterRequests;
