import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import { StoreSwitch } from "./store-switch";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Store } from "@/types";

const Navbar = async () => {

    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const storeSnap = await getDocs(
        query(collection(db, "stores"), where("userId", "==", userId))
    )

    const stores = storeSnap.docs.map((doc) => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt.toDate().toISOString(), // Convert Timestamp to string
            updatedAt: data.updatedAt.toDate().toISOString(), // Convert Timestamp to string
        } as Store
    })

    return (
        <div className="border-b h-16 flex items-center px-4">
            <StoreSwitch items={stores} />

            {/* routes */}
            <MainNav />

            {/* usericon */}
            <div className="ml-auto"><UserButton /></div>
        </div>
    );
}

export default Navbar;