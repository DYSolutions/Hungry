import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const PATCH = async (req: Request, { params }: { params: { storeId: string, catagoryId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, catagoryId } = await params
        const { billboardId, billboardName, label } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!catagoryId) {
            return new NextResponse("CatagoryId not found", { status: 400 })
        }

        if (!billboardId || !billboardName || !label) {
            return new NextResponse("jsonData not found", { status: 400 })
        }

        const catagoryRef = doc(db, "stores", storeId, "catagories", catagoryId)

        await updateDoc(catagoryRef, {
            billboardId,
            billboardName,
            label,
            updatedAt: serverTimestamp()
        })

        const updatedData = (await getDoc(catagoryRef)).data()

        return NextResponse.json(updatedData)
    } catch (error) {
        console.log("CATAGORY_UPDATE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const DELETE = async (req: Request, { params }: { params: { storeId: string, catagoryId: string } }) => {

    try {
        const { userId } = await auth()
        const { storeId, catagoryId } = await params
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!catagoryId) {
            return new NextResponse("BillboardId not found", { status: 400 })
        }

        const catagoryRef = doc(db, "stores", storeId, "catagories", catagoryId)
        await deleteDoc(catagoryRef)

        return NextResponse.json({ msg: "catagory Deleted" })

    } catch (error) {
        console.log("CATAGORY_DELETE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}