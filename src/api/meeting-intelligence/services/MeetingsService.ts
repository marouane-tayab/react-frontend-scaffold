/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMeetingRequest } from '../models/CreateMeetingRequest';
import type { Meeting } from '../models/Meeting';
import type { UpdateMeetingRequest } from '../models/UpdateMeetingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MeetingsService {
    /**
     * List meetings
     * @returns Meeting List of meetings
     * @throws ApiError
     */
    public static listMeetings({
        from,
        to,
    }: {
        from?: string,
        to?: string,
    }): CancelablePromise<Array<Meeting>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings',
            query: {
                'from': from,
                'to': to,
            },
        });
    }
    /**
     * Create a meeting
     * @returns Meeting Meeting created
     * @throws ApiError
     */
    public static createMeeting({
        requestBody,
    }: {
        requestBody: CreateMeetingRequest,
    }): CancelablePromise<Meeting> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/meetings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get meeting by id
     * @returns Meeting Meeting details
     * @throws ApiError
     */
    public static getMeetingById({
        id,
    }: {
        id: string,
    }): CancelablePromise<Meeting> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/meetings/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Meeting not found`,
            },
        });
    }
    /**
     * Update a meeting
     * @returns Meeting Meeting updated
     * @throws ApiError
     */
    public static updateMeeting({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateMeetingRequest,
    }): CancelablePromise<Meeting> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/meetings/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
