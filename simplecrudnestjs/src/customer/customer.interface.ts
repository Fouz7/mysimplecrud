export interface FindAllParams {
    pageSize?: number;
    pageNumber?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    nama?: string;
    kota?: string;
    alamat?: string;
}