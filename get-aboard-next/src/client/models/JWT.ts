/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomUserDetails } from './CustomUserDetails';

/**
 * Serializer for JWT authentication.
 */
export type JWT = {
    access: string;
    refresh: string;
    user: CustomUserDetails;
};

