
import { useState } from "react";

function ProductForm() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch create/update product
  };

  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <div className="mb-6">

          <h1 className="
            text-3xl
            font-bold
            text-gray-900
          ">
            Add Product
          </h1>

          <p className="
            text-gray-500
            mt-1
          ">
            Add a new product to your store.
          </p>

        </div>


        {/* Form Card */}

        <form
          onSubmit={submitHandler}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            p-6
            md:p-8
            space-y-6
          "
        >

          {/* Product Name */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-2
            ">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Enter product name"
              className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                text-gray-800
                bg-gray-50
                outline-none
                transition
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>


          {/* Price + Stock */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          ">

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Price
              </label>

              <div className="relative">

                <span className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  font-medium
                ">
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="0.00"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    pl-9
                    pr-4
                    py-3
                    bg-gray-50
                    outline-none
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </div>

            </div>


            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Stock
              </label>

              <input
                type="number"
                placeholder="Enter stock quantity"
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-gray-50
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

            </div>

          </div>


          {/* Description */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-2
            ">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Write product description..."
              className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                bg-gray-50
                resize-none
                outline-none
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />

          </div>


          {/* Image URL */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-2
            ">
              Product Image
            </label>

            <input
              type="text"
              placeholder="https://example.com/product-image.jpg"
              className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                bg-gray-50
                outline-none
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />

            <p className="
              text-xs
              text-gray-400
              mt-2
            ">
              Enter the URL of the product image.
            </p>

          </div>


          {/* Divider */}

          <div className="border-t border-gray-100 pt-6">

            <div className="
              flex
              flex-col
              sm:flex-row
              gap-3
              sm:justify-end
            ">

              <button
                type="button"
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  text-gray-700
                  font-semibold
                  hover:bg-gray-50
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  px-7
                  py-3
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-blue-200
                  hover:bg-blue-700
                  hover:-translate-y-0.5
                  transition
                "
              >
                Save Product
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>

  );
}

export default ProductForm;

