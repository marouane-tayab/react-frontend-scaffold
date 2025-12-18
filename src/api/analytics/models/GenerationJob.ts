/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GenerationJob = {
    jobId: string;
    status: 'queued' | 'running' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string | null;
};

