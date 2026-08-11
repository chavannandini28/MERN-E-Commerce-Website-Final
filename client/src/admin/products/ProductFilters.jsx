
function ProductFilters({
    search,
    setSearch,
    stock,
    setStock
}) {

    return (
        <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            p-4
            mb-6
        ">

            <div className="
                flex
                flex-col
                md:flex-row
                gap-4
                items-stretch
                md:items-center
            ">

                {/* Search */}
                <div className="relative flex-1">

                    <span className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        text-lg
                    ">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            border
                            border-gray-200
                            bg-gray-50
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
                            placeholder:text-gray-400
                        "
                    />

                </div>


                {/* Stock Filter */}
                <div className="relative md:w-52">

                    <select
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="
                            w-full
                            appearance-none
                            border
                            border-gray-200
                            bg-gray-50
                            rounded-xl
                            px-4
                            py-3
                            pr-10
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

                        <option value="">
                            All Stock
                        </option>

                        <option value="available">
                            Available
                        </option>

                        <option value="out">
                            Out Of Stock
                        </option>

                    </select>

                    <span className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-gray-400
                    ">
                        ▼
                    </span>

                </div>

            </div>

        </div>
    );
}

export default ProductFilters;

