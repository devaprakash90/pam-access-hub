
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Tile";
import {
  BarChart3,
  Calendar,
  Clock,
  ClipboardList,
  FileText,
  FileUp,
  FolderCog,
  InboxIcon,
  ListChecks,
  ListChecksIcon,
  LogOut,
  PlusCircle,
  Trash2,
  Users
} from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block bg-pam-blue-light text-pam-blue text-sm font-medium px-3 py-1 rounded-full mb-4">
            Welcome to PAM
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Privileged Access Management
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Securely manage privileged access to production systems, track activities, and streamline approval workflows.
          </p>
        </div>

        <Section title="Request Management" description="Submit and manage access requests">
          <Tile
            title="Submit Request"
            description="Request new privileged access"
            icon={PlusCircle}
            to="/submit-request"
          />
          <Tile
            title="My Requests"
            description="View your submitted requests"
            icon={ClipboardList}
            to="/my-requests"
          />
          <Tile
            title="Manage Requests"
            description="Handle incomplete requests"
            icon={ListChecks}
            to="/manage-requests"
          />
        </Section>

        <Section title="Approval Management" description="Review and approve access requests">
          <Tile
            title="Approval Inbox"
            description="Review pending approvals"
            icon={InboxIcon}
            badge={5}
            to="/approval-inbox"
          />
        </Section>

        <Section title="Reporting & Analytics" description="View logs and analyze request data">
          <Tile
            title="Provisioning Logs"
            description="View provisioning logs"
            icon={FileText}
            to="/provisioning-logs"
          />
          <Tile
            title="Firefighter Requests"
            description="Detailed request information"
            icon={Users}
            to="/firefighter-requests"
          />
          <Tile
            title="Analytics Dashboard"
            description="Visualize request trends"
            icon={BarChart3}
            to="/analytics"
          />
        </Section>

        <Section title="Job & Logs Management" description="Manage scheduled jobs and logs">
          <Tile
            title="Scheduled Jobs"
            description="View and manage scheduled jobs"
            icon={Calendar}
            to="/scheduled-jobs"
          />
          <Tile
            title="Job Logs"
            description="View job execution logs"
            icon={Clock}
            to="/job-logs"
          />
          <Tile
            title="Delete Logs"
            description="Manage log retention"
            icon={Trash2}
            to="/delete-logs"
          />
        </Section>
      </div>
    </MainLayout>
  );
};

export default Index;
