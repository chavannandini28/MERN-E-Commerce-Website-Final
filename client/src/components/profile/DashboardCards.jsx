
import {
  Package,
  Clock3,
  Truck,
  CheckCircle,
  Heart,
  IndianRupee,
} from "lucide-react";

function DashboardCards({
  orders = [],
  wishlist = [],
}) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const totalSpent = orders
    .filter(
      (order) => order.orderStatus !== "Cancelled"
    )
    .reduce(
      (total, order) => total + (order.totalPrice || 0),
      0
    );

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: Package,
      bg: "bg-blue-50",
      color: "text-blue-600",
      accent: "from-blue-500 to-blue-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
      bg: "bg-amber-50",
      color: "text-amber-600",
      accent: "from-amber-400 to-orange-500",
    },
    {
      title: "Shipped",
      value: shippedOrders,
      icon: Truck,
      bg: "bg-indigo-50",
      color: "text-indigo-600",
      accent: "from-indigo-500 to-purple-600",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      accent: "from-emerald-400 to-green-600",
    },
    {
      title: "Wishlist",
      value: wishlist.length,
      icon: Heart,
      bg: "bg-pink-50",
      color: "text-pink-600",
      accent: "from-pink-500 to-rose-500",
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent.toLocaleString()}`,
      icon: IndianRupee,
      bg: "bg-purple-50",
      color: "text-purple-600",
      accent: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="
              group
              relative
              overflow-hidden
              bg-white
              border
              border-gray-100
              rounded-2xl
              p-6
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            {/* Top Accent */}
            <div
              className={`
                absolute
                top-0
                left-0
                right-0
                h-1
                bg-gradient-to-r
                ${card.accent}
              `}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h3 className="
                  text-3xl
                  font-extrabold
                  text-gray-900
                  mt-2
                  tracking-tight
                ">
                  {card.value}
                </h3>

                <p className="
                  text-xs
                  text-gray-400
                  mt-2
                ">
                  Updated from your activity
                </p>
              </div>

              {/* Icon */}
              <div
                className={`
                  ${card.bg}
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  group-hover:scale-110
                  group-hover:rotate-3
                  transition-all
                  duration-300
                `}
              >
                <Icon
                  size={27}
                  strokeWidth={2.2}
                  className={card.color}
                />
              </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-5 h-1 w-10 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`
                  h-full
                  w-full
                  bg-gradient-to-r
                  ${card.accent}
                  origin-left
                  scale-x-50
                  group-hover:scale-x-100
                  transition-transform
                  duration-500
                `}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCards;

