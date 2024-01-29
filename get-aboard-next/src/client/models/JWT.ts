/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDetails } from './UserDetails';

/**
 * Serializer for JWT authentication.
 */
export type JWT = {
    access: string;
    refresh: string;
    user: UserDetails;
};

