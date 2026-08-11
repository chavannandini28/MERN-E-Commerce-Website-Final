
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingCart,
  Heart,
  User,
  Package,
  MapPin,
  Lock,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Search,
  Menu,
  X,
} from "lucide-react";

import { logout } from "../redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { items: cartItems = [] } = useSelector(
    (state) => state.cart
  );

  const { items: wishlistItems = [] } = useSelector(
    (state) => state.wishlist
  );

  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <ShoppingCart size={23} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ShopSphere
              </h1>

              <p className="hidden sm:block text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Smart Shopping
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Shop
            </Link>

            {/* Search UI */}
            <Link
              to="/shop"
              className="hidden lg:flex items-center gap-2 w-52 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-400 hover:border-blue-300 hover:bg-blue-50 transition"
            >
              <Search size={18} />
              <span className="text-sm">
                Search products...
              </span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-red-50 transition group"
            >
              <Heart
                size={22}
                className="text-gray-700 group-hover:text-red-500 transition"
              />

              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-blue-50 transition group"
            >
              <ShoppingCart
                size={22}
                className="text-gray-700 group-hover:text-blue-600 transition"
              />

              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div
                className="relative"
                ref={menuRef}
              >
                <button
                  onClick={() =>
                    setOpenMenu(!openMenu)
                  }
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition ${
                    openMenu
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                    <User size={18} />
                  </div>

                  <div className="hidden lg:block text-left">
                    <p className="text-xs text-gray-400">
                      Welcome
                    </p>
                    <p className="font-semibold text-sm max-w-24 truncate">
                      {user.name}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`transition ${
                      openMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

                    {/* Profile Header */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                          <User size={22} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold truncate">
                            {user.name}
                          </p>

                          <p className="text-blue-100 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="p-2">

                      <Link
                        to="/profile"
                        onClick={() =>
                          setOpenMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() =>
                          setOpenMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Package size={18} />
                        My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() =>
                          setOpenMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Heart size={18} />
                        Wishlist
                      </Link>

                      <Link
                        to="/saved-addresses"
                        onClick={() =>
                          setOpenMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <MapPin size={18} />
                        Saved Addresses
                      </Link>

                      <Link
                        to="/change-password"
                        onClick={() =>
                          setOpenMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Lock size={18} />
                        Change Password
                      </Link>

                      <div className="border-t my-2" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>

                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-gray-700 font-semibold hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-2">

            <Link
              to="/wishlist"
              className="relative p-2"
            >
              <Heart size={21} />

              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2"
            >
              <ShoppingCart size={21} />

              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenu ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">

            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="block px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={() => setMobileMenu(false)}
              className="block px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 font-medium"
            >
              Shop
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
                >
                  <User size={18} />
                  My Profile
                </Link>

                <Link
                  to="/my-orders"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
                >
                  <Package size={18} />
                  My Orders
                </Link>

                <button
                  onClick={() => {
                    setMobileMenu(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  className="text-center border border-gray-200 py-3 rounded-xl font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-center bg-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

