"use server";
import { setCredentialsToAPI } from "@/lib/utils";
import { SubscriptionPlansService } from "@/client";

export async function getSubscriptionPlans() {
  try {
    const subscription_plans =
      await SubscriptionPlansService.subscriptionPlansList();
    return subscription_plans;
  } catch (error) {
    throw error;
  }
}
