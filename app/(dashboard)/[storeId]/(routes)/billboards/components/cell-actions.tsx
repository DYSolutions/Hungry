'use client'

import { Billboard } from "@/types";
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
import { sb } from "@/lib/supbase";
import { useLoader } from "@/hooks/use-loader";

interface CellActionProps {
    data: Billboard
}

const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter()
    const params = useParams()
    const loader = useLoader()

    const handleDeleteBillboard = async () => {

        const bucket = "multistoreapp";
        const filePath = data.imageUrl.split(`${bucket}/`)[1]; // Extract path after the bucket name

        if (!filePath) {
            toast.error("Invalid file path");
            return;
        }

        try {
            loader.onStartLoader()
            const { storeId } = await params
            const response = await axios.delete(`/api/stores/${storeId}/billboards/${data.id}`)
            const { error } = await sb.storage.from(bucket).remove([filePath]);
            if (error) {
                toast.error("Failed to delete image");
                console.error("Delete error:", error);
            }
            toast.success("Billboard deleted")

            if (response) {
                router.push(`/${storeId}/billboards`)
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
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)} className="cursor-pointer"><Repeat2 />Update</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={copyToClipboard}><Copy />Copy id</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleDeleteBillboard()}><Trash />Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default CellAction;