
import {
  MapPin,
  ChevronRight,
  Phone,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

const AddressPreview = ({ address }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">

        <div className="flex items-center gap-3">

          <div className="bg-yellow-100 p-3 rounded-xl">
            <MapPin
              className="text-yellow-600"
              size={22}
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Delivery Address
            </h2>

            <p className="text-sm text-gray-500">
              Where should we deliver your order?
            </p>
          </div>

        </div>

        <Link
          to="/checkout/address"
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Change
          <ChevronRight size={17} />
        </Link>

      </div>

      {/* Content */}
      <div className="p-6">

        {!address ? (

          /* No Address */
          <div className="flex flex-col items-center justify-center text-center py-6">

            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <MapPin
                size={28}
                className="text-gray-400"
              />
            </div>

            <h3 className="font-semibold text-gray-800">
              No saved address
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Add a delivery address to continue.
            </p>

            <Link
              to="/addresses"
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              <MapPin size={17} />
              Add Address
            </Link>

          </div>

        ) : (

          /* Address */
          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">
              <CheckCircle
                size={21}
                className="text-green-600"
              />
            </div>

            <div className="flex-1">

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">

                <h3 className="text-lg font-bold text-gray-800">
                  {address.fullName}
                </h3>

                {address.isDefault && (
                  <span className="w-fit bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Default
                  </span>
                )}

              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Phone size={15} />
                <span>{address.phone}</span>
              </div>

              <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-4">

                <div className="flex gap-3">

                  <MapPin
                    size={18}
                    className="text-gray-500 mt-1 shrink-0"
                  />

                  <div className="text-sm text-gray-700 leading-6">

                    <p className="font-medium">
                      {address.address}
                    </p>

                    <p>
                      {address.city}, {address.state}
                    </p>

                    <p className="font-semibold">
                      {address.pincode}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default AddressPreview;

