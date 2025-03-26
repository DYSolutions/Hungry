import { db } from "@/lib/firebase"
import { Billboard } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"


export const POST = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const { userId } = await auth()
        const { storeId } = await params

        const { imageUrl, label } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const billboardData = {
            label,
            imageUrl,
            createdAt: serverTimestamp()
        }

        const billboardRef = await addDoc(collection(db, `stores/${storeId}/billboards`), billboardData)

        const id = billboardRef.id

        await updateDoc(doc(db, `stores/${storeId}/billboards`, id), {
            ...billboardData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id, ...billboardData })

    } catch (error) {
        console.log(`BILLBOARD_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const billboards: Billboard[] = []
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const billboardSnap = await getDocs(collection(db, "stores", `${storeId}`, "billboards"))

        billboardSnap.forEach((doc) => {
            billboards.push(doc.data() as Billboard)
        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.log(`BILLBOARD_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}