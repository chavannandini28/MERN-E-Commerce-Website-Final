
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
  clearUserState,
} from "../redux/userSlice";

function EditProfile() {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    success,
    error,
  } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [preview, setPreview] = useState("");

  // Load profile from backend
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Fill form when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });

      setPreview(profile.avatar?.url || "");
    }
  }, [profile]);

  // Show success message
  useEffect(() => {
    if (success) {
      alert("Profile updated successfully.");
      dispatch(clearUserState());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Preview only.
    // Avatar upload will be connected later when backend supports it.
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Main Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User size={22} />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Edit Profile
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Update your personal information.
                </p>
              </div>
            </div>

          </div>

          <div className="p-6 sm:p-8">

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl">
                <AlertCircle size={20} />

                <p className="text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Avatar */}
              <div className="flex flex-col items-center pb-2">

                <div className="relative">

                  <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 to-blue-200">

                    <img
                      src={
                        preview ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />

                  </div>

                  <label className="absolute bottom-1 right-1 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">

                    <Camera size={18} />

                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImage}
                    />

                  </label>

                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Click the camera icon to change your photo
                </p>

              </div>

              {/* Name */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={19}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />

                </div>

              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={19}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
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
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={19}
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>

            </form>

            {/* Success */}
            {success && (
              <div className="mt-5 flex items-center gap-3 bg-green-50 border border-green-100 text-green-600 p-4 rounded-xl">
                <CheckCircle2 size={20} />

                <p className="text-sm font-medium">
                  Profile updated successfully.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default EditProfile;

