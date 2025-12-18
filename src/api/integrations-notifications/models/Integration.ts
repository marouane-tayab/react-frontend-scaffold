/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Integration = {
    id: string;
    type: 'salesforce' | 'hubspot' | 'slack' | 'custom';
    status: 'connected' | 'disconnected' | 'error';
    connectedAt?: string | null;
};

