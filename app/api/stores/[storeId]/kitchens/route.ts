import { db } from "@/lib/firebase"
import { Kitchen } from "@/types"
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

        const kitchenData = {
            name,
            value,
            createdAt: serverTimestamp()
        }

        const kitchenRef = await addDoc(collection(db, `stores/${storeId}/kitchens`), kitchenData)

        const id = kitchenRef.id

        await updateDoc(doc(db, `stores/${storeId}/kitchens`, id), {
            ...kitchenData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id, ...kitchenData })

    } catch (error) {
        console.log(`KITCHEN_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const kitchens: Kitchen[] = []
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const kitchenSnap = await getDocs(collection(db, "stores", `${storeId}`, "kitchens"))

        kitchenSnap.forEach((doc) => {
            kitchens.push(doc.data() as Kitchen)
        })

        return NextResponse.json(kitchens)

    } catch (error) {
        console.log(`KITCHEN_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}