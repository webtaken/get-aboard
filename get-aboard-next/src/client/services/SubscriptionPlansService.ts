/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPlan } from '../models/SubscriptionPlan';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SubscriptionPlansService {

    /**
     * @returns SubscriptionPlan
     * @throws ApiError
     */
    public static subscriptionPlansList(): CancelablePromise<Array<SubscriptionPlan>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription-plans/',
        });
    }

}
