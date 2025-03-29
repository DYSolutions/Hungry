import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"




export const PATCH = async (req: Request, { params }: { params: { storeId: string, kitchenId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, kitchenId } = await params
        const { name, value } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!kitchenId) {
            return new NextResponse("KitshenId not found", { status: 400 })
        }

        if (!name || !value) {
            return new NextResponse("jsonData not found", { status: 400 })
        }

        const kitchenRef = doc(db, "stores", storeId, "kitchens", kitchenId)

        await updateDoc(kitchenRef, {
            name,
            value,
            updatedAt: serverTimestamp()
        })

        const updatedData = (await getDoc(kitchenRef)).data()

        return NextResponse.json(updatedData)
    } catch (error) {
        console.log("KITCHEN_UPDATE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const DELETE = async (req: Request, { params }: { params: { storeId: string, kitchenId: string } }) => {

    try {
        const { userId } = await auth()
        const { storeId, kitchenId } = await params
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!kitchenId) {
            return new NextResponse("KitchenId not found", { status: 400 })
        }

        const kitchenRef = doc(db, "stores", storeId, "kitchens", kitchenId)
        await deleteDoc(kitchenRef)

        return NextResponse.json({ msg: "kitchen Deleted" })

    } catch (error) {
        console.log("KITCHEN_DELETE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}