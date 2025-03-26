'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Billboard } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import {columns} from "./columns"
import { useEffect } from "react";

interface BillBoardClientProps {
    data: Billboard[];
}

const BillboardClient = ({ data }: BillBoardClientProps) => {

    const params = useParams()
    const router = useRouter()

    useEffect(()=>{
        router.refresh()
    },[router])
    
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${data.length})`} description={"Manage billboars for your store"} />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchItem={"label"}/>
        </>
    );
}

export default BillboardClient;