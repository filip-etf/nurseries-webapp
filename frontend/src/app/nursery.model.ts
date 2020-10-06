export interface Nursery{
    farmer: string,
    name: string,
    location: string,
    width: string,
    height: string,
    temperature: string,
    water: string,
    plants: {seedling_name:string, producer:string, growing_time:string, width:string, height:string, planted_date:Date, progress: boolean}[];
}