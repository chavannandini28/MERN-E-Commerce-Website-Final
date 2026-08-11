
import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
} from "react-router-dom";

import {
  Search,
  Eye,
  Trash2,
  PackageCheck,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import {
  getAdminOrders,
  updateOrderStatus,
  deleteOrder,
} from "../redux/orderSlice";



const OrderManagement = () => {

  const dispatch = useDispatch();

  const {
    orders,
    loading,
  } = useSelector(
    (state) => state.orders
  );

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");


  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);


  const handleStatusChange = async (id, newStatus) => {

    try {

      await dispatch(
        updateOrderStatus({
          id,
          status: newStatus,
        })
      ).unwrap();

      toast.success("Order status updated");

    } catch (error) {

      toast.error(
        error || "Update failed"
      );

    }

  };


  const handleDelete = async (id) => {

    const confirm = window.confirm(
      "Delete this order?"
    );

    if (!confirm) return;

    try {

      await dispatch(
        deleteOrder(id)
      ).unwrap();

      toast.success("Order deleted");

    } catch (error) {

      toast.error(
        error || "Delete failed"
      );

    }

  };


  const filteredOrders =
    orders.filter((order) => {

      const matchSearch =
        order._id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
        ||
        order.user?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchStatus =
        status === "All"
        ||
        order.orderStatus === status;

      return (
        matchSearch &&
        matchStatus
      );

    });


  const getStatusStyle = (orderStatus) => {

    switch (orderStatus) {

      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Out for Delivery":
        return "bg-orange-50 text-orange-700 border-orange-200";

      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

    }

  };


  const getStatusIcon = (orderStatus) => {

    switch (orderStatus) {

      case "Delivered":
        return <CheckCircle2 size={14} />;

      case "Cancelled":
        return <XCircle size={14} />;

      case "Processing":
        return <Clock3 size={14} />;

      default:
        return <PackageCheck size={14} />;

    }

  };


  return (

    <div className="
      min-h-screen
      bg-gray-50
      px-4
      sm:px-6
      lg:px-8
      py-8
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">


        {/* PAGE HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        ">

          <div>

            <div className="
              flex
              items-center
              gap-3
              mb-2
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-200
              ">

                <PackageCheck size={23} />

              </div>

              <h1 className="
                text-3xl
                font-bold
                text-gray-900
              ">
                Order Management
              </h1>

            </div>

            <p className="
              text-gray-500
              ml-14
            ">
              Manage customer orders and update order status.
            </p>

          </div>


          {/* ORDER COUNT */}

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
              font-semibold
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



        {/* FILTER CARD */}

        <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-5
          mb-6
          shadow-sm
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            gap-4
          ">


            {/* SEARCH */}

            <div className="
              flex
              items-center
              border
              border-gray-200
              rounded-xl
              px-4
              bg-gray-50
              flex-1
              focus-within:bg-white
              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100
              transition
            ">

              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search order ID or customer..."
                className="
                  p-3
                  outline-none
                  w-full
                  bg-transparent
                  text-gray-700
                "
              />

            </div>


            {/* STATUS */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                bg-gray-50
                text-gray-700
                outline-none
                focus:bg-white
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                cursor-pointer
                min-w-[190px]
              "
            >

              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>

            </select>

          </div>

        </div>



        {/* TABLE CARD */}

        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          shadow-sm
          overflow-hidden
        ">


          {/* TABLE HEADER */}

          <div className="
            px-6
            py-5
            border-b
            border-gray-100
            flex
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-lg
                font-bold
                text-gray-900
              ">
                All Orders
              </h2>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">
                Showing {filteredOrders.length} order
                {filteredOrders.length !== 1 ? "s" : ""}
              </p>

            </div>

            <ShoppingBag
              size={22}
              className="text-gray-400"
            />

          </div>



          {/* LOADING */}

          {loading && (

            <div className="
              py-20
              text-center
            ">

              <div className="
                w-10
                h-10
                border-4
                border-blue-100
                border-t-blue-600
                rounded-full
                animate-spin
                mx-auto
                mb-4
              " />

              <p className="
                text-gray-500
                font-medium
              ">
                Loading orders...
              </p>

            </div>

          )}



          {/* EMPTY */}

          {!loading &&
            filteredOrders.length === 0 && (

              <div className="
                py-20
                text-center
              ">

                <div className="
                  w-16
                  h-16
                  bg-gray-100
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                ">

                  <ShoppingBag
                    size={28}
                    className="text-gray-400"
                  />

                </div>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-800
                ">
                  No Orders Found
                </h3>

                <p className="
                  text-gray-500
                  text-sm
                  mt-1
                ">
                  Try changing your search or status filter.
                </p>

              </div>

            )}



          {/* TABLE */}

          {!loading &&
            filteredOrders.length > 0 && (

              <div className="overflow-x-auto">

                <table className="
                  w-full
                  min-w-[900px]
                ">

                  <thead className="
                    bg-gray-50
                    border-b
                    border-gray-200
                  ">

                    <tr>

                      <th className="
                        p-4
                        text-left
                        text-xs
                        font-bold
                        text-gray-500
                        uppercase
                        tracking-wider
                      ">
                        Order
                      </th>

                      <th className="
                        p-4
                        text-left
                        text-xs
                        font-bold
                        text-gray-500
                        uppercase
                        tracking-wider
                      ">
                        Customer
                      </th>

                      <th className="
                        p-4
                        text-left
                        text-xs
                        font-bold
                        text-gray-500
                        uppercase
                        tracking-wider
                      ">
                        Amount
                      </th>

                      <th className="
                        p-4
                        text-left
                        text-xs
                        font-bold
                        text-gray-500
                        uppercase
                        tracking-wider
                      ">
                        Payment
                      </th>

                      <th className="
                        p-4
                        text-left
                        text-xs
                        font-bold
                        text-gray-500
                        uppercase
                        tracking-wider
                      ">
                        Status
                      </th>

                      <th className="
                        p-4
                        text-left
                        text-xs
                        font-bold
                        text-gray-500
                        uppercase
                        tracking-wider
                      ">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredOrders.map(
                      (order) => (

                        <tr
                          key={order._id}
                          className="
                            border-b
                            border-gray-100
                            hover:bg-blue-50/30
                            transition
                          "
                        >


                          {/* ORDER */}

                          <td className="p-4">

                            <div className="
                              flex
                              items-center
                              gap-3
                            ">

                              <div className="
                                w-10
                                h-10
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                                flex
                                items-center
                                justify-center
                              ">

                                <PackageCheck
                                  size={19}
                                />

                              </div>

                              <div>

                                <p className="
                                  font-semibold
                                  text-gray-900
                                ">
                                  #{order._id.slice(-8)}
                                </p>

                                <p className="
                                  text-xs
                                  text-gray-400
                                  mt-1
                                ">
                                  Order ID
                                </p>

                              </div>

                            </div>

                          </td>



                          {/* CUSTOMER */}

                          <td className="p-4">

                            <p className="
                              font-semibold
                              text-gray-800
                            ">
                              {order.user?.name ||
                                "Customer"}
                            </p>

                            <p className="
                              text-sm
                              text-gray-500
                              mt-1
                            ">
                              {order.user?.email || ""}
                            </p>

                          </td>



                          {/* AMOUNT */}

                          <td className="p-4">

                            <span className="
                              font-bold
                              text-gray-900
                            ">
                              ₹{order.totalPrice || 0}
                            </span>

                          </td>



                          {/* PAYMENT */}

                          <td className="p-4">

                            <span className="
                              inline-flex
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-semibold
                              bg-gray-100
                              text-gray-700
                            ">
                              {order.paymentStatus ||
                                "Pending"}
                            </span>

                          </td>



                          {/* STATUS */}

                          <td className="p-4">

                            <div className="
                              flex
                              items-center
                              gap-2
                            ">

                              <span className={`
                                inline-flex
                                items-center
                                gap-1.5
                                px-3
                                py-1.5
                                rounded-full
                                border
                                text-xs
                                font-semibold
                                ${getStatusStyle(
                                  order.orderStatus
                                )}
                              `}>

                                {getStatusIcon(
                                  order.orderStatus
                                )}

                                {order.orderStatus ||
                                  "Pending"}

                              </span>

                              <select
                                value={
                                  order.orderStatus
                                }
                                onChange={(e) =>
                                  handleStatusChange(
                                    order._id,
                                    e.target.value
                                  )
                                }
                                className="
                                  border
                                  border-gray-200
                                  rounded-lg
                                  px-2
                                  py-1.5
                                  text-xs
                                  bg-white
                                  outline-none
                                  focus:border-blue-500
                                  cursor-pointer
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
                                  Out for Delivery
                                </option>

                                <option>
                                  Delivered
                                </option>

                                <option>
                                  Cancelled
                                </option>

                              </select>

                            </div>

                          </td>



                          {/* ACTION */}

                          <td className="p-4">

                            <div className="
                              flex
                              gap-2
                            ">


                              <Link
                                to={`/order/${order._id}`}
                                title="View Order"
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-blue-50
                                  text-blue-600
                                  flex
                                  items-center
                                  justify-center
                                  hover:bg-blue-600
                                  hover:text-white
                                  transition
                                "
                              >

                                <Eye size={17} />

                              </Link>


                              <button
                                onClick={() =>
                                  handleDelete(
                                    order._id
                                  )
                                }
                                title="Delete Order"
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-red-50
                                  text-red-600
                                  flex
                                  items-center
                                  justify-center
                                  hover:bg-red-600
                                  hover:text-white
                                  transition
                                "
                              >

                                <Trash2 size={17} />

                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

        </div>

      </div>

    </div>

  );

};


export default OrderManagement;

