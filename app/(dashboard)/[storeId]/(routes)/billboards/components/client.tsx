'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BillboardClient = () => {

    const params = useParams()
    const router = useRouter()

    return (
        <div className="flex items-center justify-between">
            <Heading title={"Billboards (0)"} description={"Manage billboars for your store"} />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="w-4 h-4 mr-2" />
                Add new
            </Button>
        </div>
    );
}

export default BillboardClient;