import { Separator } from "@/components/ui/separator";
import BillboardClient from "./components/client";


const Billboards = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-4 pt-6">
                <BillboardClient />
            </div>
            <Separator/>
        </div>
    );
}

export default Billboards;