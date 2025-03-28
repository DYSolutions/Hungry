import { db } from "@/lib/firebase";
import { Catagory } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import CatagoryForm from "../components/catagory-form";

interface BillboardProps {
    params: {
        catagoryId: string;
        storeId: string;
    };
}

const BillboardPage = async ({ params }: BillboardProps) => {
    const { storeId, catagoryId } = params;

    const docSnap = await getDoc(doc(db, "stores", storeId, "catagories", catagoryId));
    const data = docSnap.data();

    const initialData: Catagory | null = data
        ? {
            id: catagoryId,
            label: data.label || "",
            billboardId: data.billboardId || "",
            billboardName: data.billboardName || "",
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
        }
        : null;
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <CatagoryForm initizalData={initialData} />
            </div>
        </div>
    );
};

export default BillboardPage;
