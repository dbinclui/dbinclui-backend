import { Timestamp } from "mongodb";

export interface Guides{
    title: string,
    content: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
}


