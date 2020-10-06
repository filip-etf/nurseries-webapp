export interface Product_shop{
    username: string,
    producer_name: string,
    growing_time: string,
    accelerating_time: string,
    type: string,
    name: string,
    preparations: {name: String}[],
    available_quantity: string, 
    avarage_rating: string,
    unit_price: string
}