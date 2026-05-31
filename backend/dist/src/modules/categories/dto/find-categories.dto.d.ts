export declare class FindCategoriesQueryDto {
    search?: string;
    parentId?: string;
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'createdAt';
    order?: 'asc' | 'desc';
}
