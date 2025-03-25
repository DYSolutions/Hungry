import { db } from "@/lib/firebase";
import BillboardForm from "../components/billboard-form";
import { Billboard } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface BillboardProps {
    params: {
        billboardId: string,
        storeId: string
    }
}

const BillboardPage= async ({ params }: BillboardProps) => {

    const {storeId}=await params
    const {billboardId}= await params

    const initizalData = (await getDoc(doc(db,"stores",storeId,"billboards",billboardId)) ).data() as Billboard
    return (
        <div className="flex-col">
           <div className="flex-1 space-y-5 p-8 pt-6">
           <BillboardForm initizalData={initizalData}/>
           </div>
        </div>
    );
}

export default BillboardPage;