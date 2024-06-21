/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OneTimePaymentProduct = {
    readonly id: number;
    product_id: number;
    product_name: string;
    product_description?: string | null;
    variant_id: number;
    name: string;
    description: string;
    price: string;
    is_usage_based?: boolean;
    interval: string;
    interval_count: number;
    trial_interval?: string | null;
    trial_interval_count?: number | null;
    sort: number;
};

