
export interface Product {
    id: Number
    uri: String
    title: String
    category: String
    price : number
    like: boolean,
    quantity: number
}

export type StatusProduct = "idle" | "loading" | "succeeded" | "failed"

export type StateProduct<A extends Array<Product>> = {
    list?: A,
    status: StatusProduct,
    error: string | null
}

export const state: StateProduct<Array<Product>> = {
    list: [...Array(20).fill({ title: "Nike Blazer low'77 Jumbo", uri: "", price: 100.5, like: false, quantity: 0 })],
    status: "idle",
    error: null
}