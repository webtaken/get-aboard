/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Subscription = {
    readonly id: number;
    lemonsqueezy_id: string;
    order_id: number;
    name: string;
    email: string;
    status: string;
    status_formatted: string;
    renews_at: string;
    ends_at: string;
    trial_ends_at: string;
    price?: string;
    is_usage_based?: boolean;
    is_paused?: boolean;
    subscription_item_id?: number | null;
    user?: number | null;
    plan?: number | null;
};

