/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Meeting = {
    id: string;
    title: string;
    startTime: string;
    endTime?: string | null;
    status: 'scheduled' | 'live' | 'completed' | 'cancelled';
};

