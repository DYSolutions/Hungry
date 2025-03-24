import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"


export const PATCH = async (req: Request, { params }: { params: { storeId: string } }) => {
    try {
        const { userId } = await auth()
        const { name } = await req.json()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        if (!name) {
            return new NextResponse("Store name missing", { status: 400 })
        }

        const storeRef = doc(db, "stores", storeId);

        await updateDoc(storeRef, {
            name: name,
            updatedAt: serverTimestamp(),
        })

        const updatedDoc = await getDoc(storeRef);
        const updatedData = updatedDoc.data();

        return NextResponse.json({ updatedData })

    } catch (error) {
        console.log(`STORE_UPDATE:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}

export const DELETE = async (req: Request, { params }: { params: { storeId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const storeRef = doc(db, "stores", storeId);
        await deleteDoc(storeRef)

        return NextResponse.json({ msg:"Store Deleted" })

    } catch (error) {
        console.log(`STORE_DELETE:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}