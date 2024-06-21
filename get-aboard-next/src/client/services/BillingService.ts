/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutURL } from '../models/CheckoutURL';
import type { CustomerPortalURL } from '../models/CustomerPortalURL';
import type { GetCheckoutURLRequest } from '../models/GetCheckoutURLRequest';
import type { HasAccess } from '../models/HasAccess';
import type { OneTimePaymentProduct } from '../models/OneTimePaymentProduct';
import type { Order } from '../models/Order';
import type { Subscription } from '../models/Subscription';
import type { SubscriptionPlan } from '../models/SubscriptionPlan';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BillingService {

    /**
     * @returns OneTimePaymentProduct
     * @throws ApiError
     */
    public static billingOneTimePaymentProductsList(): CancelablePromise<Array<OneTimePaymentProduct>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/one-time-payment-products/',
        });
    }

    /**
     * @returns OneTimePaymentProduct
     * @throws ApiError
     */
    public static billingOneTimePaymentProductsRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this one time payment product.
         */
        id: number,
    }): CancelablePromise<OneTimePaymentProduct> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/one-time-payment-products/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Order
     * @throws ApiError
     */
    public static billingOrderRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this order.
         */
        id: number,
    }): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/order/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Retrieves the customer receipt url of an order
     * @returns CustomerPortalURL
     * @throws ApiError
     */
    public static billingOrderGetCustomerReceiptRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this order.
         */
        id: number,
    }): CancelablePromise<CustomerPortalURL> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/order/{id}/get_customer_receipt/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns CheckoutURL
     * @throws ApiError
     */
    public static billingOrderGetCheckoutUrlCreate({
        requestBody,
    }: {
        requestBody: GetCheckoutURLRequest,
    }): CancelablePromise<CheckoutURL> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/billing/order/get_checkout_url/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieves the current purchase of the given user_id
     * @returns Order
     * @throws ApiError
     */
    public static billingOrderGetUserOrderRetrieve({
        userId,
    }: {
        /**
         * The user id requesting his subscriptions
         */
        userId: number,
    }): CancelablePromise<Order> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/order/get_user_order/',
            query: {
                'user_id': userId,
            },
        });
    }

    /**
     * Checks if the user has access depending if he has bought the product
     * @returns HasAccess
     * @throws ApiError
     */
    public static billingOrderUserHasAccessRetrieve(): CancelablePromise<HasAccess> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/order/user_has_access/',
        });
    }

    /**
     * @returns SubscriptionPlan
     * @throws ApiError
     */
    public static billingPlansList(): CancelablePromise<Array<SubscriptionPlan>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/plans/',
        });
    }

    /**
     * @returns SubscriptionPlan
     * @throws ApiError
     */
    public static billingPlansRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this subscription plan.
         */
        id: number,
    }): CancelablePromise<SubscriptionPlan> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/plans/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Subscription
     * @throws ApiError
     */
    public static billingSubscriptionRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this subscription.
         */
        id: number,
    }): CancelablePromise<Subscription> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/subscription/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Retrieves the customer portal url of a subscription
     * @returns CustomerPortalURL
     * @throws ApiError
     */
    public static billingSubscriptionGetCustomerPortalRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this subscription.
         */
        id: number,
    }): CancelablePromise<CustomerPortalURL> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/subscription/{id}/get_customer_portal/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns CheckoutURL
     * @throws ApiError
     */
    public static billingSubscriptionGetCheckoutUrlCreate({
        requestBody,
    }: {
        requestBody: GetCheckoutURLRequest,
    }): CancelablePromise<CheckoutURL> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/billing/subscription/get_checkout_url/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieves the current subscription of the given user_id
     * @returns Subscription
     * @throws ApiError
     */
    public static billingSubscriptionGetUserSubscriptionRetrieve({
        userId,
    }: {
        /**
         * The user id requesting his subscriptions
         */
        userId: number,
    }): CancelablePromise<Subscription> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/billing/subscription/get_user_subscription/',
            query: {
                'user_id': userId,
            },
        });
    }

    /**
     * Handle events happening on lemonsqueezy (subscription created and updated).
     * @returns any No response body
     * @throws ApiError
     */
    public static billingWebhookCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/billing/webhook',
        });
    }

}
