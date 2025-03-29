'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns"
import { useEffect } from "react";
import { Kitchen } from "@/types";

interface KitchenClientProps {
    data: Kitchen[];
}

const KitchenClient = ({ data }: KitchenClientProps) => {

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [router])

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Kitchens (${data.length})`} description={"Manage kitchens for your store"} />
                <Button onClick={() => router.push(`/${params.storeId}/kitchens/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchItem={"name"} />
        </>
    );
}

export default KitchenClient;