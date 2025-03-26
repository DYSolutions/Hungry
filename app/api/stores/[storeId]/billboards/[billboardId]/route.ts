import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"




export const PATCH = async (req: Request, { params }: { params: { storeId: string, billboardId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, billboardId } = await params
        const { imageUrl, label } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("BillboardId not found", { status: 400 })
        }

        if (!imageUrl || !label) {
            return new NextResponse("jsonData not found", { status: 400 })
        }

        const billboardRef = doc(db, "stores", storeId, "billboards", billboardId)

        await updateDoc(billboardRef, {
            imageUrl: imageUrl,
            label: label,
            updatedAt: serverTimestamp()
        })

        const updatedData = (await getDoc(billboardRef)).data()

        return NextResponse.json(updatedData)
    } catch (error) {
        console.log("BILLBOARD_UPDATE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const DELETE = async (req: Request, { params }: { params: { storeId: string, billboardId: string } }) => {

    try {
        const { userId } = await auth()
        const { storeId, billboardId } = await params
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("BillboardId not found", { status: 400 })
        }

        const billboardRef = doc(db, "stores", storeId, "billboards", billboardId)
        await deleteDoc(billboardRef)

        return NextResponse.json({ msg: "billboard Deleted" })

    } catch (error) {
        console.log("BILLBOARD_DELETE:", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}