/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsInsight } from '../models/AnalyticsInsight';
import type { GenerateInsightsRequest } from '../models/GenerateInsightsRequest';
import type { GenerationJob } from '../models/GenerationJob';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InsightsService {
    /**
     * List generated insights for the current user
     * @returns AnalyticsInsight List of insights
     * @throws ApiError
     */
    public static listAnalyticsInsights({
        accountId,
        status,
    }: {
        accountId?: string,
        status?: 'new' | 'viewed' | 'dismissed',
    }): CancelablePromise<Array<AnalyticsInsight>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/analytics/insights',
            query: {
                'accountId': accountId,
                'status': status,
            },
        });
    }
    /**
     * Trigger insight generation
     * @returns GenerationJob Insight generation started
     * @throws ApiError
     */
    public static generateInsights({
        requestBody,
    }: {
        requestBody: GenerateInsightsRequest,
    }): CancelablePromise<GenerationJob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/analytics/insights',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a single generated insight
     * @returns AnalyticsInsight Insight details
     * @throws ApiError
     */
    public static getAnalyticsInsight({
        id,
    }: {
        id: string,
    }): CancelablePromise<AnalyticsInsight> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/analytics/insights/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Insight not found`,
            },
        });
    }
    /**
     * Check the status of an insight generation job
     * @returns GenerationJob Job status
     * @throws ApiError
     */
    public static getGenerationJobStatus({
        jobId,
    }: {
        jobId: string,
    }): CancelablePromise<GenerationJob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/analytics/jobs/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                404: `Job not found`,
            },
        });
    }
}
