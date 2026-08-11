import {
  Check,
  Package,
  Truck,
  Home,
  XCircle,
} from "lucide-react";

const OrderTimeline = ({ status }) => {

  const steps = [
    {
      title: "Order Placed",
      icon: <Package size={21} />,
    },
    {
      title: "Processing",
      icon: <Check size={21} />,
    },
    {
      title: "Shipped",
      icon: <Truck size={21} />,
    },
    {
      title: "Out for Delivery",
      icon: <Truck size={21} />,
    },
    {
      title: "Delivered",
      icon: <Home size={21} />,
    },
  ];

  const statusIndex = {
    Pending: 0,
    Processing: 1,
    Shipped: 2,
    "Out for Delivery": 3,
    Delivered: 4,
    Cancelled: -1,
  };

  const currentStep = statusIndex[status] ?? 0;

  if (status === "Cancelled") {
    return (
      <div className="
        w-full
        rounded-2xl
        border
        border-red-200
        bg-gradient-to-r
        from-red-50
        to-rose-50
        p-6
        shadow-sm
      ">

        <div className="flex items-center gap-4">

          <div className="
            w-12
            h-12
            rounded-full
            bg-red-100
            text-red-600
            flex
            items-center
            justify-center
            flex-shrink-0
          ">
            <XCircle size={26} />
          </div>

          <div>
            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-red-500
            ">
              Order Status
            </p>

            <span className="
              block
              mt-1
              text-lg
              font-bold
              text-red-700
            ">
              Order Cancelled
            </span>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="
      w-full
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
    ">

      {/* Header */}

      <div className="mb-8">

        <p className="
          text-xs
          uppercase
          tracking-widest
          font-semibold
          text-blue-600
        ">
          Order Tracking
        </p>

        <h3 className="
          text-xl
          font-bold
          text-gray-900
          mt-1
        ">
          Delivery Progress
        </h3>

      </div>


      {/* Timeline */}

      <div className="w-full overflow-x-auto pb-3">

        <div className="
          flex
          items-start
          min-w-[720px]
        ">

          {steps.map((step, index) => {

            const completed = index <= currentStep;
            const active = index === currentStep;

            return (

              <div
                key={step.title}
                className="
                  flex-1
                  flex
                  flex-col
                  items-center
                  relative
                "
              >

                {/* Connecting Line */}

                {index !== steps.length - 1 && (

                  <div className="
                    absolute
                    top-6
                    left-1/2
                    w-full
                    h-1
                    rounded-full
                    bg-gray-200
                    overflow-hidden
                  ">

                    <div
                      className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-500
                        ${
                          index < currentStep
                            ? "w-full bg-green-500"
                            : "w-0"
                        }
                      `}
                    />

                  </div>

                )}


                {/* Step Circle */}

                <div
                  className={`
                    relative
                    z-10
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border-4
                    transition-all
                    duration-300

                    ${
                      completed
                        ? "bg-green-500 text-white border-green-100 shadow-lg shadow-green-100"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    }

                    ${
                      active
                        ? "ring-4 ring-green-100 scale-110"
                        : ""
                    }
                  `}
                >

                  {step.icon}

                </div>


                {/* Step Label */}

                <div className="text-center mt-4">

                  <p
                    className={`
                      text-sm
                      font-semibold
                      whitespace-nowrap
                      ${
                        completed
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {step.title}
                  </p>

                  {active && (

                    <span className="
                      inline-block
                      mt-2
                      px-3
                      py-1
                      rounded-full
                      bg-green-50
                      text-green-600
                      text-xs
                      font-medium
                    ">
                      Current Status
                    </span>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default OrderTimeline;