"use client"

import { Order } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-actions"

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "userId",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            UserId<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.userId}</div>
        }
    },
      {
        accessorKey: "id",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            OrderId<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.id}</div>
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            Total Price<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.totalPrice} LKR</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-left text-gray-500  flex flex-row gap-2">
            Date<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.createdAt.toString().slice(0, 15)}</div>;
        },
    },
      {
        accessorKey: "paid",
        header: () => <div className="text-left text-gray-500  flex flex-row gap-2">
            Paid<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className="text-left bg-green-600 text-white p-2 rounded-md">{"Paid"}</div>;
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-left text-gray-500 flex flex-row gap-2">
            Status<ArrowUpDown size={'icon'} className="w-4 h-4" />
        </div>,
        cell: ({ row }) => {
            return <div className={`text-left ${row.original.status.color} p-2 text-white rounded-md`}>{row.original.status.name}</div>
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
