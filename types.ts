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

export interface Kitchen {
    id: string,
    name: string,
    value: string,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}

export interface Size {
    id: string,
    name: string,
    value: string,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}

export interface Cuisine {
    id: string,
    name: string,
    value: string,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}