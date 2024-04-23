"use client";
import { Subscription, SubscriptionPlan } from "@/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { getCustomerPortalURL } from "@/lib/billing-actions";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function BillingButton({
  subscription,
  subscriptionPlan,
}: {
  subscription: Subscription;
  subscriptionPlan: SubscriptionPlan;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-xl flex items-center gap-x-2"
            onClick={async () => {
              setLoading(true);
              const url = await getCustomerPortalURL(
                +subscription.lemonsqueezy_id
              );
              setLoading(false);
              if (url) {
                window.open(url, "_blank");
              } else {
                toast({
                  variant: "destructive",
                  description:
                    "Could not retrieve billing portal, try again later or contact support!",
                });
              }
            }}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {subscriptionPlan.product_name}{" "}
            {subscription.status === "active" ? "🎉" : "❓"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold text-xs">
            {subscription.status_formatted}
          </p>
          <p className="text-xs">Click to manage your billing!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
