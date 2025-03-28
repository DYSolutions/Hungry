'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, EllipsisVertical, Repeat2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useLoader } from "@/hooks/use-loader";
import { Catagory } from "@/types";

interface CellActionProps {
    data: Catagory
}

const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter()
    const params = useParams()
    const loader = useLoader()

    const handleDeleteCatagory = async () => {

        try {
            loader.onStartLoader()
            const { storeId } = await params
            const response = await axios.delete(`/api/stores/${storeId}/catagories/${data.id}`)
            toast.success("Catagory deleted")

            if (response) {
                router.push(`/${storeId}/catagories`)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            loader.onStopLoader()
        }
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(data.id)
            toast.success("Coppied")
        } catch (error) {
            toast.error("Faild to copy")
            console.error("Failed to copy:", error);
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger><EllipsisVertical className="cursor-pointer" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/catagories/${data.id}`)} className="cursor-pointer"><Repeat2 />Update</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={copyToClipboard}><Copy />Copy id</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleDeleteCatagory()}><Trash />Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default CellAction;