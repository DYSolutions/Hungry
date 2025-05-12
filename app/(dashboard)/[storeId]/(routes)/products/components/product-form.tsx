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
import { Catagory, Cuisine, Kitchen, Product, Size } from "@/types";
import ImageInput from "@/components/image-inputs";
import AlertBox from "@/components/alert-box";
import { sb } from "@/lib/supbase";
import { Trash } from "lucide-react";
import { useLoader } from "@/hooks/use-loader";
import { SelectScrollable } from "./product-selecter";
import { Checkbox } from "@/components/ui/checkbox";
import { set } from "date-fns";


interface ProductFormProps {
    initizalData: Product | null
}

const formSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().min(1),
    images: z.object({ url: z.string() }).array().nonempty("At least one image is required"),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    size: z.string().min(1),
    kitchen: z.string().min(1),
    category: z.string().min(1),
    cuisine: z.string().min(1),
})

const ProductForm = ({ initizalData }: ProductFormProps) => {

    const params = useParams()
    const router = useRouter()
    const loader = useLoader()
    const [isLoading, setIsLoading] = useState(false)

    const title = initizalData ? "Edit product" : "Create product"
    const description = initizalData ? "Edit the product" : "Add new product"
    const action = initizalData ? "Save Changes" : "Create product"

    const [sizes, setSizes] = useState<{ id: string; name: string }[]>([]);
    const [catagories, setCatagories] = useState<{ id: string; name: string }[]>([]);
    const [cuisines, setCuisines] = useState<{ id: string; name: string }[]>([]);
    const [kitchens, setKitchens] = useState<{ id: string; name: string }[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initizalData
            ? { ...initizalData, price: parseFloat(initizalData.price) }
            : {
                name: "",
                price: 0,
                images: [],
                size: "",
                kitchen: "",
                category: "",
                cuisine: "",
                isFeatured: false,
                isArchived: false
            }

    })

    const fetchDropDownData = async () => {
        const { storeId } = params;
        if (!storeId) {
            toast.error("Store not found");
            return;
        }
        try {
            const sizes = await axios.get(`/api/stores/${params.storeId}/sizes`)
            setSizes(sizes.data.map((size: Size) => ({
                id: size.id,
                name: size.value
            })))
            console.log(sizes.data);
            
            const catagories = await axios.get(`/api/stores/${params.storeId}/catagories`)
            setCatagories(catagories.data.map((catagory: Catagory) => ({
                id: catagory.id,
                name: catagory.label
            })))
            console.log(catagories.data);
            const cuisines = await axios.get(`/api/stores/${params.storeId}/cuisines`)
            setCuisines(cuisines.data.map((cuisine: Cuisine) => ({
                id: cuisine.id,
                name: cuisine.value
            })))
            console.log(cuisines.data);
            const kitchens = await axios.get(`/api/stores/${params.storeId}/kitchens`)
            setKitchens(kitchens.data.map((kitchen: Kitchen) => ({
                id: kitchen.id,
                name: kitchen.value
            })))
            console.log(kitchens.data);
        } catch (error) {
            console.log("Error fetching dropdown data:", error)
            toast.error("Failed to fetch dropdown data")
        }
    }

    useEffect(() => {
        fetchDropDownData()
    }, [])

    const memoSizes = useMemo(() => {
        return sizes.map((size) => ({
            id: size.id,
            name: size.name
        }))
    }, [sizes])

    const memoCatagories = useMemo(() => {
        return catagories.map((catagory) => ({
            id: catagory.id,
            name: catagory.name
        }))

    }, [catagories])

    const memoCuisines = useMemo(() => {
        return cuisines.map((cuisine) => ({
            id: cuisine.id,
            name: cuisine.name
        }))
    }, [cuisines])

    const memoKitchens = useMemo(() => {
        return kitchens.map((kitchen) => ({
            id: kitchen.id,
            name: kitchen.name
        }))
    }, [kitchens])

    async function onSubmit(data: z.infer<typeof formSchema>) {

        if (data.images.length === 0) {
            toast.error("Image not selected")
            return
        }

        if (data.name === "") {
            toast.error("Enter the product name")
            return
        }

        if (initizalData) {
            try {
                loader.onStartLoader()
                const { storeId, productId } = params
                setIsLoading(true)
                console.log("Updating data:", data)
                const response = await axios.patch(`/api/stores/${storeId}/products/${productId}`, data)
                toast.success("Product updated")
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
                const response = await axios.post(`/api/stores/${storeId}/products`, data)
                toast.success("Product created")
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

    const handleDeleteProduct = async () => {

        const bucket = "multistoreapp";

        try {
            loader.onStartLoader()
            setIsLoading(true)
            const { storeId, productId } = await params
            const response = await axios.delete(`/api/stores/${storeId}/products/${productId}`)

            initizalData?.images.map(async (image) => {
                const imageUrl = image.url
                const file = imageUrl.split(`${bucket}/`)[1]; // Extract path after the bucket name
                const filePath = decodeURIComponent(file);
                console.log("Deleting filePath:", filePath);

                if (!filePath) {
                    toast.error("Invalid file path");
                    return;
                }
                const { error } = await sb.storage.from(bucket).remove([filePath]);
                if (error) {
                    toast.error("Failed to delete image");
                    console.error("Delete error:", error);
                }
            }
            )

            toast.success("Product deleted")
            if (response) {
                router.push(`/${storeId}/products`)
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
                        title={"Are your want to delete this product?"}
                        description={"if you click yes the all information and data of this store are permanantly deleted in the database"}
                        onSubmit={handleDeleteProduct}
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
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product images</FormLabel>
                                <FormControl>
                                    <ImageInput
                                        value={field.value.map(img => img.url)}
                                        onChange={urls => field.onChange(urls.map(url => ({ url })))}
                                        onRemove={url => field.onChange(field.value.filter(img => img.url !== url))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-[1500px] grid grid-cols-4 gap-4">
                        <div className="w-[300px]">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} placeholder="your product name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[300px]">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} placeholder="your product price..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Size</FormLabel>
                                    <FormControl>
                                        <SelectScrollable
                                            value={field.value ? field.value : ""}
                                            onChange={(name) => field.onChange(name)}
                                            data={memoSizes}
                                            name="size"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Category</FormLabel>
                                    <FormControl>
                                        <SelectScrollable
                                            value={field.value ? field.value : ""}
                                            onChange={(name) => field.onChange(name)}
                                            data={memoCatagories}
                                            name="category"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cuisine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Cuisine</FormLabel>
                                    <FormControl>
                                        <SelectScrollable
                                            value={field.value ? field.value : ""}
                                            onChange={(name) => field.onChange(name)}
                                            data={memoCuisines}
                                            name="cuisine"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="kitchen"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Kitchen</FormLabel>
                                    <FormControl>
                                        <SelectScrollable
                                            value={field.value ? field.value : ""}
                                            onChange={(name) => field.onChange(name)}
                                            data={memoKitchens}
                                            name="kitchen"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="w-[300px] items-top flex space-x-2 border border-gray-200 rounded-md p-4">
                                            <Checkbox id="terms1" className="cursor-pointer" checked={field.value} onCheckedChange={field.onChange} />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="terms1"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Featured
                                                </label>
                                                <p className="text-sm text-muted-foreground">
                                                    You agree to our Terms of Service and Privacy Policy.
                                                </p>
                                            </div>
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="w-[300px] items-top flex space-x-2 border border-gray-200 rounded-md p-4">
                                            <Checkbox id="terms1" className="cursor-pointer" checked={field.value} onCheckedChange={field.onChange} />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="terms1"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Archived
                                                </label>
                                                <p className="text-sm text-muted-foreground">
                                                    You agree to our Terms of Service and Privacy Policy.
                                                </p>
                                            </div>
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={isLoading} type="submit" className="cursor-pointer">{action}</Button>
                </form>
            </Form>
        </>
    );
}

export default ProductForm