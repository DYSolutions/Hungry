'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@//components/ui/button"
import toast from "react-hot-toast"

interface ApiAlertProps {
    title: string,
    description: string,
    variant: "public" | "admin"
}

type BadgeVariant = "secondary" | "destructive" | "default" | "outline";

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const varientMap: Record<ApiAlertProps["variant"],BadgeVariant> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {

    const copyToClipboard=async ()=>{
        try {
            await navigator.clipboard.writeText(description)
            toast.success("Coppied")
        } catch (error) {
            toast.error("Faild to copy")
            console.error("Failed to copy:", error);
        }
    }
    return (
        <>
            <Alert>
               <Server className="h-4 w-4"/>
                <AlertTitle>{title}
                    <Badge className="ml-2" variant={varientMap[variant]}>{textMap[variant]}</Badge>
                </AlertTitle>
                <AlertDescription className="mt-2 flex items-center justify-between">
                   <code className="relative text-black rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">{description}</code>
                   <Button variant={"outline"} size={"icon"}  onClick={copyToClipboard}><Copy className="h-4 w-4"/></Button>
                </AlertDescription>
            </Alert>
        </>
    );
}

export default ApiAlert;