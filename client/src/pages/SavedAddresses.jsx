import { useEffect, useState } from "react";

import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  Home,
  Phone,
  Navigation,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../redux/userSlice";

const Address = () => {
  const dispatch = useDispatch();

  const {
    addresses = [],
    loading,
  } = useSelector((state) => state.users);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ==========================================
  // EDIT MODE
  // ==========================================

  const [editingId, setEditingId] = useState(null);

  // ==========================================
  // LOAD ADDRESSES
  // ==========================================

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setEditingId(null);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(
        updateAddress({
          id: editingId,
          data: form,
        })
      );
    } else {
      dispatch(addAddress(form));
    }

    resetForm();
  };

  // ==========================================
  // EDIT ADDRESS
  // ==========================================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      fullName: item.fullName,
      phone: item.phone,
      address: item.address,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE ADDRESS
  // ==========================================

  const handleDelete = (id) => {
    if (!window.confirm("Delete this address?")) return;

    dispatch(deleteAddress(id));
  };

  // ==========================================
  // SET DEFAULT ADDRESS
  // ==========================================

  const handleDefault = (id) => {
    dispatch(setDefaultAddress(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-2">

            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">

              <MapPin
                size={25}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Saved Addresses
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your delivery addresses
              </p>

            </div>

          </div>

        </div>

        {/* ==========================================
            MAIN GRID
        ========================================== */}

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ==========================================
              ADDRESS FORM
          ========================================== */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden sticky top-6">

              {/* Form Header */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">

                    {editingId ? (
                      <Pencil size={21} />
                    ) : (
                      <Plus size={23} />
                    )}

                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {editingId
                        ? "Edit Address"
                        : "Add New Address"}
                    </h2>

                    <p className="text-blue-100 text-sm mt-1">
                      {editingId
                        ? "Update your delivery details"
                        : "Add a new delivery location"}
                    </p>

                  </div>

                </div>

              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5"
              >

                {/* Full Name */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

                {/* Phone */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

                {/* Address */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>

                  <div className="relative">

                    <Home
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <textarea
                      rows={3}
                      name="address"
                      placeholder="House no., street, area..."
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition resize-none"
                    />

                  </div>

                </div>

                {/* City + State */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

                {/* Pincode */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode
                  </label>

                  <div className="relative">

                    <Navigation
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

                {/* Buttons */}

                <div className="pt-2 flex gap-3">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-blue-200 transition-all duration-200"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        {editingId ? (
                          <Pencil size={19} />
                        ) : (
                          <Plus size={20} />
                        )}

                        {editingId
                          ? "Update Address"
                          : "Add Address"}
                      </>
                    )}

                  </button>

                  {editingId && (

                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

          </div>

          {/* ==========================================
              ADDRESS LIST
          ========================================== */}

          <div className="lg:col-span-3">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Your Addresses
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {addresses.length}{" "}
                  {addresses.length === 1
                    ? "address"
                    : "addresses"}{" "}
                  saved
                </p>

              </div>

            </div>

            {/* Loading */}

            {loading ? (

              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-16 text-center">

                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto">

                  <Loader2
                    size={30}
                    className="text-blue-600 animate-spin"
                  />

                </div>

                <p className="mt-5 text-gray-500 font-medium">
                  Loading your addresses...
                </p>

              </div>

            ) : addresses.length === 0 ? (

              /* Empty State */

              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">

                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">

                  <MapPin
                    size={38}
                    className="text-blue-400"
                  />

                </div>

                <h2 className="text-2xl font-bold text-gray-800 mt-6">
                  No Saved Addresses
                </h2>

                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                  You don't have any saved delivery
                  addresses yet. Add one using the form.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-5">

                {addresses.map((item) => (

                  <div
                    key={item._id}
                    className={`
                      relative
                      bg-white
                      rounded-3xl
                      p-6
                      border
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      ${
                        item.isDefault
                          ? "border-blue-300 ring-2 ring-blue-100"
                          : "border-gray-100"
                      }
                    `}
                  >

                    {/* Default Badge */}

                    {item.isDefault && (

                      <div className="absolute top-5 right-5">

                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">

                          <CheckCircle2 size={14} />

                          Default
                        </span>

                      </div>

                    )}

                    {/* Address Header */}

                    <div className="flex items-start gap-4 pr-20">

                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">

                        <Home
                          size={22}
                          className="text-blue-600"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {item.fullName}
                        </h3>

                        <div className="flex items-center gap-1.5 text-gray-500 mt-1">

                          <Phone size={14} />

                          <p className="text-sm">
                            {item.phone}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Address Details */}

                    <div className="mt-5 bg-gray-50 rounded-2xl p-4">

                      <div className="flex items-start gap-3">

                        <MapPin
                          size={18}
                          className="text-blue-500 mt-0.5 shrink-0"
                        />

                        <p className="text-gray-700 text-sm leading-6">

                          {item.address}

                          <br />

                          {item.city}, {item.state}

                          <br />

                          <span className="font-semibold text-gray-800">
                            {item.pincode}
                          </span>

                        </p>

                      </div>

                    </div>

                    {/* Actions */}

                    <div className="grid grid-cols-2 gap-2 mt-5">

                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-3 py-2.5 rounded-xl hover:bg-blue-100 font-semibold text-sm transition"
                      >

                        <Pencil size={16} />

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-2.5 rounded-xl hover:bg-red-100 font-semibold text-sm transition"
                      >

                        <Trash2 size={16} />

                        Delete

                      </button>

                    </div>

                    {!item.isDefault && (

                      <button
                        onClick={() =>
                          handleDefault(item._id)
                        }
                        className="w-full mt-2 flex items-center justify-center gap-2 border border-yellow-200 bg-yellow-50 text-yellow-700 px-3 py-2.5 rounded-xl hover:bg-yellow-100 font-semibold text-sm transition"
                      >

                        <Star
                          size={16}
                        />

                        Set as Default

                      </button>

                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Address;