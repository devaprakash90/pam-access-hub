
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, User, Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data
const sapSystems = [
  { value: "PRD", label: "Production" },
  { value: "QAS", label: "Quality Assurance" },
  { value: "DEV", label: "Development" },
];

const firefighterIds = [
  { value: "FF_SEC_01", label: "FF_SEC_01 (Security)" },
  { value: "FF_SEC_02", label: "FF_SEC_02 (Security)" },
  { value: "FF_ABAP_01", label: "FF_ABAP_01 (ABAP)" },
  { value: "FF_ABAP_02", label: "FF_ABAP_02 (ABAP)" },
  { value: "FF_BASIS_01", label: "FF_BASIS_01 (Basis)" },
  { value: "FF_BASIS_02", label: "FF_BASIS_02 (Basis)" },
  { value: "FF_FUNC_01", label: "FF_FUNC_01 (Functional)" },
  { value: "FF_FUNC_02", label: "FF_FUNC_02 (Functional)" },
];

const users = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", managerId: "5" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", managerId: "6" },
  { id: "3", name: "Robert Johnson", email: "robert.johnson@example.com", managerId: "5" },
  { id: "4", name: "Emily Davis", email: "emily.davis@example.com", managerId: "6" },
];

const managers = [
  { id: "5", name: "Michael Wilson", email: "michael.wilson@example.com" },
  { id: "6", name: "Sarah Brown", email: "sarah.brown@example.com" },
];

const SubmitRequest = () => {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestType, setRequestType] = useState("self");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [sapSystem, setSapSystem] = useState<string | null>(null);
  const [firefighterId, setFirefighterId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [ticket, setTicket] = useState("");
  const [transactions, setTransactions] = useState("");
  const [activities, setActivities] = useState("");
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestNumber, setRequestNumber] = useState("");

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedManager(user.managerId);
    }
    setOpenUserSearch(false);
  };

  const getManagerName = (managerId: string | null) => {
    if (!managerId) return "";
    const manager = managers.find((m) => m.id === managerId);
    return manager ? manager.name : "";
  };

  const getUserName = (userId: string | null) => {
    if (!userId) return "";
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (requestType === "others" && !selectedUser) {
      toast({
        title: "Error",
        description: "Please select a user",
        variant: "destructive",
      });
      return;
    }
    
    if (!sapSystem) {
      toast({
        title: "Error",
        description: "Please select a SAP system",
        variant: "destructive",
      });
      return;
    }
    
    if (!firefighterId) {
      toast({
        title: "Error",
        description: "Please select a Firefighter ID",
        variant: "destructive",
      });
      return;
    }
    
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select start and end dates",
        variant: "destructive",
      });
      return;
    }
    
    if (!ticket) {
      toast({
        title: "Error",
        description: "Please enter an ITSM ticket or project code",
        variant: "destructive",
      });
      return;
    }
    
    if (!activities) {
      toast({
        title: "Error",
        description: "Please describe the activities to perform",
        variant: "destructive",
      });
      return;
    }

    // Generate request number
    const reqNum = Math.floor(100000 + Math.random() * 900000);
    setRequestNumber(`REQFF${reqNum}`);
    setShowSuccess(true);
  };

  const handleClear = () => {
    setRequestType("self");
    setSelectedUser(null);
    setSelectedManager(null);
    setSapSystem(null);
    setFirefighterId(null);
    setStartDate(null);
    setEndDate(null);
    setTicket("");
    setTransactions("");
    setActivities("");
  };

  return (
    <MainLayout title="Submit Privileged Access Request" showBackButton>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Card className="shadow-elevation">
          <CardHeader>
            <CardTitle>New Privileged Access Request</CardTitle>
            <CardDescription>
              Submit a request for privileged access to SAP systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Request For</Label>
                  <RadioGroup
                    value={requestType}
                    onValueChange={setRequestType}
                    className="flex flex-col sm:flex-row gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="self" id="self" />
                      <Label htmlFor="self" className="cursor-pointer">Self</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="others" id="others" />
                      <Label htmlFor="others" className="cursor-pointer">Others</Label>
                    </div>
                  </RadioGroup>
                </div>

                {requestType === "others" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="user">User</Label>
                      <Popover open={openUserSearch} onOpenChange={setOpenUserSearch}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openUserSearch}
                            className="w-full justify-between bg-white"
                          >
                            {selectedUser
                              ? getUserName(selectedUser)
                              : "Search for a user..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0" align="start">
                          <Command>
                            <CommandInput 
                              placeholder="Search by name or email..." 
                              value={searchTerm}
                              onValueChange={setSearchTerm}
                            />
                            <CommandList>
                              <CommandEmpty>No users found.</CommandEmpty>
                              <CommandGroup>
                                {filteredUsers.map((user) => (
                                  <CommandItem
                                    key={user.id}
                                    value={user.id}
                                    onSelect={() => handleUserSelect(user.id)}
                                  >
                                    <User className="mr-2 h-4 w-4" />
                                    <span>{user.name}</span>
                                    {selectedUser === user.id && (
                                      <Check className="ml-auto h-4 w-4" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="manager">Manager</Label>
                      <Input
                        id="manager"
                        value={getManagerName(selectedManager)}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="system">SAP System</Label>
                  <Select value={sapSystem || ""} onValueChange={setSapSystem}>
                    <SelectTrigger id="system" className="w-full bg-white">
                      <SelectValue placeholder="Select a system" />
                    </SelectTrigger>
                    <SelectContent>
                      {sapSystems.map((system) => (
                        <SelectItem key={system.value} value={system.value}>
                          {system.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="firefighterId">Firefighter ID</Label>
                  <Select value={firefighterId || ""} onValueChange={setFirefighterId}>
                    <SelectTrigger id="firefighterId" className="w-full bg-white">
                      <SelectValue placeholder="Select a Firefighter ID" />
                    </SelectTrigger>
                    <SelectContent>
                      {firefighterIds.map((id) => (
                        <SelectItem key={id.value} value={id.value}>
                          {id.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date/Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="startDate"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date/Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="endDate"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => (startDate ? date < startDate : false)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="ticket">ITSM Ticket/Project Code</Label>
                  <Input
                    id="ticket"
                    value={ticket}
                    onChange={(e) => setTicket(e.target.value)}
                    placeholder="Enter ITSM ticket or project code"
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="transactions">
                    Transactions/Reports/Programs (Optional)
                  </Label>
                  <Textarea
                    id="transactions"
                    value={transactions}
                    onChange={(e) => setTransactions(e.target.value)}
                    placeholder="List relevant transactions, reports or programs"
                    className="resize-none h-20 bg-white"
                    maxLength={256}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {transactions.length}/256 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="activities">Activities to Perform</Label>
                  <Textarea
                    id="activities"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    placeholder="Describe the activities you need to perform"
                    className="resize-none h-32 bg-white"
                    maxLength={1024}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {activities.length}/1024 characters
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="w-full sm:w-auto"
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-pam-blue hover:bg-pam-blue-dark"
            >
              Submit Request
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Submitted Successfully</DialogTitle>
            <DialogDescription>
              Your request has been submitted and is awaiting approval.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Check className="h-8 w-8" />
              </div>
              <p className="text-lg font-medium mb-2">Request Number</p>
              <p className="text-2xl font-bold text-pam-blue">{requestNumber}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccess(false);
                handleClear();
              }}
              className="w-full bg-pam-blue hover:bg-pam-blue-dark"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default SubmitRequest;
