export interface IProduct {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  stockQuantity: number;
  inStock: boolean;
  productBrand: string;
  productType: string;
  categories: string[];
  discount: number | null;
  finalPrice: number;
}


export interface IProductPaginationResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}