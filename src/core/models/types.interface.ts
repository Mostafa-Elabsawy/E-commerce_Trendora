export interface Category {
	id: number;
	name: string;
	description: string;
	subCategories: SubCategory[];
}

export interface SubCategory {
	id: number;
	name: string;
	categoryId: number;
	categoryName: string;
}
export interface Brand {
	id: number;
	name: string;
}
