import Model from "@/components/model"
import { useStoreModel } from "@/hooks/use-store-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


const formSchema = z.object({
    username: z.string().min(3, {
        message: "store name must be at 3 characters"
    })
})
export const StoreModel = () => {
    const storeModel = useStoreModel()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="your store name..." {...field} />
                                </FormControl>
                                <FormDescription> This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex flex-row items-center justify-end gap-3">
                        <Button type="button" onClick={storeModel.onClose} variant={"outline"} className="cursor-pointer">Cancel</Button>
                        <Button type="submit" className="cursor-pointer">Submit</Button>
                    </div>
                </form>
            </Form>
        </Model>
    )
}