import { db } from "@/lib/firebase";
import { Store } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface DashboardProps{
    params:{storeId:string}
}

const Dashboard = async ({params}:DashboardProps) => {
    const {storeId}=await params
    const store = (await getDoc(doc(db, "stores", storeId))).data() as Store
    return ( 
    <div>
    This is Dashboard : {store.name}
    </div>
    );
}
 
export default Dashboard;