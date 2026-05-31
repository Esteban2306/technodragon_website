export declare class FindBrandsQueryDto {
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'createdAt';
    order?: 'asc' | 'desc';
}
