import React from "react";
import { cn } from "@/lib/utils";

const CheckoutStepsPage = ({current = 0}) => {
    return (
        <div className="flex-between flex-row md:flex-row space-x-2 space-y-2 mb-10">
            {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step,index) =>(
                <React.Fragment key={step}>
                    <div className={cn('p-1 md:p-2 lg:p-2 w-48 md:w-56 lg:w-56 rounded-full text-center text-[10px] lg:text-sm md:text-xs', index === current ? 'bg-secondary' : '' )}>{step}</div>
                    {step !== 'Place Order' && (
                        <hr className=" w-14 md:w-16 lg:w-16 border-t border-gray-300 mx-0 md:mx-2 lg:mx-2"></hr>
                    )}
                </React.Fragment>
            ) )}
        </div>
    );
}
 
export default CheckoutStepsPage;