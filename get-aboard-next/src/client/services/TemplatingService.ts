/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlowTemplate } from '../models/FlowTemplate';
import type { Name } from '../models/Name';
import type { PatchedFlowTemplate } from '../models/PatchedFlowTemplate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TemplatingService {

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingList(): CancelablePromise<Array<FlowTemplate>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/',
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingCreate({
        requestBody,
    }: {
        requestBody: FlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/templating/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingRetrieve({
        id,
    }: {
        id: string,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: FlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/templating/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingPartialUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: PatchedFlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/templating/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public static templatingDestroy({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/templating/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingTagsList(): CancelablePromise<Array<FlowTemplate>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/tags/',
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingTagsCreate({
        requestBody,
    }: {
        requestBody: FlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/templating/tags/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingTagsRetrieve({
        id,
    }: {
        id: string,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/tags/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingTagsUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: FlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/templating/tags/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingTagsPartialUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: PatchedFlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/templating/tags/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public static templatingTagsDestroy({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/templating/tags/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Name
     * @throws ApiError
     */
    public static templatingTagsNameListList({
        name,
    }: {
        name?: string,
    }): CancelablePromise<Array<Name>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/tags/name/list',
            query: {
                'name': name,
            },
        });
    }

}
