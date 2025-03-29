import { db } from "@/lib/firebase"
import { Cuisine } from "@/types"
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

        const cuisineData = {
            name,
            value,
            createdAt: serverTimestamp()
        }

        const cuisineRef = await addDoc(collection(db, `stores/${storeId}/cuisines`), cuisineData)

        const id = cuisineRef.id

        await updateDoc(doc(db, `stores/${storeId}/cuisines`, id), {
            ...cuisineData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id, ...cuisineData })

    } catch (error) {
        console.log(`CUISINE_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const cuisines: Cuisine[] = []
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const cuisineSnap = await getDocs(collection(db, "stores", `${storeId}`, "cuisines"))

        cuisineSnap.forEach((doc) => {
            cuisines.push(doc.data() as Cuisine)
        })

        return NextResponse.json(cuisines)

    } catch (error) {
        console.log(`CUISINE_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}