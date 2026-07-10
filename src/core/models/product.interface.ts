// export interface IProduct {
//   Id: number;
//   Name: string;
//   Description: string;
//   PictureUrl: string;
//   Price: number;
//   Discount: number;
//   StockQuantity: number;
//   InStock: boolean;
//   ProductBrand: string;
//   SubCategory: string;
//   CategoryId: number;
//   CategoryName: string;
// }

// export interface IProductPaginationResponse {
//   PageIndex: number;
//   PageSize: number;
//   Count: number;
//   Data: IProduct[];
// }

export interface IProduct {
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

export interface IProductPaginationResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}