"use client"

import { Cuisine } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-actions"

export const columns: ColumnDef<Cuisine>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            Name<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.name}</div>
        }
    },
    {
        accessorKey: "value",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            Value<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.value}</div>
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            Date<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            const date = row.getValue("updatedAt") as string;
            return <div className="text-left">{format(new Date(date), "dd-MM-yyyy")}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) =>
            <div className="text-left">
                <CellAction data={row.original} />
            </div>
    }
]
