import { collection, getDocs, Timestamp } from "firebase/firestore";
import OrdersClient from "./components/client";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Kitchen, Order } from "@/types";
import axios from "axios";

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;
  const orders: Order[] = [];
  const usersSnapshot = await getDocs(collection(db, "users"));

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const ordersSnapshot = await getDocs(
      collection(db, "users", userId, "orders")
    );

    ordersSnapshot.forEach((orderDoc) => {
      orders.push(orderDoc.data() as Order);
    });
  }
  console.log("All orders", orders);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-8 pt-6">
        <OrdersClient data={orders} />
      </div>
    </div>
  );
};

export default Orders;
