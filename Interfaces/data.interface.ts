export interface ICategory {
    id:string,
    title:string,
    description:string,
    createdAt:string,
    updatedAt:string
}

export interface ISessionCreate {
    title: string,
    description:string,
    date:string,
    fromTime:string,
    toTime:string,
    categoryId:string,
    sessionFee:number
    tutorId:string
}