export interface Stockroom{
    farmer: string,
    nursery: string,
    items: {name: string, producer: string, quantity: string, available: boolean, type: string, time: string}[]
}