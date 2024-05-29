/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlowTemplate } from '../models/FlowTemplate';
import type { Name } from '../models/Name';
import type { PatchedFlowTemplate } from '../models/PatchedFlowTemplate';
import type { PatchedTag } from '../models/PatchedTag';
import type { Tag } from '../models/Tag';

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
        flow,
    }: {
        /**
         * A unique value identifying this flow template.
         */
        flow: number,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/{flow}/',
            path: {
                'flow': flow,
            },
        });
    }

    /**
     * @returns FlowTemplate
     * @throws ApiError
     */
    public static templatingUpdate({
        flow,
        requestBody,
    }: {
        /**
         * A unique value identifying this flow template.
         */
        flow: number,
        requestBody: FlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/templating/{flow}/',
            path: {
                'flow': flow,
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
        flow,
        requestBody,
    }: {
        /**
         * A unique value identifying this flow template.
         */
        flow: number,
        requestBody?: PatchedFlowTemplate,
    }): CancelablePromise<FlowTemplate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/templating/{flow}/',
            path: {
                'flow': flow,
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
        flow,
    }: {
        /**
         * A unique value identifying this flow template.
         */
        flow: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/templating/{flow}/',
            path: {
                'flow': flow,
            },
        });
    }

    /**
     * @returns Tag
     * @throws ApiError
     */
    public static templatingTagsList(): CancelablePromise<Array<Tag>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/tags/',
        });
    }

    /**
     * @returns Tag
     * @throws ApiError
     */
    public static templatingTagsCreate({
        requestBody,
    }: {
        requestBody: Tag,
    }): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/templating/tags/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Tag
     * @throws ApiError
     */
    public static templatingTagsRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this tag.
         */
        id: number,
    }): CancelablePromise<Tag> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templating/tags/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Tag
     * @throws ApiError
     */
    public static templatingTagsUpdate({
        id,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this tag.
         */
        id: number,
        requestBody: Tag,
    }): CancelablePromise<Tag> {
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
     * @returns Tag
     * @throws ApiError
     */
    public static templatingTagsPartialUpdate({
        id,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this tag.
         */
        id: number,
        requestBody?: PatchedTag,
    }): CancelablePromise<Tag> {
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
        /**
         * A unique integer value identifying this tag.
         */
        id: number,
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
