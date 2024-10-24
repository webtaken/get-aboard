/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Flow } from '../models/Flow';
import type { FlowShareURL } from '../models/FlowShareURL';
import type { Node } from '../models/Node';
import type { PatchedFlow } from '../models/PatchedFlow';
import type { PatchedNode } from '../models/PatchedNode';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FlowsService {

    /**
     * @returns Flow
     * @throws ApiError
     */
    public static flowsList(): CancelablePromise<Array<Flow>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/',
        });
    }

    /**
     * @returns Flow
     * @throws ApiError
     */
    public static flowsCreate({
        requestBody,
    }: {
        requestBody: Flow,
    }): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flows/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Flow
     * @throws ApiError
     */
    public static flowsRetrieve({
        id,
    }: {
        id: string,
    }): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Flow
     * @throws ApiError
     */
    public static flowsUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: Flow,
    }): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flows/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Flow
     * @throws ApiError
     */
    public static flowsPartialUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: PatchedFlow,
    }): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/flows/{id}/',
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
    public static flowsDestroy({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/flows/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns FlowShareURL
     * @throws ApiError
     */
    public static flowsShareFlowPartialUpdate({
        id,
        option,
        withPin,
    }: {
        id: string,
        /**
         * Sends the option to share only allowed: "view", "comment" or "edit"
         */
        option: string,
        /**
         * Specify if url will need an access pin
         */
        withPin: boolean,
    }): CancelablePromise<FlowShareURL> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/flows/{id}/share_flow/',
            path: {
                'id': id,
            },
            query: {
                'option': option,
                'with_pin': withPin,
            },
        });
    }

    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static flowsUnshareFlowPartialUpdate({
        field,
        id,
    }: {
        /**
         * Deletes the associated ShareOption model to the Flow depending on fields
         * if field equals 'url' we delete all the flow, if field equals 'pin' we delete only pin field
         * on the ShareOption model
         */
        field: string,
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/flows/{id}/unshare_flow/',
            path: {
                'id': id,
            },
            query: {
                'field': field,
            },
        });
    }

    /**
     * @returns FlowShareURL
     * @throws ApiError
     */
    public static flowsFlowsSharedGetShareOptionsRetrieve({
        id,
    }: {
        id: string,
    }): CancelablePromise<FlowShareURL> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/flows-shared/{id}/get_share_options/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns Flow
     * @throws ApiError
     */
    public static flowsFlowsSharedGetSharedFlowRetrieve({
        id,
        option,
        pin,
    }: {
        id: string,
        /**
         * Sends the option to share only allowed: "view", "comment" or "edit"
         */
        option: string,
        /**
         * The access pin in case share options will need it
         */
        pin?: string,
    }): CancelablePromise<Flow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/flows-shared/{id}/get_shared_flow/',
            path: {
                'id': id,
            },
            query: {
                'option': option,
                'pin': pin,
            },
        });
    }

    /**
     * @returns Node
     * @throws ApiError
     */
    public static flowsNodesList({
        description,
        flowId,
    }: {
        /**
         * includes the description of the nodes
         */
        description?: boolean,
        /**
         * get all the nodes related to this flow
         */
        flowId?: number,
    }): CancelablePromise<Array<Node>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/nodes/',
            query: {
                'description': description,
                'flow_id': flowId,
            },
        });
    }

    /**
     * @returns Node
     * @throws ApiError
     */
    public static flowsNodesCreate({
        requestBody,
    }: {
        requestBody: Node,
    }): CancelablePromise<Node> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flows/nodes/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Node
     * @throws ApiError
     */
    public static flowsNodesSharedRetrieve({
        nodeId,
    }: {
        /**
         * A unique integer value identifying this node.
         */
        nodeId: number,
    }): CancelablePromise<Node> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/nodes-shared/{node_id}/',
            path: {
                'node_id': nodeId,
            },
        });
    }

    /**
     * @returns Node
     * @throws ApiError
     */
    public static flowsNodesRetrieve({
        nodeId,
    }: {
        /**
         * A unique integer value identifying this node.
         */
        nodeId: number,
    }): CancelablePromise<Node> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flows/nodes/{node_id}/',
            path: {
                'node_id': nodeId,
            },
        });
    }

    /**
     * @returns Node
     * @throws ApiError
     */
    public static flowsNodesUpdate({
        nodeId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this node.
         */
        nodeId: number,
        requestBody: Node,
    }): CancelablePromise<Node> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/flows/nodes/{node_id}/',
            path: {
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Node
     * @throws ApiError
     */
    public static flowsNodesPartialUpdate({
        nodeId,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this node.
         */
        nodeId: number,
        requestBody?: PatchedNode,
    }): CancelablePromise<Node> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/flows/nodes/{node_id}/',
            path: {
                'node_id': nodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public static flowsNodesDestroy({
        nodeId,
    }: {
        /**
         * A unique integer value identifying this node.
         */
        nodeId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/flows/nodes/{node_id}/',
            path: {
                'node_id': nodeId,
            },
        });
    }

}
