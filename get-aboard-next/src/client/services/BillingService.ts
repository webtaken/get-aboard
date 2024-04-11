/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutURL } from '../models/CheckoutURL';
import type { GetCheckoutURLRequest } from '../models/GetCheckoutURLRequest';
import type { Subscription } from '../models/Subscription';
import type { SubscriptionPlan } from '../models/SubscriptionPlan';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BillingService {

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

}
