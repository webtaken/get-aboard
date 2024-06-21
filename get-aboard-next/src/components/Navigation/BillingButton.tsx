"use client";
import {
  OneTimePaymentProduct,
  Order,
  Subscription,
  SubscriptionPlan,
} from "@/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import {
  getCustomerPortalURL,
  getCustomerReceiptURL,
} from "@/lib/billing-actions";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function BillingButton({
  subscription,
  subscriptionPlan,
  variant,
}: {
  subscription: Subscription | Order;
  subscriptionPlan: SubscriptionPlan | OneTimePaymentProduct;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  const [loading, setLoading] = useState(false);

  let statusIcon = "🎉";
  if (
    "subscription_item_id" in subscription &&
    subscription.status !== "active"
  ) {
    statusIcon = "❓";
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            className="rounded-xl flex items-center gap-x-2"
            onClick={async () => {
              setLoading(true);
              let url: string | undefined;
              if ("subscription_item_id" in subscription) {
                url = await getCustomerPortalURL(+subscription.lemonsqueezy_id);
              } else {
                url = await getCustomerReceiptURL(
                  +subscription.lemonsqueezy_id
                );
              }
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
            {subscriptionPlan.product_name} {statusIcon}
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
