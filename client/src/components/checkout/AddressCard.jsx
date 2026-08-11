
import {
  CheckCircle,
  Home,
  Pencil,
  Trash2,
  Phone,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

const AddressCard = ({
  address,
  selected,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl border-2 bg-white p-6 transition-all duration-300 ${
        selected
          ? "border-yellow-500 shadow-lg ring-2 ring-yellow-100"
          : "border-gray-200 shadow-sm hover:border-yellow-300 hover:shadow-md"
      }`}
    >
      {/* Selected Badge */}
      {selected && (
        <div className="absolute right-4 top-4">
          <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
            <CheckCircle size={14} />
            Selected
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 pr-20">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            selected
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Home size={21} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {address.fullName}
          </h2>

          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <Phone size={14} />
            <span>{address.phone}</span>
          </div>
        </div>
      </div>

      {/* Default Badge */}
      {address.isDefault && (
        <div className="mt-5">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Default Address
          </span>
        </div>
      )}

      {/* Address */}
      <div className="mt-5 rounded-xl bg-gray-50 p-4">
        <div className="flex gap-3">
          <MapPin
            size={20}
            className="mt-1 shrink-0 text-gray-500"
          />

          <div className="text-sm leading-6 text-gray-700">
            <p className="font-medium">
              {address.address}
            </p>

            <p>
              {address.city}, {address.state}
            </p>

            <p className="font-medium">
              {address.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Selected Message */}
      {selected && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-800">
          <CheckCircle size={18} />
          This address is selected for your order
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/saved-addresses"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          <Pencil size={17} />
          Edit
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address._id);
            }}
            className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={17} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
