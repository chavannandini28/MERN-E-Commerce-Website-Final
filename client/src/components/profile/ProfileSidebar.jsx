
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Lock,
  LogOut,
} from "lucide-react";

import { logout } from "../../redux/authSlice";

function ProfileSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-gray-100
      overflow-hidden
    ">

      {/* Profile Header */}
      <div className="
        relative
        bg-gradient-to-br
        from-blue-600
        via-blue-700
        to-indigo-800
        px-6
        pt-8
        pb-7
        text-center
        overflow-hidden
      ">

        {/* Decorative Circles */}
        <div className="
          absolute
          -top-16
          -right-16
          w-40
          h-40
          bg-white/10
          rounded-full
        " />

        <div className="
          absolute
          -bottom-20
          -left-16
          w-44
          h-44
          bg-white/10
          rounded-full
        " />

        {/* Avatar */}
        <div className="relative inline-block">
          <div className="
            absolute
            inset-0
            rounded-full
            bg-white/30
            blur-md
          " />

          <img
            src={
              user?.avatar?.url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User"
              )}&background=2563eb&color=ffffff`
            }
            alt={user?.name}
            className="
              relative
              w-28
              h-28
              rounded-full
              border-4
              border-white
              shadow-xl
              mx-auto
              object-cover
              bg-white
            "
          />

          {/* Online Indicator */}
          <span className="
            absolute
            right-1
            bottom-2
            w-5
            h-5
            bg-green-400
            border-4
            border-white
            rounded-full
          " />
        </div>

        <h2 className="
          text-2xl
          font-extrabold
          text-white
          mt-5
        ">
          {user?.name}
        </h2>

        <p className="
          text-blue-100
          mt-1
          text-sm
          truncate
        ">
          {user?.email}
        </p>

      </div>

      {/* Navigation */}
      <div className="p-5">

        <p className="
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-gray-400
          px-3
          mb-3
        ">
          Account
        </p>

        <div className="space-y-1.5">

          <Link
            to="/profile"
            className="
              group
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-gray-700
              font-medium
              hover:bg-blue-50
              hover:text-blue-600
              transition-all
              duration-200
            "
          >
            <span className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-gray-100
              text-gray-500
              group-hover:bg-blue-100
              group-hover:text-blue-600
              transition
            ">
              <User size={19} />
            </span>

            <span>Dashboard</span>
          </Link>

          <Link
            to="/profile/edit"
            className="
              group
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-gray-700
              font-medium
              hover:bg-blue-50
              hover:text-blue-600
              transition-all
              duration-200
            "
          >
            <span className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-gray-100
              text-gray-500
              group-hover:bg-blue-100
              group-hover:text-blue-600
              transition
            ">
              <User size={19} />
            </span>

            <span>Edit Profile</span>
          </Link>

          <Link
            to="/change-password"
            className="
              group
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-gray-700
              font-medium
              hover:bg-blue-50
              hover:text-blue-600
              transition-all
              duration-200
            "
          >
            <span className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-gray-100
              text-gray-500
              group-hover:bg-blue-100
              group-hover:text-blue-600
              transition
            ">
              <Lock size={19} />
            </span>

            <span>Change Password</span>
          </Link>

          <Link
            to="/my-orders"
            className="
              group
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-gray-700
              font-medium
              hover:bg-blue-50
              hover:text-blue-600
              transition-all
              duration-200
            "
          >
            <span className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-gray-100
              text-gray-500
              group-hover:bg-blue-100
              group-hover:text-blue-600
              transition
            ">
              <ShoppingBag size={19} />
            </span>

            <span>My Orders</span>
          </Link>

          <Link
            to="/wishlist"
            className="
              group
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-gray-700
              font-medium
              hover:bg-blue-50
              hover:text-blue-600
              transition-all
              duration-200
            "
          >
            <span className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-gray-100
              text-gray-500
              group-hover:bg-blue-100
              group-hover:text-blue-600
              transition
            ">
              <Heart size={19} />
            </span>

            <span>Wishlist</span>
          </Link>

          <Link
            to="/saved-addresses"
            className="
              group
              flex
              items-center
              gap-3
              px-4
              py-3.5
              rounded-xl
              text-gray-700
              font-medium
              hover:bg-blue-50
              hover:text-blue-600
              transition-all
              duration-200
            "
          >
            <span className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-gray-100
              text-gray-500
              group-hover:bg-blue-100
              group-hover:text-blue-600
              transition
            ">
              <MapPin size={19} />
            </span>

            <span>Saved Addresses</span>
          </Link>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-5" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            group
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3.5
            rounded-xl
            text-red-600
            font-semibold
            hover:bg-red-50
            transition-all
            duration-200
          "
        >
          <span className="
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-lg
            bg-red-50
            group-hover:bg-red-100
            transition
          ">
            <LogOut size={19} />
          </span>

          <span>Logout</span>
        </button>

      </div>
    </div>
  );
}

export default ProfileSidebar;

