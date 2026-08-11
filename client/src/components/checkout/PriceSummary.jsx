import {
    useNavigate
} from "react-router-dom";

import {
    ShoppingBag,
    Truck,
    Tag,
    ReceiptText,
    Package
} from "lucide-react";

const PriceSummary = ({
    subtotal = 0,
    shipping = 0,
    tax = 0,
    discount = 0,
    total = 0,
    itemCount = 0
}) => {

    const navigate = useNavigate();

    return (
        <div className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-xl
            overflow-hidden
            sticky
            top-24
        ">

            {/* Header */}
            <div className="
                bg-gradient-to-r
                from-gray-900
                to-gray-800
                px-6
                py-5
                text-white
            ">

                <div className="flex items-center gap-3">

                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-yellow-400
                        text-gray-900
                        flex
                        items-center
                        justify-center
                    ">
                        <ReceiptText size={22} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            Order Summary
                        </h2>

                        <p className="text-sm text-gray-300">
                            Review your order
                        </p>
                    </div>

                </div>

            </div>


            {/* Summary */}
            <div className="p-6">

                <div className="space-y-5">

                    {/* Items */}
                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-9
                                h-9
                                rounded-lg
                                bg-gray-100
                                flex
                                items-center
                                justify-center
                            ">
                                <Package
                                    size={18}
                                    className="text-gray-600"
                                />
                            </div>

                            <span className="text-gray-600">
                                Items
                            </span>

                        </div>

                        <span className="font-semibold text-gray-900">
                            {itemCount}
                        </span>

                    </div>


                    {/* Subtotal */}
                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            Subtotal
                        </span>

                        <span className="font-medium">
                            ₹{subtotal.toFixed(2)}
                        </span>

                    </div>


                    {/* Shipping */}
                    <div className="flex justify-between">

                        <div className="flex items-center gap-2">

                            <Truck
                                size={18}
                                className="text-gray-500"
                            />

                            <span className="text-gray-600">
                                Shipping
                            </span>

                        </div>

                        <span className="
                            font-semibold
                            text-green-600
                        ">
                            {
                                shipping === 0
                                    ? "FREE"
                                    : `₹${shipping.toFixed(2)}`
                            }
                        </span>

                    </div>


                    {/* GST */}
                    <div className="flex justify-between">

                        <span className="text-gray-600">
                            GST (18%)
                        </span>

                        <span className="font-medium">
                            ₹{tax.toFixed(2)}
                        </span>

                    </div>


                    {/* Discount */}
                    <div className="
                        flex
                        justify-between
                        bg-green-50
                        rounded-lg
                        px-3
                        py-2
                    ">

                        <div className="flex items-center gap-2">

                            <Tag
                                size={17}
                                className="text-green-600"
                            />

                            <span className="
                                text-green-700
                                font-medium
                            ">
                                Discount
                            </span>

                        </div>

                        <span className="
                            text-green-700
                            font-semibold
                        ">
                            -₹{discount.toFixed(2)}
                        </span>

                    </div>

                </div>


                {/* Divider */}
                <div className="
                    border-t
                    border-dashed
                    border-gray-300
                    my-6
                " />


                {/* Total */}
                <div className="
                    flex
                    justify-between
                    items-center
                ">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Total Amount
                        </p>

                        <p className="
                            text-2xl
                            font-extrabold
                            text-gray-900
                            mt-1
                        ">
                            ₹{total.toFixed(2)}
                        </p>
                    </div>

                    <div className="
                        bg-yellow-100
                        text-yellow-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                    ">
                        PAY NOW
                    </div>

                </div>


                {/* Free Shipping */}
                {
                    shipping === 0 && (

                        <div className="
                            mt-5
                            flex
                            items-center
                            gap-2
                            bg-green-50
                            border
                            border-green-100
                            rounded-lg
                            px-4
                            py-3
                        ">

                            <Truck
                                size={18}
                                className="text-green-600"
                            />

                            <p className="
                                text-green-700
                                text-sm
                                font-medium
                            ">
                                🎉 You qualify for FREE shipping.
                            </p>

                        </div>

                    )
                }


                {/* Payment Button */}
                <button
                    onClick={() => navigate("/payment")}
                    className="
                        w-full
                        mt-6
                        bg-yellow-400
                        hover:bg-yellow-500
                        active:scale-[0.98]
                        text-gray-900
                        py-4
                        rounded-xl
                        font-bold
                        text-base
                        transition-all
                        duration-200
                        flex
                        items-center
                        justify-center
                        gap-3
                        shadow-md
                        hover:shadow-lg
                    "
                >

                    <ShoppingBag size={21} />

                    Proceed To Payment

                </button>


                <p className="
                    text-center
                    text-xs
                    text-gray-400
                    mt-4
                ">
                    Secure checkout • Fast & safe payment
                </p>

            </div>

        </div>
    );
};

export default PriceSummary;