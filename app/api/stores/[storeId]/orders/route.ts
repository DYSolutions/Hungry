import { db } from "@/lib/firebase"
import { Order } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { collection, doc, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server"





export const GET = async (req: Request, { params }: { params: { storeId: string } }) => {

    try {

        const orders: Order[] = []
        const { userId } = await auth()
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("StoreId not found", { status: 400 })
        }

        const orderSnap = await getDocs(collection(db, "users"))

        orderSnap.forEach((doc) => {
            orders.push(doc.data() as Order)
        })

        return NextResponse.json(orders)

    } catch (error) {
        console.log(`ORDER_GET:${error}`)
        return new NextResponse("internal server error", { status: 500 })
    }
}