export class PaginationResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;

    constructor(data: T[], pageNumber: number, pageSize: number, totalPages: number, totalRecords: number) {
        this.content = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalRecords = totalRecords;
    }
}