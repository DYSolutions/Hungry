import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"



export const PATCH = async (req: Request, { params }: { params: { storeId: string, productId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, productId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }
        if (!productId) {
            return new NextResponse("ProductId not found", { status: 400 })
        }

        const { name, price, size, category, cuisine, images, isFeatured, isArchived, kitchen } = await req.json()

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

        await updateDoc(doc(db, `stores/${storeId}/products`, productId), {
            ...productData,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({ id: productId, ...productData })

    } catch (error) {
        console.log(`PRODUCT_PATCH:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}

export const DELETE = async (req: Request, { params }: { params: { storeId: string, productId: string } }) => {
    try {
        const { userId } = await auth()
        const { storeId, productId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }
        if (!productId) {
            return new NextResponse("ProductId not found", { status: 400 })
        }

        await deleteDoc(doc(db, `stores/${storeId}/products`, productId))
        return NextResponse.json({ id: productId })

    } catch (error) {
        console.log(`PRODUCT_DELETE:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}