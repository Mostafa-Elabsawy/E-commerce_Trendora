export interface IProduct {
  Id: number;
  Name: string;
  Description: string;
  PictureUrl: string;
  Price: number;
  Discount: number;
  StockQuantity: number;
  InStock: boolean;
  ProductBrand: string;
  SubCategory: string;
  CategoryId: number;
  CategoryName: string;
}

export interface IProductPaginationResponse {
  PageIndex: number;
  PageSize: number;
  Count: number;
  Data: IProduct[];
}