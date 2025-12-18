/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateIntegrationRequest } from '../models/CreateIntegrationRequest';
import type { Integration } from '../models/Integration';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IntegrationsService {
    /**
     * List configured integrations
     * @returns Integration List of integrations
     * @throws ApiError
     */
    public static listIntegrations(): CancelablePromise<Array<Integration>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/integrations',
        });
    }
    /**
     * Create a new integration
     * @returns Integration Integration created
     * @throws ApiError
     */
    public static createIntegration({
        requestBody,
    }: {
        requestBody: CreateIntegrationRequest,
    }): CancelablePromise<Integration> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/integrations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get integration by id
     * @returns Integration Integration details
     * @throws ApiError
     */
    public static getIntegration({
        id,
    }: {
        id: string,
    }): CancelablePromise<Integration> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/integrations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Trigger a sync for this integration
     * @returns any Sync started
     * @throws ApiError
     */
    public static syncIntegration({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/integrations/{id}',
            path: {
                'id': id,
            },
        });
    }
}
