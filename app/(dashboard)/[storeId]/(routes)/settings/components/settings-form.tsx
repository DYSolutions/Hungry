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
import AlertBox from "@/components/alert-box";
import axios from "axios";
import ApiAlert from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";


interface SettingsFormProps {
    initizalData: {
        id: string;
        name: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
    }
}

const formSchema = z.object({
    name: z.string().min(3, {
        message: "store name must be at 3 characters"
    })
})

const SettingsForm = ({ initizalData }: SettingsFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const origin =useOrigin()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initizalData
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const { storeId } = params
            setIsLoading(true)
            console.log("Updating data:", data)
            const response = await axios.patch(`/api/stores/${storeId}`, data)
            toast.success("Store name updated")
            if (response) {
                router.refresh()
            } else {
                console.warn("Document updated but no ID found.");
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteStore = async () => {
        try {
            setIsLoading(true)
            const { storeId } = await params
            const response = await axios.delete(`/api/stores/${storeId}`)
            toast.success("Store deleted")
            if (response) {
                router.push("/")
            }
        } catch (error) {
            console.log("DELETE_STORE:", error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <Heading title="settings" description="Manage store preferances" />
                <AlertBox
                    title={"Are your want to delete this store?"}
                    description={"if you click yes the all information and data of this store are permanantly deleted in the database"}
                    onSubmit={handleDeleteStore} />
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[20%]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="your store name..." {...field} />
                                </FormControl>
                                {/* <FormDescription> This is your public display name.</FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} type="submit" className="cursor-pointer">Save changes</Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert title={"NEXT_PUBLIC_API_URL"} description={`${origin}/${params.storeId}/settings`} variant={"public"}/>
        </>
    );
}

export default SettingsForm;