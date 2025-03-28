import { Timestamp } from "firebase/firestore"

export interface Store {
    id: string
    name: string
    userId: string
    createdAt: Timestamp
    updatedAt: Timestamp
}

export interface Billboard {
    id: string,
    label: string,
    imageUrl: string,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}

export interface Catagory {
    id: string,
    billboardId: string,
    billboardName: string,
    label: string,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}