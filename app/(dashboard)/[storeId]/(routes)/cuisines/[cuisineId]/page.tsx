import { db } from "@/lib/firebase";
import CuisineForm from "../components/cuisine-form";
import { Cuisine } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface CuisineProps {
    params: {
        cuisineId: string;
        storeId: string;
    };
}

const CuisinePage = async ({ params }: CuisineProps) => {
    const { storeId, cuisineId } = params;

    const docSnap = await getDoc(doc(db, "stores", storeId, "cuisines", cuisineId));
    const data = docSnap.data();

    const initialData: Cuisine | null = data
        ? {
            id: cuisineId,
            name: data.name,
            value: data.value,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
        }
        : null;
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <CuisineForm initizalData={initialData} />
            </div>
        </div>
    );
};

export default CuisinePage;
