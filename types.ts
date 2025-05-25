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

export interface Product {
    id: string,
    name: string,
    images: {
        url: string;
    }[];
    price: string,
    isFeatured: boolean,
    isArchived: boolean,
    size: string,
    kitchen: string,
    category: string,
    cuisine: string,
    serves?: number,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}

export interface User {
    id: string,
    clerkUserId: string,
    userName: string,
    userEmail: string,
    isAdmin: boolean,
    isActive: boolean,
    shippingAddress?: Address,
    soldProducts: Order[],
    cartProducts: Product[],
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}

export interface Order {
    id: string,
    userId: string,
    // status: "PENDING" | "COMPLETED" | "CANCELLED" | "DELIVERED" | "DELIVERING",
    status: {
        name: "PENDING",
        color: "bg-yellow-500"
    } | {
        name: "COMPLETED",
        color: "bg-green-500"
    } | {
        name: "CANCELED",
        color: "bg-red-500"
    } | {
        name: "DELIVERED",
        color: "bg-blue-500"
    } | {
        name: "DELIVERING",
        color: "bg-gray-500"
    },
    shippingAddress: Address,
    orderItems: Product[],
    totalPrice: number,
    paymentMethod: string,
    createdAt: Timestamp | string,
    updatedAt: Timestamp | string
}

export interface Address {
    shippingAddress: string,
    shippingCity: string,
    shippingCode: string,
    shippingCountry: string,
    shippingPhone: string,
    shippingName: string,
    shippingEmail: string,
}