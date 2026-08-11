
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Plus, ArrowRight } from "lucide-react";

import { getAddresses } from "../redux/userSlice";
import AddressCard from "../components/checkout/AddressCard";
import { selectAddress } from "../redux/checkoutSlice";

const AddressSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    addresses = [],
    loading,
  } = useSelector((state) => state.users);

  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress =
        addresses.find((item) => item.isDefault) ||
        addresses[0];

      setSelectedId(defaultAddress._id);
    }
  }, [addresses]);

  const continueCheckout = () => {
    if (!selectedId) return;

    const address = addresses.find(
      (item) => item._id === selectedId
    );

    dispatch(selectAddress(address));

    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

          <h2 className="text-lg font-semibold text-gray-700">
            Loading addresses...
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 mb-8">

          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <MapPin size={18} />
              <span className="text-sm font-semibold">
                Delivery Address
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Select Delivery Address
            </h1>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Choose the address for this order.
            </p>
          </div>

          <Link
            to="/saved-addresses"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus size={18} />
            Add Address
          </Link>

        </div>

        {/* Empty State */}
        {addresses.length === 0 ? (

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 md:p-14 text-center">

            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-blue-50">
              <MapPin
                className="text-blue-400"
                size={38}
              />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-6">
              No Saved Addresses
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first delivery address to continue.
            </p>

            <Link
              to="/saved-addresses"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-200"
            >
              <Plus size={18} />
              Add Address
            </Link>

          </div>

        ) : (

          <>
            {/* Address Cards */}
            <div className="grid lg:grid-cols-2 gap-5 md:gap-6">

              {addresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  selected={selectedId === address._id}
                  onSelect={() => setSelectedId(address._id)}
                />
              ))}

            </div>

            {/* Continue Button */}
            <div className="mt-8 md:mt-10 flex justify-end">

              <button
                onClick={continueCheckout}
                disabled={!selectedId}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold px-8 md:px-10 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                Continue to Checkout
                <ArrowRight size={18} />
              </button>

            </div>
          </>

        )}

      </div>
    </div>
  );
};

export default AddressSelector;

