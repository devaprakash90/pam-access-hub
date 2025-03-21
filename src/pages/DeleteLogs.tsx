
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, Info, Trash2 } from "lucide-react";

const DeleteLogs = () => {
  const [transactionLogsAge, setTransactionLogsAge] = useState("90");
  const [auditLogsAge, setAuditLogsAge] = useState("180");
  const [changeLogsAge, setChangeLogsAge] = useState("365");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deleteComplete, setDeleteComplete] = useState(false);
  
  const handleDelete = () => {
    setIsConfirming(false);
    setIsDeleting(true);
    
    // Simulate deletion progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsDeleting(false);
        setDeleteComplete(true);
      }
    }, 500);
  };

  return (
    <MainLayout title="Delete Logs" showBackButton>
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Caution</AlertTitle>
          <AlertDescription className="text-amber-700">
            Deleting logs is a permanent action and cannot be undone. Make sure you have appropriate backups before proceeding.
          </AlertDescription>
        </Alert>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Log Retention Management</h2>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Transaction Usage Logs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Delete logs older than (days)
                    </label>
                    <Input 
                      type="number" 
                      value={transactionLogsAge} 
                      onChange={(e) => setTransactionLogsAge(e.target.value)}
                      min="30"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="text-sm text-muted-foreground">
                      Logs before {new Date(Date.now() - parseInt(transactionLogsAge) * 24 * 60 * 60 * 1000).toLocaleDateString()} will be deleted
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Audit Logs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Delete logs older than (days)
                    </label>
                    <Input 
                      type="number" 
                      value={auditLogsAge} 
                      onChange={(e) => setAuditLogsAge(e.target.value)}
                      min="30"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="text-sm text-muted-foreground">
                      Logs before {new Date(Date.now() - parseInt(auditLogsAge) * 24 * 60 * 60 * 1000).toLocaleDateString()} will be deleted
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Document Logs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Delete logs older than (days)
                    </label>
                    <Input 
                      type="number" 
                      value={changeLogsAge} 
                      onChange={(e) => setChangeLogsAge(e.target.value)}
                      min="30"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="text-sm text-muted-foreground">
                      Logs before {new Date(Date.now() - parseInt(changeLogsAge) * 24 * 60 * 60 * 1000).toLocaleDateString()} will be deleted
                    </div>
                  </div>
                </div>
              </div>
              
              {isDeleting && (
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between text-sm">
                    <span>Deleting logs...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2" 
                    indicatorClassName={progress < 100 ? "bg-blue-500" : "bg-green-500"}
                  />
                </div>
              )}
              
              {deleteComplete && (
                <Alert className="mt-6 border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Deletion Complete</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Logs have been successfully deleted according to the specified retention periods.
                  </AlertDescription>
                </Alert>
              )}
              
              {isConfirming && (
                <Alert className="mt-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Confirm Deletion</AlertTitle>
                  <AlertDescription className="text-red-700">
                    Are you sure you want to delete logs older than the specified periods? This action cannot be undone.
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => setIsConfirming(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleDelete}>
                        Yes, Delete Logs
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {!isConfirming && !isDeleting && !deleteComplete && (
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex items-center gap-1"
                    onClick={() => setIsConfirming(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Logs
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DeleteLogs;
