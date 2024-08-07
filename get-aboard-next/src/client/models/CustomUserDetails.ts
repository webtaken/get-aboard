/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * User model w/o password
 */
export type CustomUserDetails = {
    readonly pk: number;
    /**
     * Designates whether the user can log into this admin site.
     */
    is_staff?: boolean;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    readonly email: string;
    first_name?: string;
    last_name?: string;
};

