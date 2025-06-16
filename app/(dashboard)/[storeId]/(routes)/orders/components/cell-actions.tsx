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
import { collection, doc, getDocs, serverTimestamp, updateDoc } from "@firebase/firestore";
import { db } from "@/lib/firebase";

interface CellActionProps {
    data: Order
}

const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter()
    const params = useParams()
    const loader = useLoader()

    const handleClick = async (status: string, data: Order) => {
        try {
            loader.onStartLoader();
            const docRef = doc(db, "users", data.userId, "orders", data.id);

            let color = "";
            switch (status) {
                case "PENDING":
                    color = "bg-yellow-500";
                    break;
                case "DELIVERING":
                    color = "bg-gray-500";
                    break;
                case "DELIVERED":
                    color = "bg-blue-500";
                    break;
                case "COMPLETED":
                    color = "bg-green-500";
                    break;
            }

            await updateDoc(docRef, {
                status: {
                    name: status,
                    color: color
                },
                updatedAt: new Date().toISOString()
            });

            toast.success("Status updated");
            router.refresh();
        } catch (error) {
            console.log("ERROR UPDATE STATUS", error);
        } finally {
            loader.onStopLoader();
        }
    };


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger><EllipsisVertical className="cursor-pointer" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {data.status.name !== "CANCELED" ? (
                        <>
                            <DropdownMenuItem onClick={() => handleClick("PENDING", data)} className="cursor-pointer"><Clock />PENDING</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClick("DELIVERING", data)} className="cursor-pointer"><Truck />DELIVERING</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClick("DELIVERED", data)} className="cursor-pointer"><Package />DELIVERED</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClick("COMPLETED", data)} className="cursor-pointer"><PackageCheckIcon />COMPLETED</DropdownMenuItem>
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