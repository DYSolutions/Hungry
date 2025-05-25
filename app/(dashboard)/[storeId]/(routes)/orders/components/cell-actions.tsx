'use client'

import { Kitchen, Order } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ban, Clock, Copy, EllipsisVertical, Package, Package2, PackageCheckIcon, Repeat2, Trash, Truck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useLoader } from "@/hooks/use-loader";

interface CellActionProps {
    data: Order
}

const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter()
    const params = useParams()
    const loader = useLoader()



    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger><EllipsisVertical className="cursor-pointer" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {data.status.name !== "CANCELED" ? (<>
                        <DropdownMenuItem className="cursor-pointer"><Clock />PENDING</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer"><Truck />DELIVERING</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer"><Package />DELIVERED</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer"><PackageCheckIcon />COMPLETED</DropdownMenuItem>
                    </>
                    ) : (
                        <>
                            <DropdownMenuItem className="cursor-not-allowed"><Ban />CANCELED</DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default CellAction;