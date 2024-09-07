"use server";
import { setCredentialsToAPI, setBasePathToAPI } from "@/lib/utils";
import {
  BillingService,
  OneTimePaymentProduct,
  SubscriptionPlan,
} from "@/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getSubscriptionPlans() {
  try {
    setBasePathToAPI();
    const subscription_plans = await BillingService.billingPlansList();
    return subscription_plans;
  } catch (error) {
    throw error;
  }
}

export async function getOneTimePaymentProducts() {
  try {
    setBasePathToAPI();
    const products = await BillingService.billingOneTimePaymentProductsList();
    return products;
  } catch (error) {
    throw error;
  }
}

export async function getSubscriptionPlan(id: number) {
  try {
    setBasePathToAPI();
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

export async function getOneTimePaymentProduct(id: number) {
  try {
    setBasePathToAPI();
    const one_time_payment_product =
      await BillingService.billingOneTimePaymentProductsRetrieve({
        id: id,
      });
    return one_time_payment_product;
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
          email: session.user.email,
          user_id: session.user.pk,
          variant_id: subscriptionPlan.variant_id,
        },
      });
    return checkout.url;
  } catch (error) {
    return undefined;
  }
}

export async function getCheckoutURLProduct(product: OneTimePaymentProduct) {
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
          email: session.user.email,
          user_id: session.user.pk,
          variant_id: product.variant_id,
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
        userId: session.user.pk,
      });
    return subscription;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getUserOrder() {
  try {
    await setCredentialsToAPI();
    const session: any = await getServerSession(authOptions);
    const order = await BillingService.billingOrderGetUserOrderRetrieve({
      userId: session.user.pk,
    });
    return order;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getUserHasAccess() {
  try {
    await setCredentialsToAPI();
    const access = await BillingService.billingOrderUserHasAccessRetrieve();
    return access.has_access;
  } catch (error) {
    console.error(error);
    return false;
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

export async function getCustomerReceiptURL(orderId: number) {
  try {
    await setCredentialsToAPI();
    const receipt = await BillingService.billingOrderGetCustomerReceiptRetrieve(
      {
        id: orderId,
      }
    );
    return receipt["url"];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
