import { db } from "@/lib/firebase";
import { Store } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";

interface SetupLayoutProp {
    children: React.ReactNode
}

const SetupLayout = async ({ children }: SetupLayoutProp) => {

    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const storeSnap = await getDocs(query(collection(db, "stores"), where("userId", "==", userId)))
    const store = storeSnap.docs[0]?.data() as Store | undefined

    if (store) {
        redirect(`/${store?.id}`)
    }
    return (
        <div>
            {children}
        </div>
    );
}

export default SetupLayout;