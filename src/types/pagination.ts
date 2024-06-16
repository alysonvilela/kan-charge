import { z } from "zod";

interface PaginationParams {
    page: number;
    pageSize: number;
    total: number;
}

interface PaginationStatus {
    CAN_NEXT: boolean;
    CAN_PREV: boolean;
    currentPage: number;
    lastPage: number;
}

export function getPaginationStatus({ page, pageSize, total }: PaginationParams): PaginationStatus {
    const lastPage = Math.ceil(total / pageSize);
    const CAN_PREV = page > 1;
    const CAN_NEXT = page < lastPage;
    const currentPage = page;

    return { CAN_NEXT, CAN_PREV, currentPage, lastPage };
}

export const pageSchema = z.object({
    page: z.coerce.number().min(1),
    pageSize: z.coerce.number().min(10).min(10).default(10),
})