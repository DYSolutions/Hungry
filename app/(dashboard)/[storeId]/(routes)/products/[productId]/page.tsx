import { db } from "@/lib/firebase";
import ProductForm from "../components/product-form";
import { Product } from "@/types";
import { doc, getDoc } from "firebase/firestore";

interface ProductProps {
    params: {
        productId: string;
        storeId: string;
    };
}

const ProductPage = async ({ params }: ProductProps) => {
    const { storeId, productId } = await params;

    const docSnap = await getDoc(doc(db, "stores", storeId, "products", productId));
    const data = docSnap.data();

    const initialData: Product | null = data
        ? {
            id: productId,
            name: data.name || "",
            images: data.images || [],
            price: data.price || 0,
            isFeatured: data.isFeatured || false,
            isArchived: data.isArchived || false,
            size: data.size || "",
            category: data.category || "",
            cuisine: data.cuisine || "",
            kitchen: data.kitchen || "",
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
        }
        : null;
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <ProductForm initizalData={initialData} />
            </div>
        </div>
    );
};

export default ProductPage;
