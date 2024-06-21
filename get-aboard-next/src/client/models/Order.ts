/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Order = {
    readonly id: number;
    lemonsqueezy_id: string;
    order_id: number;
    order_number: number;
    name: string;
    email: string;
    status: string;
    status_formatted: string;
    refunded?: boolean;
    refunded_at: string;
    price?: string;
    receipt?: string | null;
    order_item_id?: number | null;
    user?: number | null;
    one_time_payment_product?: number | null;
};

