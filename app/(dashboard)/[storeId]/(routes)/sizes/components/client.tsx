'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns"
import { useEffect } from "react";
import { Size } from "@/types";

interface SizeClientProps {
    data: Size[];
}

const SizeClient = ({ data }: SizeClientProps) => {

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [router])

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`sizes (${data.length})`} description={"Manage sizes for your store"} />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchItem={"name"} />
        </>
    );
}

export default SizeClient;