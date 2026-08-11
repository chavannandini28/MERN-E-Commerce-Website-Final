
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LockKeyhole,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { changePassword } from "../redux/userSlice";

function ChangePassword() {
  const dispatch = useDispatch();

  const {
    loading,
    success,
    error,
  } = useSelector(
    (state) => state.users
  );

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      changePassword({
        currentPassword,
        newPassword,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-7">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <LockKeyhole size={27} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Change Password
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Keep your account secure with a strong password.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >

            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck size={18} />

              {loading
                ? "Updating..."
                : "Change Password"}
            </button>

          </form>

          {/* Success */}
          {success && (
            <div className="flex items-center gap-3 mt-5 p-3.5 rounded-xl bg-green-50 border border-green-100 text-green-700">
              <CheckCircle2 size={19} />

              <p className="text-sm font-medium">
                Password changed successfully
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 mt-5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600">
              <AlertCircle size={19} />

              <p className="text-sm font-medium">
                {error}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

