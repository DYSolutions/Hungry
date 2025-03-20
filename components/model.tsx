'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

export interface ModelProps{
    title:string
    description : string
    isOpen:boolean
    onClose:()=>void
    children?:React.ReactNode
}

const Model = ({title,description,children,isOpen}:ModelProps) => {
  return (
    <Dialog open={isOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="">{children}</div>
        </DialogContent>
    </Dialog>
  )
}

export default Model
