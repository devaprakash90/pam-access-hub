
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Eye, Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock data
const pendingApprovals = [
  {
    id: "REQFF000002",
    requestedBy: "John Doe",
    requestedFor: "Emily Davis",
    firefighterId: "FF_SEC_01",
    status: "Awaiting Approval",
    createdOn: "2023-05-18 14:22:10",
  },
  {
    id: "REQFF000005",
    requestedBy: "Jane Smith",
    requestedFor: "Robert Johnson",
    firefighterId: "FF_BASIS_02",
    status: "Awaiting Approval",
    createdOn: "2023-05-23 10:45:15",
  },
  {
    id: "REQFF000004",
    requestedBy: "John Doe",
    requestedFor: "Self",
    firefighterId: "FF_FUNC_02",
    status: "Pending For Review",
    createdOn: "2023-05-22 16:05:33",
  },
];

const requestDetails = {
  id: "REQFF000002",
  requestedBy: "John Doe",
  requestedFor: "Emily Davis",
  manager: "Sarah Brown",
  firefighterId: "FF_SEC_01",
  system: "PRD",
  startDate: "2023-05-20 09:00:00",
  endDate: "2023-05-20 17:00:00",
  ticketNo: "INC123456",
  transactions: "SU01, PFCG, SU53",
  activities: "Need to troubleshoot authorization issues for Finance users. Several users are reporting errors when accessing transaction FB01. Will investigate role permissions and make necessary adjustments.",
  status: "Awaiting Approval",
  createdOn: "2023-05-18 14:22:10",
};

// Mock log data
const transactionLogs = [
  { timestamp: "2023-05-20 09:15:23", user: "FF_SEC_01", transaction: "SU01", client: "100", duration: "00:02:35" },
  { timestamp: "2023-05-20 09:45:12", user: "FF_SEC_01", transaction: "PFCG", client: "100", duration: "00:08:12" },
  { timestamp: "2023-05-20 10:30:45", user: "FF_SEC_01", transaction: "SU53", client: "100", duration: "00:01:18" },
  { timestamp: "2023-05-20 11:05:30", user: "FF_SEC_01", transaction: "SU01", client: "100", duration: "00:03:42" },
];

const auditLogs = [
  { timestamp: "2023-05-20 09:16:45", user: "FF_SEC_01", action: "User profile modification", status: "Success", details: "Modified user FINANCE01" },
  { timestamp: "2023-05-20 09:48:30", user: "FF_SEC_01", action: "Role modification", status: "Success", details: "Updated role ZFI_AP_CLERK" },
  { timestamp: "2023-05-20 10:32:15", user: "FF_SEC_01", action: "Authorization check", status: "Failure", details: "Object S_TCODE, value FB01" },
  { timestamp: "2023-05-20 11:08:22", user: "FF_SEC_01", action: "User profile modification", status: "Success", details: "Modified user FINANCE02" },
];

const changeLogs = [
  { timestamp: "2023-05-20 09:18:10", user: "FF_SEC_01", object: "USER", objectID: "FINANCE01", change: "Authorization profile updated" },
  { timestamp: "2023-05-20 09:50:45", user: "FF_SEC_01", object: "ROLE", objectID: "ZFI_AP_CLERK", change: "Authorization values modified" },
  { timestamp: "2023-05-20 11:10:35", user: "FF_SEC_01", object: "USER", objectID: "FINANCE02", change: "Authorization profile updated" },
];

// AI Insights mock data
const aiInsights = {
  alignment: 85,
  ownership: "IT",
  redFlags: [
    "Multiple user profile changes in short time period",
    "Failed authorization check for FB01"
  ],
  recommendations: [
    "Review role ZFI_AP_CLERK changes for compliance",
    "Verify that all profile modifications were necessary"
  ],
  complianceScore: 75,
  riskScore: 65
};

