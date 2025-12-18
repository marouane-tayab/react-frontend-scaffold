/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from '../models/Notification';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * List notifications for the current user
     * @returns Notification List of notifications
     * @throws ApiError
     */
    public static listNotifications({
        unreadOnly = false,
    }: {
        unreadOnly?: boolean,
    }): CancelablePromise<Array<Notification>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notifications',
            query: {
                'unreadOnly': unreadOnly,
            },
        });
    }
    /**
     * Mark a notification as read
     * @returns void
     * @throws ApiError
     */
    public static markNotificationRead({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/{id}/read',
            path: {
                'id': id,
            },
            errors: {
                404: `Notification not found`,
            },
        });
    }
}
