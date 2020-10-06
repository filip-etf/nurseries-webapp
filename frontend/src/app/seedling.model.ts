export interface Seedling{
    username: string,
    producer_name: string,
    growing_time: string,
    type: string,
    name: string, 
    available_quantity: string, 
    unit_price: string,
    preparations: {name : string}[]    
}