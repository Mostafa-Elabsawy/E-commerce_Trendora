export interface ICartItem {
    id: number;
    productName: string;
    pictureUrl: string;
    quantity: number;
    price: number;
}

export interface ICart {
    id: string;
    items: ICartItem[];
    clientSecret: string | null;
    paymentIntentId: string | null;
    deliveryMethodId: number | null;
    shippingPrice: number | null;
}