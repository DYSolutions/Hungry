import Navbar from "@/components/nav-bar";
import { db } from "@/lib/firebase";
import { Store } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
    children: React.ReactNode
    params: { storeId: string }
}

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {

    const { userId } = await auth()
    const { storeId } = await params

    if (!userId) {
        redirect("/sign-in")
    }

    const storeSnap = await getDocs(
        query(
            collection(db, "stores"),
            where("userId", "==", userId),
            where("id", "==", storeId)
        )
    )

    const store = storeSnap.docs[0]?.data() as Store | undefined;

    // console.log("check", store)

    if (!store) {
        redirect("/")
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default DashboardLayout;