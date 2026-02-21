import { verifyAdmin } from "@/actions/admin";
import PageHeader from "@/components/page-header";
import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CreditCard, ShieldCheck, Users } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Admin Settings - MediMeet",
  description: "Manage doctors, patients, and platform settings",
};

const AdminLayout = async ({ children }) => {
    const isAdmin = await verifyAdmin();
    
    if (!isAdmin) {
        redirect("/onboarding");
    }

     return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader icon={<ShieldCheck />} title="Admin Settings" />
        
        <Tabs
          defaultValue="pending"
          orientation="vertical"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <TabsList className="md:col-span-1 w-full flex md:flex-col gap-2 bg-muted/30 border p-2 rounded-md">
            <TabsTrigger 
              value="pending"
              className="w-full flex items-center justify-center md:justify-start md:px-4 md:py-3"
          >
              <AlertCircle className="h-4 w-4 mr-2 hidden md:inline" />
              <span>Pending Verification</span>
            </TabsTrigger>
            <TabsTrigger 
              value="doctors"
              className="w-full flex items-center justify-center md:justify-start md:px-4 md:py-3"
            >
                <Users className="h-4 w-4 mr-2 hidden md:inline" />
                <span>Doctors</span>
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="w-full flex items-center justify-center md:justify-start md:px-4 md:py-3"
          >
            <CreditCard className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Payouts</span>
          </TabsTrigger>
          </TabsList>

          <div className="md:col-span-3">{children}</div>
        </Tabs>
      </div>

  );
};
export default AdminLayout;
