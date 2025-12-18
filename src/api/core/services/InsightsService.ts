/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInsightRequest } from '../models/CreateInsightRequest';
import type { Insight } from '../models/Insight';
import type { PagedInsightResponse } from '../models/PagedInsightResponse';
import type { UpdateInsightRequest } from '../models/UpdateInsightRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InsightsService {
    /**
     * List insights
     * @returns PagedInsightResponse Paged list of insights
     * @throws ApiError
     */
    public static listInsights({
        page = 1,
        pageSize = 20,
        search,
        status,
    }: {
        page?: number,
        pageSize?: number,
        search?: string,
        status?: 'draft' | 'active' | 'archived',
    }): CancelablePromise<PagedInsightResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/insights',
            query: {
                'page': page,
                'pageSize': pageSize,
                'search': search,
                'status': status,
            },
        });
    }
    /**
     * Create a new insight
     * @returns Insight Insight created
     * @throws ApiError
     */
    public static createInsight({
        requestBody,
    }: {
        requestBody: CreateInsightRequest,
    }): CancelablePromise<Insight> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/insights',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
            },
        });
    }
    /**
     * Get a single insight by id
     * @returns Insight Insight found
     * @throws ApiError
     */
    public static getInsightById({
        id,
    }: {
        id: string,
    }): CancelablePromise<Insight> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/insights/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Insight not found`,
            },
        });
    }
    /**
     * Update an existing insight
     * @returns Insight Insight updated
     * @throws ApiError
     */
    public static updateInsight({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateInsightRequest,
    }): CancelablePromise<Insight> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/insights/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Insight not found`,
            },
        });
    }
    /**
     * Delete an insight
     * @returns void
     * @throws ApiError
     */
    public static deleteInsight({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/insights/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Insight not found`,
            },
        });
    }
}
