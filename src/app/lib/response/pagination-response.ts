/**
 * Represents a pagination response with paginated data and related information.
 *
 * @template T - The type of data included in the pagination response.
 */
export class PaginationResponse<T> {
    /**
     * An array of data of type `T` within the current page.
     */
    content: T[];

    /**
     * The current page number within the paginated data.
     */
    pageNumber: number;

    /**
     * The number of items per page (page size).
     */
    pageSize: number;

    /**
     * The total number of pages in the pagination.
     */
    totalPages: number;

    /**
     * The total number of records across all pages.
     */
    totalRecords: number;

    /**
     * Constructs a new pagination response with the provided paginated data and related information.
     *
     * @param data - An array of data within the current page.
     * @param pageNumber - The current page number within the paginated data.
     * @param pageSize - The number of items per page (page size).
     * @param totalPages - The total number of pages in the pagination.
     * @param totalRecords - The total number of records across all pages.
     */
    constructor(data: T[], pageNumber: number, pageSize: number, totalPages: number, totalRecords: number) {
        this.content = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalRecords = totalRecords;
    }
}
