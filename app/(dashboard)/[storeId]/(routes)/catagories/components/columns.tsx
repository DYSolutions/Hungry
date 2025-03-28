"use client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-actions"
import { Catagory } from "@/types"

export interface ColumnsProps {
    id: string,
    billboardId: string,
    billboardName: string,
    label: string,
    createdAt: string,
    updatedAt: string
}

export const columns: ColumnDef<Catagory>[] = [

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
        accessorKey: "billboardName",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Billboard<ArrowUpDown size={'icon'} className="w-4 h-4" />
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
