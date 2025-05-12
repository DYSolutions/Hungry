import { collection, getDocs, Timestamp } from "firebase/firestore";
import ProductClient from "./components/client";
import { db } from "@/lib/firebase";
import { Product } from "@/types";
import { format } from "date-fns";


const Products = async ({ params }: { params: { storeId: string } }) => {

    const { storeId } = await params

    const fetchProductsData = (await getDocs(collection(db, "stores", `${storeId}`, "products"))).docs.map((doc) => {
        const data = doc.data() as Product;

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
                <ProductClient data={fetchProductsData} />
            </div>
        </div>
    );
}

export default Products;