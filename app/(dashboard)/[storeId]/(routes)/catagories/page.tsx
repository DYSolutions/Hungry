import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Catagory } from "@/types";
import { format } from "date-fns"; 
import CatagoryClient from "./components/client";


const Billboards = async ({ params }: { params: { storeId: string } }) => {

    const { storeId } = await params

    const fetchCatagoriesData = (await getDocs(collection(db, "stores", `${storeId}`, "catagories"))).docs.map((doc) => {
        const data = doc.data() as Catagory;
        
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
                <CatagoryClient data={fetchCatagoriesData} />
            </div>
        </div>
    );
}

export default Billboards;