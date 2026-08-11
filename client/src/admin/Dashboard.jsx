```jsx
import { Link } from "react-router-dom";

function Dashboard() {

    return (

        <div className="
            min-h-[calc(100vh-64px)]
            bg-gray-50
            p-6
            md:p-8
        ">

            {/* Header */}

            <div className="mb-8">

                <p className="
                    text-sm
                    font-semibold
                    text-blue-600
                    uppercase
                    tracking-wide
                    mb-2
                ">
                    Admin Panel
                </p>

                <h1 className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    text-gray-900
                ">
                    Admin Dashboard
                </h1>

                <p className="
                    text-gray-500
                    mt-2
                ">
                    Manage your store products and orders from one place.
                </p>

            </div>


            {/* Dashboard Cards */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                max-w-4xl
            ">

                {/* Products */}

                <Link
                    to="/admin/products"
                    className="
                        group
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-200
                    "
                >

                    <div className="
                        flex
                        items-start
                        justify-between
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            📦
                        </div>

                        <span className="
                            text-gray-400
                            group-hover:text-blue-600
                            text-xl
                            transition
                        ">
                            →
                        </span>

                    </div>

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-800
                        mt-5
                    ">
                        Products
                    </h2>

                    <p className="
                        text-gray-500
                        text-sm
                        mt-2
                    ">
                        Add, edit, delete and manage your products.
                    </p>

                    <div className="
                        mt-5
                        text-blue-600
                        font-semibold
                        text-sm
                    ">
                        Manage Products →
                    </div>

                </Link>


                {/* Orders */}

                <Link
                    to="/admin/orders"
                    className="
                        group
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-200
                    "
                >

                    <div className="
                        flex
                        items-start
                        justify-between
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-xl
                            bg-green-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            🛒
                        </div>

                        <span className="
                            text-gray-400
                            group-hover:text-green-600
                            text-xl
                            transition
                        ">
                            →
                        </span>

                    </div>

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-800
                        mt-5
                    ">
                        Orders
                    </h2>

                    <p className="
                        text-gray-500
                        text-sm
                        mt-2
                    ">
                        View and manage customer orders and statuses.
                    </p>

                    <div className="
                        mt-5
                        text-green-600
                        font-semibold
                        text-sm
                    ">
                        Manage Orders →
                    </div>

                </Link>

            </div>

        </div>

    );

}

export default Dashboard;
```
