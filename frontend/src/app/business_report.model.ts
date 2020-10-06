export interface Business_report{
    company: string,
    day: Date,
    orders: {products: {product_name: string}[], bill:string, farmer_firstname:string, farmer_lastname:string, nursery_location:string}[]
}