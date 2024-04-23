/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Error500 } from './Error500';
import type { ServerErrorEnum } from './ServerErrorEnum';

export type ErrorResponse500 = {
    type: ServerErrorEnum;
    errors: Array<Error500>;
};

