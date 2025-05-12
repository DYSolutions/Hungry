"use client"

import { Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-actions"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "Name",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Name<ArrowUpDown size={'icon'} width={4} height={4} className="w-4 h-4 object-contain" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.name}</div>
        }
    },
    {
        accessorKey: "Price",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Price
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.price}</div>
        }
    },
    {
        accessorKey: "isFeatured",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Featured
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.isFeatured.toString()}</div>
        }
    },
    {
        accessorKey: "isArchived",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Archived
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.isArchived.toString()}</div>
        }
    },
    {
        accessorKey: "Catogary",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Catogary
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.category}</div>
        }
    },
    {
        accessorKey: "Size",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Size
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.size}</div>
        }
    },
    {
        accessorKey: "Kitchen",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Kitchen
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.kitchen}</div>
        }
    },
    {
        accessorKey: "Cuisine",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Cuisine
        </div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.cuisine}</div>
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <div className="text-center text-gray-500 flex flex-row gap-2 justify-center">
            Date<ArrowUpDown size={'icon'} width={4} height={4} className="w-4 h-4 object-contain" />
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