const ApprovalInbox = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [decisionMade, setDecisionMade] = useState(false);

  const handleViewDetails = (requestId: string) => {
    setSelectedRequest(requestId);
    setDetailsOpen(true);
    setDecisionMade(false);
    setComments("");
    setActiveTab("details");
  };

  const handleDecision = (approved: boolean) => {
    if (!comments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please provide comments before making a decision.",
        variant: "destructive",
      });
      return;
    }

    setDecisionMade(true);
    
    toast({
      title: approved ? "Request Approved" : "Request Rejected",
      description: `Request ${selectedRequest} has been ${approved ? "approved" : "rejected"}.`,
      variant: approved ? "default" : "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Awaiting Approval":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Requested":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending For Review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <MainLayout title="Approval Inbox" showBackButton>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <Card className="shadow-elevation overflow-hidden">
          <Table>
            <TableCaption>A list of requests awaiting your approval or review</TableCaption>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Request Number</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Requested For</TableHead>
                <TableHead>Firefighter ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{request.requestedFor}</TableCell>
                  <TableCell>{request.firefighterId}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("font-normal", getStatusColor(request.status))}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.createdOn}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(request.id)}
                      className="hover:bg-secondary"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Detailed information for request {selectedRequest}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              {requestDetails.status === "Pending For Review" && (
                <>
                  <TabsTrigger value="transactions">Transaction Usage</TabsTrigger>
                  <TabsTrigger value="audit">Audit Logs</TabsTrigger>
                  <TabsTrigger value="changes">Change Docs</TabsTrigger>
                  <TabsTrigger value="insights">AI Insights</TabsTrigger>
                </>
              )}
            </TabsList>
            
            <TabsContent value="details" className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Request Number</h3>
                  <p className="font-medium">{requestDetails.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <Badge
                    variant="outline"
                    className={cn("font-normal", getStatusColor(requestDetails.status))}
                  >
                    {requestDetails.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested By</h3>
                  <p>{requestDetails.requestedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested For</h3>
                  <p>{requestDetails.requestedFor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Manager</h3>
                  <p>{requestDetails.manager}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Firefighter ID</h3>
                  <p>{requestDetails.firefighterId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">SAP System</h3>
                  <p>{requestDetails.system}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">ITSM Ticket</h3>
                  <p>{requestDetails.ticketNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Start Date/Time</h3>
                  <p>{requestDetails.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">End Date/Time</h3>
                  <p>{requestDetails.endDate}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Transactions/Reports/Programs</h3>
                  <p className="text-sm">{requestDetails.transactions}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Activities</h3>
                  <p className="text-sm whitespace-pre-line">{requestDetails.activities}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created On</h3>
                  <p>{requestDetails.createdOn}</p>
                </div>
              </div>

              {requestDetails.status === "Awaiting Approval" && !decisionMade && (
                <>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Comments</h3>
                    <Textarea
                      placeholder="Enter your comments or feedback here..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="resize-none h-24 bg-white"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                    <Button 
                      variant="outline" 
                      className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                      onClick={() => handleDecision(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => handleDecision(true)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </>
              )}
              
              {requestDetails.status === "Pending For Review" && !decisionMade && (
                <>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Review Comments</h3>
                    <Textarea
                      placeholder="Enter your review comments here..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="resize-none h-24 bg-white"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                    <Button 
                      variant="outline" 
                      className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                      onClick={() => handleDecision(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => handleDecision(true)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Sign Off
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="transactions">
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Transaction Usage Logs</h3>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionLogs.map((log, index) => (
                        <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.transaction}</TableCell>
                          <TableCell>{log.client}</TableCell>
                          <TableCell>{log.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="audit">
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Security Audit Logs</h3>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log, index) => (
                        <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={log.status === "Success" 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : "bg-red-100 text-red-800 border-red-200"}
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="changes">
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Change Document Logs</h3>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Object</TableHead>
                        <TableHead>Object ID</TableHead>
                        <TableHead>Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {changeLogs.map((log, index) => (
                        <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.object}</TableCell>
                          <TableCell>{log.objectID}</TableCell>
                          <TableCell>{log.change}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="py-6">
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">AI Analysis Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border border-border">
                      <h4 className="text-base font-medium mb-3">Activity Alignment</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex-1 mr-4">
                          <Progress value={aiInsights.alignment} className="h-2" />
                        </div>
                        <span className="text-sm font-semibold">{aiInsights.alignment}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Match between performed activities and requested purpose
                      </p>
                    </Card>
                    
                    <Card className="p-6 border border-border">
                      <h4 className="text-base font-medium mb-3">Ownership</h4>
                      <div className="flex flex-col">
                        <div className="mb-2">
                          <Badge className="bg-pam-blue-light text-pam-blue">
                            {aiInsights.ownership}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Primary area of responsibility for performed actions
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-3">Red Flags</h3>
                  <Card className="p-4 border border-border">
                    <ul className="space-y-3">
                      {aiInsights.redFlags.map((flag, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-3">Recommendations</h3>
                  <Card className="p-4 border border-border">
                    <ul className="space-y-3">
                      {aiInsights.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-3">Risk & Compliance Scores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border border-border">
                      <h4 className="text-base font-medium mb-3">Compliance Score</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex-1 mr-4">
                          <Progress value={aiInsights.complianceScore} className="h-2" />
                        </div>
                        <span className="text-sm font-semibold">{aiInsights.complianceScore}/100</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Measures adherence to compliance policies
                      </p>
                    </Card>
                    
                    <Card className="p-6 border border-border">
                      <h4 className="text-base font-medium mb-3">Risk Score</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex-1 mr-4">
                          <Progress value={aiInsights.riskScore} className="h-2 bg-muted" 
                            indicatorClassName={cn(
                              aiInsights.riskScore > 75 ? "bg-red-500" : 
                              aiInsights.riskScore > 50 ? "bg-amber-500" : 
                              "bg-green-500"
                            )} 
                          />
                        </div>
                        <span className="text-sm font-semibold">{aiInsights.riskScore}/100</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Assesses potential risk associated with activities
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default ApprovalInbox;
