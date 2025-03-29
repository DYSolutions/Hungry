import { collection, getDocs, Timestamp } from "firebase/firestore";
import BillboardClient from "./components/client";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Size } from "@/types";


const sizes = async ({ params }: { params: { storeId: string } }) => {

    const { storeId } = await params

    const fetchsizesData = (await getDocs(collection(db, "stores", `${storeId}`, "sizes"))).docs.map((doc) => {
        const data = doc.data() as Size;

        if (data.createdAt instanceof Timestamp) {
            data.createdAt = format(data.createdAt.toDate(), 'yyyy-MM-dd')
        }

        if (data.updatedAt instanceof Timestamp) {
            data.updatedAt = format(data.updatedAt.toDate(), 'yyyy-MM-dd')
        }

        return data;
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <BillboardClient data={fetchsizesData} />
            </div>
        </div>
    );
}

export default sizes;