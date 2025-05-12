import { db } from "@/lib/firebase";
import SizeForm from "../components/size-form";
import { Size } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface SizeProps {
    params: {
        sizeId: string;
        storeId: string;
    };
}

const SizePage = async ({ params }: SizeProps) => {
    const { storeId, sizeId } = await params;

    const docSnap = await getDoc(doc(db, "stores", storeId, "sizes", sizeId));
    const data = docSnap.data();

    const initialData: Size | null = data
        ? {
            id: sizeId,
            name: data.name,
            value: data.value,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
        }
        : null;
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <SizeForm initizalData={initialData} />
            </div>
        </div>
    );
};

export default SizePage;
