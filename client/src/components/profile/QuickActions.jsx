
import { Link } from "react-router-dom";

import {
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Lock,
  Store,
  ArrowRight,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Continue Shopping",
      description: "Browse latest products",
      icon: Store,
      to: "/shop",
      bg: "from-blue-500 to-indigo-600",
      iconBg: "bg-blue-400/30",
    },
    {
      title: "My Orders",
      description: "Track your purchases",
      icon: ShoppingBag,
      to: "/my-orders",
      bg: "from-emerald-500 to-green-600",
      iconBg: "bg-green-400/30",
    },
    {
      title: "Wishlist",
      description: "Your favourite products",
      icon: Heart,
      to: "/wishlist",
      bg: "from-pink-500 to-rose-600",
      iconBg: "bg-pink-400/30",
    },
    {
      title: "Saved Addresses",
      description: "Manage delivery address",
      icon: MapPin,
      to: "/saved-addresses",
      bg: "from-amber-500 to-orange-600",
      iconBg: "bg-orange-400/30",
    },
    {
      title: "Edit Profile",
      description: "Update account details",
      icon: User,
      to: "/profile/edit",
      bg: "from-purple-500 to-violet-600",
      iconBg: "bg-purple-400/30",
    },
    {
      title: "Change Password",
      description: "Keep your account secure",
      icon: Lock,
      to: "/change-password",
      bg: "from-slate-600 to-gray-900",
      iconBg: "bg-gray-400/30",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Account
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
            Quick Actions
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Quickly access your account features
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <Link
              key={index}
              to={action.to}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                ${action.bg}
                p-6
                text-white
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              `}
            >

              {/* Decorative Circle */}
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  w-32
                  h-32
                  rounded-full
                  bg-white/10
                  group-hover:scale-125
                  transition-transform
                  duration-500
                "
              />

              {/* Icon */}
              <div
                className={`
                  relative
                  w-14
                  h-14
                  rounded-2xl
                  ${action.iconBg}
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  group-hover:scale-110
                  transition-transform
                  duration-300
                `}
              >
                <Icon size={28} />
              </div>

              {/* Content */}
              <div className="relative mt-6">

                <h3 className="text-lg md:text-xl font-bold">
                  {action.title}
                </h3>

                <p className="text-sm text-white/80 mt-2">
                  {action.description}
                </p>

              </div>

              {/* Arrow */}
              <div
                className="
                  absolute
                  right-5
                  bottom-5
                  w-9
                  h-9
                  rounded-full
                  bg-white/15
                  flex
                  items-center
                  justify-center
                  group-hover:bg-white/25
                  group-hover:translate-x-1
                  transition-all
                  duration-300
                "
              >
                <ArrowRight size={18} />
              </div>

            </Link>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;

