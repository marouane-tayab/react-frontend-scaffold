/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTenantRequest } from '../models/CreateTenantRequest';
import type { Tenant } from '../models/Tenant';
import type { UpdateTenantRequest } from '../models/UpdateTenantRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantsService {
    /**
     * List tenants current user has access to
     * @returns Tenant List of tenants
     * @throws ApiError
     */
    public static listTenants(): CancelablePromise<Array<Tenant>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tenants',
        });
    }
    /**
     * Create a tenant
     * @returns Tenant Tenant created
     * @throws ApiError
     */
    public static createTenant({
        requestBody,
    }: {
        requestBody: CreateTenantRequest,
    }): CancelablePromise<Tenant> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tenants',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get tenant by id
     * @returns Tenant Tenant details
     * @throws ApiError
     */
    public static getTenant({
        id,
    }: {
        id: string,
    }): CancelablePromise<Tenant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tenants/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Tenant not found`,
            },
        });
    }
    /**
     * Update tenant
     * @returns Tenant Updated tenant
     * @throws ApiError
     */
    public static updateTenant({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateTenantRequest,
    }): CancelablePromise<Tenant> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tenants/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
