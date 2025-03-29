import { db } from "@/lib/firebase"
import { Catagory } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"


export const POST = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const { userId } = await auth()
        const { storeId } = await params

        const { billboardId, billboardName, label } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const catagoryData = {
            billboardId,
            billboardName,
            label,
            createdAt: serverTimestamp()
        }

        const catagoryRef = await addDoc(collection(db, `stores/${storeId}/catagories`), catagoryData)

        const id = catagoryRef.id

        await updateDoc(doc(db, `stores/${storeId}/catagories`, id), {
            ...catagoryData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id, ...catagoryData })

    } catch (error) {
        console.log(`CATAGORY_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}


export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const catagories: Catagory[] = []
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const catagorySnap = await getDocs(collection(db, "stores", `${storeId}`, "catagories"))

        catagorySnap.forEach((doc) => {
            catagories.push(doc.data() as Catagory)
        })

        return NextResponse.json(catagories)

    } catch (error) {
        console.log(`CATAGORY_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}