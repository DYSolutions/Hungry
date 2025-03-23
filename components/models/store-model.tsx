import Model from "@/components/model"
import { useStoreModel } from "@/hooks/use-store-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(3, {
        message: "store name must be at 3 characters"
    })
})
export const StoreModel = () => {
    const storeModel = useStoreModel()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            console.log("Sending data:", values)
            const response = await axios.post(`/api/stores`, values)
            toast.success("Store created successfully")
            window.location.assign(`/${response.data.id}`)
            console.log(response)
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Model title={"Create a new store"}
            description={"Add a new store to manage the products and catagories"}
            isOpen={storeModel.isOpen}
            onClose={storeModel.onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <div className="w-full flex flex-row items-center justify-end gap-3">
                        <Button disabled={isLoading} type="button" onClick={storeModel.onClose} variant={"outline"} className="cursor-pointer">Cancel</Button>
                        <Button disabled={isLoading} type="submit" className="cursor-pointer">Submit</Button>
                    </div>
                </form>
            </Form>
        </Model>
    )
}