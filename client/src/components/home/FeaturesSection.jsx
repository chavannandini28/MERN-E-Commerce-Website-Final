
import {
  FaShippingFast,
  FaUndoAlt,
  FaHeadset,
  FaLock,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={30} />,
    title: "Free Shipping",
    description: "Free delivery on orders above ₹999.",
  },
  {
    icon: <FaLock size={30} />,
    title: "Secure Payment",
    description: "100% secure online payment gateway.",
  },
  {
    icon: <FaUndoAlt size={30} />,
    title: "Easy Returns",
    description: "30-day hassle-free return policy.",
  },
  {
    icon: <FaHeadset size={30} />,
    title: "24/7 Support",
    description: "Our experts are always ready to help.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">

          <span className="
            inline-block
            bg-blue-50
            text-blue-600
            px-4
            py-2
            rounded-full
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-widest
          ">
            Why Shop With Us
          </span>

          <h2 className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-extrabold
            text-gray-900
            mt-5
          ">
            Premium Shopping Experience
          </h2>

          <p className="
            text-gray-500
            mt-4
            max-w-2xl
            mx-auto
            text-sm
            sm:text-base
            md:text-lg
            leading-7
          ">
            We provide everything you need for a safe,
            fast and enjoyable online shopping experience.
          </p>

        </div>


        {/* Feature Cards */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          lg:gap-6
        ">

          {features.map((item, index) => (
            <div
              key={index}
              className="
                group
                relative
                bg-white
                rounded-2xl
                p-7
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                overflow-hidden
              "
            >

              {/* Top Decorative Line */}
              <div className="
                absolute
                top-0
                left-0
                w-full
                h-1
                bg-gradient-to-r
                from-blue-500
                to-indigo-500
                scale-x-0
                group-hover:scale-x-100
                origin-left
                transition-transform
                duration-300
              " />


              {/* Icon */}
              <div className="
                w-16
                h-16
                rounded-2xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-100
                group-hover:bg-blue-700
                group-hover:scale-110
                transition-all
                duration-300
              ">
                {item.icon}
              </div>


              {/* Title */}
              <h3 className="
                text-xl
                font-bold
                text-gray-900
                mt-6
                group-hover:text-blue-600
                transition-colors
                duration-300
              ">
                {item.title}
              </h3>


              {/* Description */}
              <p className="
                text-gray-500
                mt-3
                text-sm
                leading-7
              ">
                {item.description}
              </p>


              {/* Bottom Accent */}
              <div className="
                mt-6
                w-8
                h-1
                rounded-full
                bg-blue-600
                group-hover:w-14
                transition-all
                duration-300
              " />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturesSection;

