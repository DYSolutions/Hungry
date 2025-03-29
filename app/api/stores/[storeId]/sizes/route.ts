import { db } from "@/lib/firebase"
import { Size } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"


export const POST = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const { userId } = await auth()
        const { storeId } = await params

        const { name, value } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const sizeData = {
            name,
            value,
            createdAt: serverTimestamp()
        }

        const sizeRef = await addDoc(collection(db, `stores/${storeId}/sizes`), sizeData)

        const id = sizeRef.id

        await updateDoc(doc(db, `stores/${storeId}/sizes`, id), {
            ...sizeData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id, ...sizeData })

    } catch (error) {
        console.log(`SIZE_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const sizes: Size[] = []
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const sizeSnap = await getDocs(collection(db, "stores", `${storeId}`, "sizes"))

        sizeSnap.forEach((doc) => {
            sizes.push(doc.data() as Size)
        })

        return NextResponse.json(sizes)

    } catch (error) {
        console.log(`SIZE_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}