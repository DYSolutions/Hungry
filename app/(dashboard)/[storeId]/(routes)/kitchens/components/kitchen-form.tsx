'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Kitchen } from "@/types";
import AlertBox from "@/components/alert-box";
import { Trash } from "lucide-react";
import { useLoader } from "@/hooks/use-loader";


interface KitchenFormProps {
    initizalData: Kitchen | null
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

const KitchenForm = ({ initizalData }: KitchenFormProps) => {

    const params = useParams()
    const router = useRouter()
    const loader = useLoader()
    const [isLoading, setIsLoading] = useState(false)

    const title = initizalData ? "Edit kitchen" : "Create kitchen"
    const description = initizalData ? "Edit the kitchen" : "Add new kitchen"
    const action = initizalData ? "Save Changes" : "Create kitchen"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initizalData || {
            value: '',
            name: ''
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {

        if (data.value === "") {
            toast.error("Enter the kitchen value")
            return
        }

        if (data.name === "") {
            toast.error("Enter the kitchen name")
            return
        }

        if (initizalData) {
            try {
                loader.onStartLoader()
                const { storeId, kitchenId } = params
                setIsLoading(true)
                console.log("Updating data:", data)
                const response = await axios.patch(`/api/stores/${storeId}/kitchens/${kitchenId}`, data)
                toast.success("kitchen updated")
                if (response) {
                    router.back()
                } else {
                    console.warn("Something went wrong");
                }
            } catch (error) {
                toast.error("Something went wrong")
                console.log(error)
            } finally {
                setIsLoading(false)
                loader.onStopLoader()
            }

        } else {
            try {
                loader.onStartLoader()
                const { storeId } = params
                setIsLoading(true)
                console.log("Uploded data:", data)
                const response = await axios.post(`/api/stores/${storeId}/kitchens`, data)
                toast.success("kitchen created")
                if (response) {
                    router.back()
                } else {
                    console.warn("Something went wrong");
                }
            } catch (error) {
                toast.error("Something went wrong")
                console.log(error)
            } finally {
                setIsLoading(false)
                loader.onStopLoader()
            }
        }
    }

    const handleDeleteKitchen = async () => {
        try {
            loader.onStartLoader()
            setIsLoading(true)
            const { storeId, kitchenId } = await params
            const response = await axios.delete(`/api/stores/${storeId}/kitchens/${kitchenId}`)
            toast.success("kitchen deleted")
            if (response) {
                router.push(`/${storeId}/kitchens`)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setIsLoading(false)
            loader.onStopLoader()
        }
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <Heading title={title} description={description} />
                {initizalData && (
                    <AlertBox
                        title={"Are your want to delete this kitchen?"}
                        description={"if you click yes the all information and data of this store are permanantly deleted in the database"}
                        onSubmit={handleDeleteKitchen}
                    >
                        <Button variant="destructive" size="icon" style={{ cursor: "pointer" }}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </AlertBox>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[20%]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="your kitchen name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="your kitchen value..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} type="submit" className="cursor-pointer">{action}</Button>
                </form>
            </Form>
        </>
    );
}

export default KitchenForm