"use server";
import { setCredentialsToAPI } from "@/lib/utils";
import { BillingService } from "@/client";

export async function getSubscriptionPlans() {
  try {
    const subscription_plans = await BillingService.billingPlansList();
    return subscription_plans;
  } catch (error) {
    throw error;
  }
}
