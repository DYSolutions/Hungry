import { db } from "@/lib/firebase";
import BillboardForm from "../components/billboard-form";
import { Billboard } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface BillboardProps {
    params: {
        billboardId: string;
        storeId: string;
    };
}

const BillboardPage = async ({ params }: BillboardProps) => {
    const { storeId, billboardId } = await params;

    const docSnap = await getDoc(doc(db, "stores", storeId, "billboards", billboardId));
    const data = docSnap.data();

    const initialData: Billboard | null = data
  ? {
      id: billboardId,
      label: data.label || "", 
      imageUrl: data.imageUrl || "",
      createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
    }
  : null;
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
            <BillboardForm initizalData={initialData} />
            </div>
        </div>
    );
};

export default BillboardPage;
