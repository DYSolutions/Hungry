'use client'
import { useLoader } from "@/hooks/use-loader";

const Loader = () => {

    const loader = useLoader()
    return (
        <>
            {loader.isLoading && (
                <div className="absolute w-full h-[100%] bg-[#cecbcb67] z-50">
                    <div className="flex flex-row gap-5 text-black font-semibold absolute right-[50%] top-[50%]">
                        <span className="loading loading-spinner loading-xl text-[#6b6a6a]"></span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Loader;