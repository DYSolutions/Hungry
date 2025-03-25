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
// import AlertBox from "@/components/alert-box";
import axios from "axios";
import { Billboard } from "@/types";
import ImageInput from "@/components/image-input";


interface BillboardFormProps {
    initizalData: Billboard
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

const BillboardForm = ({ initizalData }: BillboardFormProps) => {

    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const title = initizalData ? "Edit billboard" : "Create billbord"
    const description = initizalData ? "Edit the billboard" : "Add new billbord"
    const action = initizalData ? "Save Changes" : "Create billboard"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initizalData || {
            label: '',
            imageUrl: ''
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {


        if (data.imageUrl === "") {
            toast.error("Image not selected")
        }

        if (data.label === "") {
            toast.error("Enter the billboard name")
        }

        try {
            const { storeId } = params
            setIsLoading(true)
            console.log("Uploded data:", data)
            const response = await axios.post(`/api/stores/${storeId}/billboards`, data)
            toast.success("Billboard created")
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
        }
    }

    // const handleDeleteStore = async () => {
    //     try {
    //         setIsLoading(true)
    //         const { storeId } = await params
    //         const response = await axios.delete(`/api/stores/${storeId}`)
    //         toast.success("Store deleted")
    //         if (response) {
    //             router.push("/")
    //         }
    //     } catch (error) {
    //         console.log("DELETE_STORE:", error)
    //         toast.error("Something went wrong")
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    return (
        <>
            <div className="flex items-center justify-center">
                <Heading title={title} description={description} />
                {/* {initizalData && (
                    <AlertBox
                        title={"Are your want to delete this store?"}
                        description={"if you click yes the all information and data of this store are permanantly deleted in the database"}
                        onSubmit={handleDeleteStore}
                    />
                )} */}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[20%]">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard image</FormLabel>
                                <FormControl>
                                    <ImageInput
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="your billboard name..." {...field} />
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

export default BillboardForm