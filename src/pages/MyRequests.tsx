
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const requests = [
  {
    id: "REQFF000001",
    requestedBy: "John Doe",
    requestedFor: "Self",
    firefighterId: "FF_ABAP_01",
    status: "Completed",
    createdOn: "2023-05-15 09:30:22",
  },
  {
    id: "REQFF000002",
    requestedBy: "John Doe",
    requestedFor: "Emily Davis",
    firefighterId: "FF_SEC_01",
    status: "Awaiting Approval",
    createdOn: "2023-05-18 14:22:10",
  },
  {
    id: "REQFF000003",
    requestedBy: "John Doe",
    requestedFor: "Self",
    firefighterId: "FF_BASIS_01",
    status: "Requested",
    createdOn: "2023-05-20 11:15:46",
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

const MyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (requestId: string) => {
    setSelectedRequest(requestId);
    setDetailsOpen(true);
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
    <MainLayout title="My Requests" showBackButton>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <Card className="shadow-elevation overflow-hidden">
          <Table>
            <TableCaption>A list of your submitted requests</TableCaption>
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
              {requests.map((request) => (
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
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Detailed information for request {selectedRequest}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
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
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default MyRequests;
