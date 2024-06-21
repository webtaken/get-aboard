"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { OneTimePaymentProduct, SubscriptionPlan } from "@/client";
import { getCheckoutURL, getCheckoutURLProduct } from "@/lib/billing-actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";

export default function ProductButton({
  products,
  isLoggedIn,
}: {
  products: OneTimePaymentProduct[];
  isLoggedIn: boolean;
}) {
  const [loading, setLoading] = useState(false);
  if (!isLoggedIn) {
    return (
      <Button className="rounded-lg" asChild>
        <Link href={`/login?next=${encodeURIComponent("/")}`}>
          Get get-aboard
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const url = await getCheckoutURLProduct(products[0]);
        setLoading(false);
        if (!url) {
          toast({
            variant: "destructive",
            description: "Could not fetch product plan data",
          });
        } else {
          window.open(url, "_blank");
        }
      }}
      className="flex items-center gap-x-2 rounded-lg"
      disabled={loading}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />} Get get-aboard
    </Button>
  );
}
