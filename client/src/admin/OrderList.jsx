
import {
    useEffect,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    getAdminOrders,
    updateOrderStatus,
    deleteOrder
} from "../redux/orderSlice";


function OrderList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // ==========================
    // LOCAL STATE
    // ==========================

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");


    // ==========================
    // REDUX STATE
    // ==========================

    const {
        orders = [],
        loading
    } = useSelector(
        state => state.orders
    );


    // ==========================
    // FETCH ORDERS
    // ==========================

    useEffect(() => {

        dispatch(
            getAdminOrders()
        );

    }, [dispatch]);


    // ==========================
    // STATUS UPDATE
    // ==========================

    const handleStatusChange = (
        id,
        status
    ) => {

        dispatch(
            updateOrderStatus({
                id,
                status
            })
        );

    };


    // ==========================
    // DELETE ORDER
    // ==========================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this order?"
            );


        if (confirmDelete) {

            dispatch(
                deleteOrder(id)
            );

        }

    };


    // ==========================
    // FILTER ORDERS
    // ==========================

    const filteredOrders =

        orders.filter(order => {

            const searchValue =
                search.toLowerCase();


            const searchMatch =

                order._id
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                order.user?.name
                    ?.toLowerCase()
                    .includes(searchValue);


            const statusMatch =

                statusFilter === "All"

                    ?

                    true

                    :

                    order.orderStatus === statusFilter;


            return searchMatch && statusMatch;

        });


    return (

        <div className="
            min-h-full
            bg-gray-50
            p-4
            md:p-6
        ">

            {/* ==========================
                PAGE HEADER
            ========================== */}

            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
                mb-6
            ">

                <div>

                    <p className="
                        text-sm
                        font-semibold
                        text-blue-600
                        uppercase
                        tracking-wide
                        mb-1
                    ">
                        Admin Panel
                    </p>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                    ">
                        Order Management
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage customer orders and payment status
                    </p>

                </div>


                <div className="
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    px-5
                    py-3
                    shadow-sm
                ">

                    <p className="
                        text-xs
                        text-gray-500
                        uppercase
                        tracking-wide
                    ">
                        Total Orders
                    </p>

                    <p className="
                        text-2xl
                        font-bold
                        text-gray-900
                    ">
                        {orders.length}
                    </p>

                </div>

            </div>


            {/* ==========================
                FILTER
            ========================== */}

            <div className="
                bg-white
                border
                border-gray-200
                shadow-sm
                rounded-2xl
                p-4
                md:p-5
                mb-6
            ">

                <div className="
                    flex
                    flex-col
                    lg:flex-row
                    gap-4
                ">

                    {/* Search */}

                    <div className="
                        relative
                        flex-1
                    ">

                        <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        ">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search Order ID or Customer"
                            value={search}
                            onChange={
                                e => setSearch(e.target.value)
                            }
                            className="
                                w-full
                                bg-gray-50
                                border
                                border-gray-200
                                rounded-xl
                                pl-11
                                pr-4
                                py-3
                                text-gray-700
                                outline-none
                                transition
                                focus:bg-white
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-100
                            "
                        />

                    </div>


                    {/* Status */}

                    <div className="
                        lg:w-56
                    ">

                        <select
                            value={statusFilter}
                            onChange={
                                e =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                            }
                            className="
                                w-full
                                bg-gray-50
                                border
                                border-gray-200
                                rounded-xl
                                px-4
                                py-3
                                text-gray-700
                                outline-none
                                cursor-pointer
                                transition
                                focus:bg-white
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-100
                            "
                        >

                            <option value="All">
                                All Orders
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Processing">
                                Processing
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ==========================
                TABLE
            ========================== */}

            <div className="
                bg-white
                border
                border-gray-200
                shadow-sm
                rounded-2xl
                overflow-hidden
            ">

                {loading ? (

                    <div className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        py-16
                        text-gray-500
                    ">

                        <div className="
                            w-10
                            h-10
                            border-4
                            border-gray-200
                            border-t-blue-600
                            rounded-full
                            animate-spin
                            mb-4
                        " />

                        <p className="font-medium">
                            Loading Orders...
                        </p>

                    </div>

                ) : filteredOrders.length === 0 ? (

                    <div className="
                        py-16
                        px-6
                        text-center
                    ">

                        <div className="
                            w-16
                            h-16
                            mx-auto
                            mb-4
                            rounded-full
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            🛒
                        </div>

                        <h3 className="
                            text-lg
                            font-bold
                            text-gray-800
                        ">
                            No Orders Found
                        </h3>

                        <p className="
                            text-gray-500
                            mt-1
                        ">
                            Try changing your search or status filter.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="
                                    bg-gray-50
                                    border-b
                                    border-gray-200
                                ">

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Order ID
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Customer
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Date
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Amount
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Payment
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Status
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-center
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    filteredOrders.map(
                                        order => (

                                            <tr
                                                key={order._id}
                                                className="
                                                    border-b
                                                    border-gray-100
                                                    hover:bg-gray-50
                                                    transition
                                                "
                                            >

                                                {/* Order ID */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                ">

                                                    <span className="
                                                        inline-flex
                                                        items-center
                                                        px-3
                                                        py-1
                                                        rounded-lg
                                                        bg-gray-100
                                                        text-gray-700
                                                        font-mono
                                                        text-sm
                                                        font-semibold
                                                    ">
                                                        #{order._id.slice(-8)}
                                                    </span>

                                                </td>


                                                {/* Customer */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                ">

                                                    <p className="
                                                        font-semibold
                                                        text-gray-800
                                                    ">
                                                        {
                                                            order.user?.name ||
                                                            "Customer"
                                                        }
                                                    </p>

                                                    <p className="
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">
                                                        {
                                                            order.user?.email ||
                                                            ""
                                                        }
                                                    </p>

                                                </td>


                                                {/* Date */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    text-gray-600
                                                ">

                                                    {
                                                        new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString()
                                                    }

                                                </td>


                                                {/* Amount */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                    font-bold
                                                    text-gray-800
                                                ">

                                                    ₹ {order.totalPrice || 0}

                                                </td>


                                                {/* Payment */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                ">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            items-center
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-xs
                                                            font-semibold
                                                            ${
                                                                order.paymentStatus === "Paid"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                            }
                                                        `}
                                                    >

                                                        <span className="
                                                            w-2
                                                            h-2
                                                            rounded-full
                                                            bg-current
                                                            mr-2
                                                        " />

                                                        {
                                                            order.paymentStatus ||
                                                            "Pending"
                                                        }

                                                    </span>

                                                </td>


                                                {/* Status */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                ">

                                                    <select
                                                        value={
                                                            order.orderStatus ||
                                                            "Pending"
                                                        }
                                                        onChange={
                                                            e =>
                                                                handleStatusChange(
                                                                    order._id,
                                                                    e.target.value
                                                                )
                                                        }
                                                        className="
                                                            border
                                                            border-gray-200
                                                            bg-gray-50
                                                            rounded-lg
                                                            px-3
                                                            py-2
                                                            text-sm
                                                            font-medium
                                                            text-gray-700
                                                            outline-none
                                                            cursor-pointer
                                                            focus:border-blue-500
                                                            focus:ring-2
                                                            focus:ring-blue-100
                                                        "
                                                    >

                                                        <option>
                                                            Pending
                                                        </option>

                                                        <option>
                                                            Processing
                                                        </option>

                                                        <option>
                                                            Shipped
                                                        </option>

                                                        <option>
                                                            Delivered
                                                        </option>

                                                        <option>
                                                            Cancelled
                                                        </option>

                                                    </select>

                                                </td>


                                                {/* Actions */}

                                                <td className="
                                                    px-5
                                                    py-4
                                                ">

                                                    <div className="
                                                        flex
                                                        justify-center
                                                        gap-2
                                                    ">

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/orders/${order._id}`
                                                                )
                                                            }
                                                            className="
                                                                bg-blue-50
                                                                text-blue-600
                                                                hover:bg-blue-600
                                                                hover:text-white
                                                                border
                                                                border-blue-100
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                                text-sm
                                                                font-semibold
                                                                transition
                                                            "
                                                        >
                                                            View
                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    order._id
                                                                )
                                                            }
                                                            className="
                                                                bg-red-50
                                                                text-red-600
                                                                hover:bg-red-600
                                                                hover:text-white
                                                                border
                                                                border-red-100
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                                text-sm
                                                                font-semibold
                                                                transition
                                                            "
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


export default OrderList;

