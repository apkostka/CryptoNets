import { RequestStatus } from '@/types/request-status';

export const allStatusResolvedTo = (status: RequestStatus[], desiredStatus: RequestStatus): boolean => {
    return status.every((s) => s === desiredStatus);
};

export const anyStatusResolvedTo = (status: RequestStatus[], desiredStatus: RequestStatus): boolean => {
    return status.some((s) => s === desiredStatus);
};

export const allErrors = (errors: any[]): string[] => {
    return errors.filter((e) => e !== null).map((e) => e.message);
};
