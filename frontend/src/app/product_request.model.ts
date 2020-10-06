export interface Product_request{
    username: string,
    product_array: {'type': string, 'name': string, 'quantity': string, 'time': string}[],
    producer: string,
    location: string,
    nursery_name: string,
    filing_date: string,
    status: string
}