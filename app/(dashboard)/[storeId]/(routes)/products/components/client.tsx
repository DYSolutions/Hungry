'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import {columns} from "./columns"
import { useEffect } from "react";

interface ProductClientProps {
    data: Product[];
}

const ProductClient = ({ data }: ProductClientProps) => {

    const params = useParams()
    const router = useRouter()

    useEffect(()=>{
        router.refresh()
    },[router])
    
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description={"Manage products for your store"} />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchItem={"Name"}/>
        </>
    );
}

export default ProductClient;