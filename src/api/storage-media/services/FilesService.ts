/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileMetadata } from '../models/FileMetadata';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilesService {
    /**
     * List files for the current tenant
     * @returns FileMetadata List of files
     * @throws ApiError
     */
    public static listFiles({
        folder,
    }: {
        folder?: string,
    }): CancelablePromise<Array<FileMetadata>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files',
            query: {
                'folder': folder,
            },
        });
    }
    /**
     * Upload a file
     * @returns FileMetadata File uploaded
     * @throws ApiError
     */
    public static uploadFile({
        formData,
    }: {
        formData: {
            file: Blob;
            folder?: string;
        },
    }): CancelablePromise<FileMetadata> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/files',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Get file metadata
     * @returns FileMetadata File metadata
     * @throws ApiError
     */
    public static getFileMetadata({
        id,
    }: {
        id: string,
    }): CancelablePromise<FileMetadata> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `File not found`,
            },
        });
    }
    /**
     * Delete a file
     * @returns void
     * @throws ApiError
     */
    public static deleteFile({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `File not found`,
            },
        });
    }
    /**
     * Download a file
     * @returns binary Binary file stream
     * @throws ApiError
     */
    public static downloadFile({
        id,
    }: {
        id: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/{id}/download',
            path: {
                'id': id,
            },
            errors: {
                404: `File not found`,
            },
        });
    }
}
