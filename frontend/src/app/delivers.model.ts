export interface Deliver{
    company: string,
    delivers: {
        firstname: string, 
        lastname: string, 
        username: string, 
        status: string, 
        deliver_time: Date,
        request: {
            farmer: string,
            nursery: string
        }
    }[];
}