"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SubscriptionPlan } from "@/client";
import { getCheckoutURL } from "@/lib/billing-actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";

export default function PlanButton({
  plans,
  isLoggedIn,
}: {
  plans: SubscriptionPlan[];
  isLoggedIn: boolean;
}) {
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <Button variant="outline" asChild>
        <Link href={`/login?next=${encodeURIComponent("/pricing")}`}>
          Get started
        </Link>
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={async () => {
        setLoading(true);
        const url = await getCheckoutURL(plans[0]);
        setLoading(false);
        if (!url) {
          toast({
            variant: "destructive",
            description: "Could not fetch subscription plan data",
          });
        } else {
          window.open(url, "_blank");
        }
      }}
      className="flex items-center gap-x-2"
      disabled={loading}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />} Get started
    </Button>
  );
}
