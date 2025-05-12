import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"




export const POST = async (req: Request, { params }: { params: { storeId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId } = await params

        const { name, price, size, category, cuisine, images, isFeatured, isArchived, kitchen } = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const productData = {
            name,
            price,
            size,
            category,
            cuisine,
            images,
            isFeatured,
            isArchived,
            kitchen
        }

        const productRef = await addDoc(collection(db, `stores/${storeId}/products`), productData)
        const id = productRef.id
        
        await updateDoc(doc(db, `stores/${storeId}/products`,id), {
            ...productData,
            id,
            updatedAt: new Date()
        })
        return NextResponse.json({ id, ...productData })

    } catch (error) {
        console.log(`PRODUCT_POST:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}

export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const productsRef = collection(db, `stores/${storeId}/products`)
        const productsSnapshot = await getDocs(productsRef)
        const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        return NextResponse.json(products)

    } catch (error) {
        console.log(`PRODUCT_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}