import { db } from "@/lib/firebase";
import { Store } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
    params: { storeId: string }
}

const SettingsPage = async ({ params }: SettingsPageProps) => {

    const { userId } = await auth()
    const { storeId } = await params

    if (!userId) {
        redirect("/sign-in")
    }

    const data = (await getDoc(doc(db, "stores", storeId))).data() as Store

    const store={
        ...data,
        id:data.id,
        createdAt: data.createdAt.toDate().toISOString(), // Convert Timestamp to string
        updatedAt: data.updatedAt.toDate().toISOString(), // Convert Timestamp to string
    }

    if (!store || store.userId !== userId) {
        redirect("/")
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-8 pt-6">
                <SettingsForm initizalData={store}/>
            </div>
        </div>
    );
}

export default SettingsPage;