import { collection, getDocs, Timestamp } from "firebase/firestore";
import BillboardClient from "./components/client";
import { db } from "@/lib/firebase";
import { Billboard } from "@/types";
import { format } from "date-fns"; 


const Billboards = async ({ params }: { params: { storeId: string } }) => {

    const { storeId } = await params

    const fetchBillBoardsData = (await getDocs(collection(db, "stores", `${storeId}`, "billboards"))).docs.map((doc) => {
        const data = doc.data() as Billboard;
        
        if (data.createdAt instanceof Timestamp) {
            data.createdAt = format(data.createdAt.toDate(),'yyyy-MM-dd')
        }
        
        if (data.updatedAt instanceof Timestamp) {
            data.updatedAt = format(data.updatedAt.toDate(),'yyyy-MM-dd')
        }
        
        return data;
})
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <BillboardClient data={fetchBillBoardsData} />
            </div>
        </div>
    );
}

export default Billboards;