/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MarketingService {

    /**
     * Get Emails
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getEmailsGetEmailsGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-emails',
        });
    }

    /**
     * Register Email
     * @returns any Successful Response
     * @throws ApiError
     */
    public static registerEmailRegisterEmailPost({
        email,
    }: {
        email: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register-email',
            query: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
