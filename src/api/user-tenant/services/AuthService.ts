/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthTokens } from '../models/AuthTokens';
import type { LoginRequest } from '../models/LoginRequest';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Log in with email and password
     * @returns AuthTokens Login successful
     * @throws ApiError
     */
    public static login({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<AuthTokens> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
            },
        });
    }
    /**
     * Refresh access token
     * @returns AuthTokens New access token
     * @throws ApiError
     */
    public static refreshToken({
        requestBody,
    }: {
        requestBody: RefreshTokenRequest,
    }): CancelablePromise<AuthTokens> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid refresh token`,
            },
        });
    }
    /**
     * Get current user
     * @returns User Current user profile
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/me',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
}
