import React from "react";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import { getDoctorAppointments, getDoctorAvailability } from "@/actions/doctor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { AvailabilitySettings } from "./_components/availability-settings";
import DoctorAppointmentsList from "./_components/appointments-list";
import { getDoctorEarnings, getDoctorPayouts } from "@/actions/payout";
import { DoctorEarnings } from "./_components/doctor-earnings";



const DoctorDashboardPage = async () => {
  const user = await getCurrentUser();

  const [appointmentsData, availabilityData, earningsData, payoutsData] = await Promise.all([
      getDoctorAppointments(),
      getDoctorAvailability(),
      getDoctorEarnings(),
      getDoctorPayouts(),

  ]);


 if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  return (
    <Tabs
      defaultValue="earnings"
      orientation="vertical"
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      <TabsList className="md:col-span-1 w-full flex md:flex-col gap-2 bg-muted/30 border p-2 rounded-md">
        <TabsTrigger
          value="earnings"
          className="w-full flex items-center justify-center md:justify-start md:px-4 md:py-3"
      >
        <DollarSign className="h-4 w-4 mr-2 hidden md:inline" />
         <span>Earnings</span>
        </TabsTrigger>
        <TabsTrigger
          value="appointments"
          className="w-full flex items-center justify-center md:justify-start md:px-4 md:py-3"
        >
          <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Appointments</span>
        </TabsTrigger>
        <TabsTrigger
          value="availability"
          className="w-full flex items-center justify-center md:justify-start md:px-4 md:py-3"
        >
          <Clock className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Availability</span>
        </TabsTrigger>
      </TabsList>
      <div className="md:col-span-3">
        <TabsContent value="appointments" className="border-none p-0">
          <DoctorAppointmentsList
            appointments={appointmentsData.appointments || []}
          />
        </TabsContent>
        <TabsContent value="availability" className="border-none p-0">
          <AvailabilitySettings slots={availabilityData.slots || []} />
        </TabsContent>
        <TabsContent value="earnings" className="border-none p-0">
          <DoctorEarnings
            earnings={earningsData.earnings || {}}
            payouts={payoutsData.payouts || []}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default DoctorDashboardPage;


