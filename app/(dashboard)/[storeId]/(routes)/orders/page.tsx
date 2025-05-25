import { collection, getDocs, Timestamp } from "firebase/firestore";
import OrdersClient from "./components/client";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Kitchen, Order } from "@/types";
import axios from "axios";


const Orders = async ({ params }: { params: { storeId: string } }) => {

    const { storeId } = await params
    const orders: Order[] = []
    const orderSnap = await getDocs(collection(db, "users"))

    orderSnap.forEach((doc) => {
        orders.push(doc.data().soldProducts.at(0) as Order)
    })

    console.log(orders);


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <OrdersClient data={orders} />
            </div>
        </div>
    );
}

export default Orders;