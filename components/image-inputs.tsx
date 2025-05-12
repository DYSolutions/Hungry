"use client";
import Image from "next/image";
import { sb } from "@/lib/supbase";
import { ImagePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { Button } from "./ui/button";

interface ImageInputProps {
    value: string[];
    disabled?: boolean;
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

const ImageInput = ({ value, onChange, onRemove }: ImageInputProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files || e.target.files.length === 0) {
            toast.error("No file selected!");
            return;
        }

        const newUrls: string[] = [];
        const imageLength = e.target.files.length;
        let uploadedCount = 0;


        console.log("File selected:", e.target.files);

        setIsLoading(true);
        setProgress(0);

        Array.from(e.target.files).forEach(async (file) => {
            const filePath = `Images/${Date.now()}_${file.name}`;
            const bucket = "multistoreapp";

            try {
                const { data, error } = await sb.storage.from(bucket).createSignedUploadUrl(filePath);

                if (error || !data?.signedUrl) {
                    throw new Error("Failed to get signed URL");
                }

                const uploadUrl = data.signedUrl;

                const xhr = new XMLHttpRequest();
                xhr.open("PUT", uploadUrl, true);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentCompleted = (event.loaded * 100) / event.total;
                        setProgress(percentCompleted);
                    }
                };

                xhr.onload = async () => {
                    if (xhr.status === 200) {

                        const { data: publicUrlData } = sb.storage.from(bucket).getPublicUrl(filePath);
                        if (publicUrlData) {
                            console.log("File URL:", publicUrlData.publicUrl);
                            newUrls.push(publicUrlData.publicUrl);
                            uploadedCount++;
                            if (uploadedCount === imageLength) {
                                onChange([...value, ...newUrls]);
                                toast.success("Images uploaded!");
                            }
                        }
                    } else {
                        toast.error("Upload failed!");
                    }
                    setIsLoading(false);
                };

                xhr.onerror = () => {
                    toast.error("Upload error occurred");
                    setIsLoading(false);
                };

                xhr.send(file);
            } catch (err) {
                console.error("Upload error:", err);
                toast.error("Upload failed!");
                setIsLoading(false);
            }
        })

        e.target.value = "";
    };

    const onRemoveImage = async (imageUrl: string) => {

        onRemove(imageUrl);

        const bucket = "multistoreapp";

        const file = imageUrl.split(`${bucket}/`)[1]; // Extract path after the bucket name
        const filePath = decodeURIComponent(file);
        console.log("Deleting filePath:", filePath);

        if (!filePath) {
            toast.error("Invalid file path");
            return;
        }

        try {
            const { error } = await sb.storage.from(bucket).remove([filePath]);
            if (error) {
                toast.error("Failed to delete image");
                console.error("Delete error:", error);
            } else {
                toast.success("Image removed!");
            }
        } catch (err) {
            toast.error("Error deleting image");
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="w-[1500px] flex flex-row gap-4 overflow-x-scroll">
            <div className="w-52 h-52 rounded-md border border-dashed border-gray-200 flex flex-col gap-3 items-center justify-center">
                {isLoading ? (
                    <div className="w-52 h-52 flex flex-col items-center justify-center gap-2">
                        <PuffLoader size={30} color="#555" />
                        <p>{`${progress.toFixed(2)}%`}</p>
                    </div>
                ) : (
                    <>
                        <label>
                            <div className="w-52 h-52 flex flex-col items-center justify-center gap-2 cursor-pointer">
                                <ImagePlus className="h-4 w-4" />
                                <p>Upload an image</p>
                            </div>
                            <input type="file" accept="image/*" multiple onChange={onUpload} className="w-0 h-0" />
                        </label>
                    </>
                )}
            </div>

            <div className="mb-4 flex items-center gap-4">
                {value.map((imageUrl, index) => (
                    <div key={index} className="relative w-52 h-52 rounded-md">
                        <Image src={imageUrl} alt={`Uploaded Image ${index}`} fill />
                        <div className="absolute z-20 right-2 top-2">
                            <Button type="button" onClick={() => onRemoveImage(imageUrl)} variant={"destructive"} size={"icon"} className="cursor-pointer"><Trash className="w-4 h-4" /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageInput;
