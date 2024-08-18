export type User = {
    username: string,
    type: string,
    orders: Order[],
}

export type Product = {
    id: number,
    title: string,
    price?: number,
    description?: string,
    image?: string,
    category?: string,
    brand?: string,
    stock?: number,
    reviews?: Review[],
} | undefined; 

export type CartItemType = {
    productId: number,
    quantity: number,
    price?: number
}

export type CartItemAction = {
    onIncrease: (id: number) => void,
    onDecrease: (id: number) => void,
}

export type DiscountCodes = {
    code: string,
    discount: number,
}

export type Cart = {
    cartId?: number,
    userId?: number,
    date?: string,
    discount?:string
    products: {productId: number, quantity: number, price?: number}[]
} | undefined;

export type Review = {
    rating: string,
    comments: Comment[],
}

export type Comment = {
    user: User,
    text: string,
}

export type Order = {
    id: number,
    user: User,
    products: Product[],
    total: number,
    status: string,
    date: string,
}