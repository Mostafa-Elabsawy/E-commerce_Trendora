
export interface subCategory {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  subCategories: subCategory[];
}