'use client'
import Model from "@/components/model";

const SetupPage = () => {
    return ( 
    <div className="">
        <Model title={"Create your store"} description={"This is the store model"} isOpen onClose={()=>{}}>
            This is  the model
        </Model>
    </div> 
    );
}
 
export default SetupPage;