
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
} from "../redux/adminSlice";

import { Link } from "react-router-dom";
import { Package, Plus, Pencil, Trash2 } from "lucide-react";

function ProductList() {
  const dispatch = useDispatch();

  const { products = [] } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-3 rounded-xl">
              <Package size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Manage Products
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your store products
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          <Plus size={20} />
          Add Product
        </Link>

      </div>

      {/* Product Count */}
      <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
        <p className="text-gray-500 text-sm">
          Total Products
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-1">
          {products.length}
        </p>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Stock
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.length === 0 ? (

                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center"
                  >
                    <Package
                      size={45}
                      className="mx-auto text-gray-300 mb-3"
                    />

                    <p className="text-gray-500 font-medium">
                      No products found
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Add your first product to get started.
                    </p>
                  </td>
                </tr>

              ) : (

                products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >

                    {/* Product */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">

                          {product.thumbnail?.url ? (
                            <img
                              src={product.thumbnail.url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package
                              size={24}
                              className="text-gray-400"
                            />
                          )}

                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {product.name}
                          </p>

                          <p className="text-sm text-gray-400">
                            ID: {product._id?.slice(-8)}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">

                      <span className="font-semibold text-gray-800">
                        ₹{product.price}
                      </span>

                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} Available`
                          : "Out of Stock"}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            dispatch(
                              deleteProduct(product._id)
                            )
                          }
                          className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ProductList;

