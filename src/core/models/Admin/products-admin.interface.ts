export interface ProductAdmin {
    id: number;
    name: string;
    description: string;
    pictureUrl: string;
    price: number;
    discount: number;
    stockQuantity: number;
    inStock: boolean;
    productBrand: string;
    subCategory: string;
    categoryId: number;
    categoryName: string;
}
export interface AllProductsAdmin {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: ProductAdmin[];
}
export interface ProductFilterParams {
    brandId?: number;
    subCategoryId?: number;
    categoryId?: number;
    search?: string;
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
}
export interface CreateProduct {
    name: string;
    description: string;
    pictureUrl: string;
    price: number;
    discount: number;
    stockQuantity: number;
    brandId: number;
    subCategoryId: number;
}
export interface UpdateProduct extends CreateProduct {}
export interface EditProductAdmin {}

export interface DeleteProductAdmin {}

export interface AllProductsAdmin {}
