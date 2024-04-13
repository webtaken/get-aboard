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

export async function getSubscriptionPlan(id: number) {
  try {
    const subscription_plan = await BillingService.billingPlansRetrieve({
      id: id,
    });
    return subscription_plan;
  } catch (error: any) {
    if (error.status === 404) {
      return undefined;
    }
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

export async function getUserSubscription() {
  try {
    await setCredentialsToAPI();
    const session: any = await getServerSession(authOptions);
    const subscription =
      await BillingService.billingSubscriptionGetUserSubscriptionRetrieve({
        userId: session.django_data.user.pk,
      });
    return subscription;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getCustomerPortalURL(subscriptionId: number) {
  try {
    await setCredentialsToAPI();
    const portal =
      await BillingService.billingSubscriptionGetCustomerPortalRetrieve({
        id: subscriptionId,
      });
    return portal["url"];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
