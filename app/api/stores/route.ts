import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"


export const POST = async (req: Request) => {
    try {
        const { userId } = await auth()
        const { name } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!name) {
            return new NextResponse("Store name missing", { status: 400 })
        }

        const storeData = {
            name,
            userId,
            createdAt: serverTimestamp()
        }

        const storeRef = await addDoc(collection(db, "stores"), storeData)

        const id = storeRef.id

        await updateDoc(doc(db, "stores", id), {
            ...storeData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id, ...storeData })

    } catch (error) {
        console.log(`STORE_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}