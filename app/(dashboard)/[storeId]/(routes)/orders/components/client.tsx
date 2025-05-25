'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns"
import { useEffect } from "react";
import { Kitchen, Order } from "@/types";

interface OrdersClientProps {
    data: Order[];
}

const OrdersClient = ({ data }: OrdersClientProps) => {

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [router])

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Orders (${data.length})`} description={"Manage Orders for your store"} />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchItem={"id"} />
        </>
    );
}

export default OrdersClient;