
import {
    useEffect,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getAdminProducts,
    deleteProduct
} from "../../redux/adminSlice";

import ProductFilters
    from "./ProductFilters";

import {
    Link
} from "react-router-dom";


function ProductList() {

    const dispatch = useDispatch();

    const {
        products,
        loading
    } = useSelector(
        state => state.admin
    );


    const [search, setSearch] = useState("");

    const [stock, setStock] = useState("");


    useEffect(() => {

        dispatch(
            getAdminProducts()
        );

    }, [dispatch]);


    const filteredProducts =
        products.filter(product => {

            const matchSearch =
                product.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchStock =
                stock === ""
                    ? true
                    : stock === "available"
                        ? product.stock > 0
                        : product.stock === 0;


            return matchSearch && matchStock;

        });


    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                p-6
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
            ">

                <div>

                    <p className="
                        text-sm
                        font-medium
                        text-blue-600
                        mb-1
                    ">
                        Inventory Management
                    </p>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                    ">
                        Products
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage your products and inventory
                    </p>

                </div>


                <Link
                    to="/admin/products/add"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        font-semibold
                        px-5
                        py-3
                        rounded-xl
                        shadow-sm
                        transition
                        duration-200
                    "
                >
                    <span className="text-lg">
                        +
                    </span>

                    Add Product

                </Link>

            </div>


            {/* Filters */}

            <ProductFilters
                search={search}
                setSearch={setSearch}
                stock={stock}
                setStock={setStock}
            />


            {/* Product Count */}

            <div className="
                flex
                items-center
                justify-between
                px-1
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-gray-800
                    ">
                        Product List
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        {filteredProducts.length} product
                        {filteredProducts.length !== 1 ? "s" : ""} found
                    </p>

                </div>

            </div>


            {/* Table */}

            <div className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
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
                            Loading products...
                        </p>

                    </div>

                ) : filteredProducts.length === 0 ? (

                    <div className="
                        text-center
                        py-16
                        px-6
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
                            📦
                        </div>

                        <h3 className="
                            text-lg
                            font-semibold
                            text-gray-800
                        ">
                            No Products Found
                        </h3>

                        <p className="
                            text-gray-500
                            mt-1
                        ">
                            Try changing your search or stock filter.
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
                                        px-6
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Product
                                    </th>

                                    <th className="
                                        px-6
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Name
                                    </th>

                                    <th className="
                                        px-6
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Price
                                    </th>

                                    <th className="
                                        px-6
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    ">
                                        Stock
                                    </th>

                                    <th className="
                                        px-6
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
                                    filteredProducts.map(
                                        product => (

                                            <tr
                                                key={product._id}
                                                className="
                                                    border-b
                                                    border-gray-100
                                                    hover:bg-gray-50
                                                    transition
                                                "
                                            >

                                                {/* Image */}

                                                <td className="px-6 py-4">

                                                    {product.thumbnail?.url ? (

                                                        <img
                                                            src={`http://localhost:5000/${product.thumbnail.url}`}
                                                            alt={product.title}
                                                            className="
                                                                w-16
                                                                h-16
                                                                object-cover
                                                                rounded-xl
                                                                border
                                                                border-gray-200
                                                                shadow-sm
                                                            "
                                                        />

                                                    ) : (

                                                        <div className="
                                                            w-16
                                                            h-16
                                                            bg-gray-100
                                                            rounded-xl
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-xs
                                                            text-gray-400
                                                            border
                                                            border-gray-200
                                                        ">
                                                            No Image
                                                        </div>

                                                    )}

                                                </td>


                                                {/* Name */}

                                                <td className="px-6 py-4">

                                                    <div>

                                                        <p className="
                                                            font-semibold
                                                            text-gray-800
                                                        ">
                                                            {product.title}
                                                        </p>

                                                        <p className="
                                                            text-xs
                                                            text-gray-400
                                                            mt-1
                                                        ">
                                                            ID: {product._id.slice(-8)}
                                                        </p>

                                                    </div>

                                                </td>


                                                {/* Price */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    font-semibold
                                                    text-gray-800
                                                ">

                                                    ₹ {product.price}

                                                </td>


                                                {/* Stock */}

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            items-center
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-sm
                                                            font-semibold
                                                            ${
                                                                product.stock > 0
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
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
                                                            product.stock > 0
                                                                ? `${product.stock} Available`
                                                                : "Out of Stock"
                                                        }

                                                    </span>

                                                </td>


                                                {/* Actions */}

                                                <td className="px-6 py-4">

                                                    <div className="
                                                        flex
                                                        justify-center
                                                        gap-2
                                                    ">

                                                        <Link
                                                            to={`/admin/products/edit/${product._id}`}
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
                                                            Edit
                                                        </Link>


                                                        <button
                                                            onClick={() => {

                                                                dispatch(
                                                                    deleteProduct(
                                                                        product._id
                                                                    )
                                                                );

                                                            }}
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


export default ProductList;

