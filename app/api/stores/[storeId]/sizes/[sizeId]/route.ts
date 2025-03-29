import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"




export const PATCH = async (req: Request, { params }: { params: { storeId: string, sizeId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, sizeId } = await params
        const { name, value } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse("SizeId not found", { status: 400 })
        }

        if (!name || !value) {
            return new NextResponse("jsonData not found", { status: 400 })
        }

        const sizeRef = doc(db, "stores", storeId, "sizes", sizeId)

        await updateDoc(sizeRef, {
            name,
            value,
            updatedAt: serverTimestamp()
        })

        const updatedData = (await getDoc(sizeRef)).data()

        return NextResponse.json(updatedData)
    } catch (error) {
        console.log("SIZE_UPDATE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const DELETE = async (req: Request, { params }: { params: { storeId: string, sizeId: string } }) => {

    try {
        const { userId } = await auth()
        const { storeId, sizeId } = await params
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse("SizeId not found", { status: 400 })
        }

        const sizeRef = doc(db, "stores", storeId, "sizes", sizeId)
        await deleteDoc(sizeRef)

        return NextResponse.json({ msg: "size Deleted" })

    } catch (error) {
        console.log("SIZE_DELETE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}