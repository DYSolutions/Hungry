import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const PATCH = async (req: Request, { params }: { params: { storeId: string, cuisineId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, cuisineId } = await params
        const { name, value } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!cuisineId) {
            return new NextResponse("CuisineId not found", { status: 400 })
        }

        if (!name || !value) {
            return new NextResponse("jsonData not found", { status: 400 })
        }

        const cuisineRef = doc(db, "stores", storeId, "cuisines", cuisineId)

        await updateDoc(cuisineRef, {
            name,
            value,
            updatedAt: serverTimestamp()
        })

        const updatedData = (await getDoc(cuisineRef)).data()

        return NextResponse.json(updatedData)
    } catch (error) {
        console.log("CUISINE_UPDATE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const DELETE = async (req: Request, { params }: { params: { storeId: string, cuisineId: string } }) => {

    try {
        const { userId } = await auth()
        const { storeId, cuisineId } = await params
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!cuisineId) {
            return new NextResponse("cuisineId not found", { status: 400 })
        }

        const cuisineRef = doc(db, "stores", storeId, "cuisines", cuisineId)
        await deleteDoc(cuisineRef)

        return NextResponse.json({ msg: "cuisine Deleted" })

    } catch (error) {
        console.log("CUISINE_DELETE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}