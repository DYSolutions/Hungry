import { Separator } from "@/components/ui/separator";
import BillboardClient from "./components/client";


const Billboards = () => {
    return (
        <div className="flex-col">
           <div className="flex-1 space-y-5 p-8 pt-6">
                <BillboardClient />
                <Separator/>
            </div>
        </div>
    );
}

export default Billboards;