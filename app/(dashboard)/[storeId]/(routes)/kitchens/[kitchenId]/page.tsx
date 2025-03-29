import { db } from "@/lib/firebase";
import KitchenForm from "../components/kitchen-form";
import { Kitchen } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface KitchenProps {
    params: {
        kitchenId: string;
        storeId: string;
    };
}

const KitchenPage = async ({ params }: KitchenProps) => {
    const { storeId, kitchenId } = params;

    const docSnap = await getDoc(doc(db, "stores", storeId, "kitchens", kitchenId));
    const data = docSnap.data();

    const initialData: Kitchen | null = data
        ? {
            id: kitchenId,
            name: data.name,
            value: data.value,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
        }
        : null;
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <KitchenForm initizalData={initialData} />
            </div>
        </div>
    );
};

export default KitchenPage;
