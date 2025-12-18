/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MeetingInsights } from '../models/MeetingInsights';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RealtimeService {
    /**
     * Get real-time insights for a meeting
     * @returns MeetingInsights Real-time meeting insights
     * @throws ApiError
     */
    public static getMeetingInsights({
        id,
    }: {
        id: string,
    }): CancelablePromise<MeetingInsights> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings/{id}/insights',
            path: {
                'id': id,
            },
        });
    }
}
