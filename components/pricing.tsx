"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const INR_RATE = 85; // ₹ per $ for display only; checkout stays in USD

const plans = [
  {
    name: "Basic (Free)",
    usd: 0,
    credits: "1 free consult (2 credits)",
    perks: ["Always free", "2 credits"],
    cta: "Active",
    disabled: true,
  },
  {
    name: "Standard",
    usd: 100,
    credits: "10 credits (up to 5 consults)",
    perks: ["Billed monthly", "Best for regular care"],
    cta: "Subscribe",
  },
  {
    name: "Premium",
    usd: 200,
    credits: "24 credits (up to 12 consults)",
    perks: ["Billed monthly", "For families or heavy use"],
    cta: "Subscribe",
  },
];

const Pricing = () => {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const inr = plan.usd * INR_RATE;
          return (
            <Card
              key={plan.name}
              className="border-emerald-900/30 bg-gradient-to-b from-emerald-950/30 to-transparent shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  {plan.disabled ? (
                    <Badge variant="outline" className="bg-emerald-900/30">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-emerald-900/20">
                      INR
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{plan.credits}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-4xl font-bold text-white">
                    ₹{inr.toLocaleString("en-IN")}
                  </p>
                  {plan.disabled ? (
                    <p className="text-xs text-muted-foreground">Always free</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Display price only; checkout bills in USD at ₹{INR_RATE}/$
                    </p>
                  )}
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={plan.disabled}
                  onClick={() => !plan.disabled && setShowCheckout(true)}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">Complete your subscription</DialogTitle>
            <DialogDescription>
              Charged in USD via Clerk/Stripe. INR prices on cards were for display at ₹{INR_RATE} per $.
            </DialogDescription>
          </DialogHeader>
          <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: {
                    zIndex: 2200,
                  },
                },
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Pricing;