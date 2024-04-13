"use server";
import { setCredentialsToAPI } from "@/lib/utils";
import { BillingService, SubscriptionPlan } from "@/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getSubscriptionPlans() {
  try {
    const subscription_plans = await BillingService.billingPlansList();
    return subscription_plans;
  } catch (error) {
    throw error;
  }
}

export async function getCheckoutURL(subscriptionPlan: SubscriptionPlan) {
  try {
    await setCredentialsToAPI();
    const session: any = await getServerSession(authOptions);
    const checkout =
      await BillingService.billingSubscriptionGetCheckoutUrlCreate({
        requestBody: {
          receipt_button_text: "Go to Dashboard",
          receipt_thank_you_note: "Thank you for choosing get aboard",
          redirect_url: `${process.env.NEXT_PUBLIC_LOCALHOST}/dashboard`,
          embed: false,
          email: session.django_data.user.email,
          user_id: session.django_data.user.pk,
          variant_id: subscriptionPlan.variant_id,
        },
      });
    return checkout.url;
  } catch (error) {
    return undefined;
  }
}
