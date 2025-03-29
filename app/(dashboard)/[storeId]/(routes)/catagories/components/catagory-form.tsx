'use client'

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import AlertBox from "@/components/alert-box";
import { Trash } from "lucide-react";
import { useLoader } from "@/hooks/use-loader";
import { Billboard, Catagory } from "@/types";
import { SelectScrollable } from "./billboard-selecter";


interface CatagoryFormProps {
    initizalData: Catagory | null
}

const formSchema = z.object({
    billboardId: z.string().optional(),
    label: z.string().min(1),
})

const CatagoryForm = ({ initizalData }: CatagoryFormProps) => {

    const params = useParams()
    const router = useRouter()
    const loader = useLoader()
    const [isLoading, setIsLoading] = useState(false)
    const [billboards, setBillboards] = useState<{ billboardId: string; billboardName: string }[]>([]);
    // const [billboard, setBillboard] = useState("");

    const title = initizalData ? "Edit catagory" : "Create catagory"
    const description = initizalData ? "Edit the catagory" : "Add new catagory"
    const action = initizalData ? "Save Changes" : "Create catagory"

    const memoizedBillboards = useMemo(() => {
        return billboards.map((billboard) => ({
            billboardId: billboard.billboardId,
            billboardName: billboard.billboardName
        }));
    }, [billboards]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initizalData || {
            billboardId: "",
            label: ""
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        let name;
        if (data.billboardId === "") {
            toast.error("Billboard not selected")
            return
        } else {
            name = billboards.find((doc) => doc.billboardId === data.billboardId)?.billboardName || "";
        }

        if (data.label === "") {
            toast.error("Enter the catagory name")
            return
        }

        const newData = {
            label: data.label,
            billboardId: data.billboardId,
            billboardName: name
        }

        if (initizalData) {
            try {
                loader.onStartLoader()
                const { storeId, catagoryId } = params
                setIsLoading(true)
                console.log("Updating data:", newData)
                const response = await axios.patch(`/api/stores/${storeId}/catagories/${catagoryId}`, newData)
                toast.success("Catagory updated")
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
                console.log("Uploded data:", newData)
                const response = await axios.post(`/api/stores/${storeId}/catagories`, newData)
                toast.success("Catagory created")
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

    const handleDeleteCatagory = async () => {
        try {
            loader.onStartLoader()
            setIsLoading(true)
            const { storeId, catagoryId } = await params
            const response = await axios.delete(`/api/stores/${storeId}/catagories/${catagoryId}`)
            toast.success("Catagory deleted")
            if (response) {
                router.push(`/${storeId}/catagories`)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setIsLoading(false)
            loader.onStopLoader()
        }
    }


    useEffect(() => {
        const fetchBillboards = async () => {
            try {
                const { storeId } = params;
                if (!storeId) {
                    toast.error("Store not found");
                    return;
                }
                const { data } = await axios.get(`/api/stores/${storeId}/billboards`);
                setBillboards(data.map((billboard: Billboard) => ({ billboardId: billboard.id, billboardName: billboard.label })));
            } catch (error) {
                console.error("Error fetching billboards:", error);
                toast.error("Failed to load billboards");
            }
        };
        fetchBillboards();
    }, [params]);

    return (
        <>
            <div className="flex items-center justify-center">
                <Heading title={title} description={description} />
                {initizalData && (
                    <AlertBox
                        title={"Are your want to delete this catagory?"}
                        description={"if you click yes the all information and data of this store are permanantly deleted in the database"}
                        onSubmit={handleDeleteCatagory}
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
                        name="billboardId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Billboard</FormLabel>
                                <FormControl>
                                    <SelectScrollable
                                        value={field.value ? field.value : ""}
                                        onChange={(name) => field.onChange(name)}
                                        data={memoizedBillboards}
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
                                    <Input className="w-[300px]" disabled={isLoading} placeholder="your catagory name..." {...field} />
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

export default CatagoryForm