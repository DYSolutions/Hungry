"use client"

import { Billboard } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import CellImage from "./cell-image"
import { format } from "date-fns"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-actions"

export const columns: ColumnDef<Billboard>[] = [
    {
        accessorKey: "imageUrl",
        header: () => <div className="text-gray-500">
            Image
        </div>,
        cell: ({ row }) => {
            const { imageUrl } = row.original
            return <CellImage imageUrl={imageUrl} />
        }
    },
    {
        accessorKey: "label",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Label<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.label}</div>
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Date<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            const date = row.getValue("updatedAt") as string;
            return <div className="text-center">{format(new Date(date), "dd-MM-yyyy")}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) =>
            <div className="text-center">
                <CellAction data={row.original} />
            </div>
    }
]
