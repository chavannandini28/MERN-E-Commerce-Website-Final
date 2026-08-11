
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaShippingFast,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
      
      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="z-10">

          {/* Badge */}
          <div className="
            inline-flex items-center gap-2
            px-5 py-2.5
            rounded-full
            bg-white/10
            border border-white/20
            backdrop-blur-lg
            shadow-lg
            text-sm font-semibold
            text-cyan-200
          ">
            <FaShippingFast className="text-cyan-300" />
            <span>Free Shipping Above ₹999</span>
          </div>

          {/* Heading */}
          <h1 className="
            mt-7
            text-4xl
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-extrabold
            leading-[1.08]
            tracking-tight
          ">
            Upgrade Your
            <span className="
              block
              mt-2
              bg-gradient-to-r
              from-cyan-300
              via-blue-300
              to-indigo-300
              bg-clip-text
              text-transparent
            ">
              Shopping Experience
            </span>
          </h1>

          {/* Description */}
          <p className="
            mt-7
            max-w-xl
            text-base
            sm:text-lg
            text-slate-300
            leading-8
          ">
            Discover premium electronics, fashion, lifestyle,
            gaming and home essentials with unbeatable prices,
            secure payments and lightning-fast delivery.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-9">

            <Link
              to="/shop"
              className="
                group
                inline-flex
                items-center
                gap-3
                bg-cyan-400
                hover:bg-cyan-300
                text-slate-950
                px-7
                py-3.5
                rounded-xl
                font-bold
                shadow-lg
                shadow-cyan-500/20
                hover:shadow-cyan-400/40
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              Shop Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                px-7
                py-3.5
                rounded-xl
                border
                border-white/25
                bg-white/5
                backdrop-blur-sm
                hover:bg-white
                hover:text-slate-950
                hover:-translate-y-1
                font-bold
                transition-all
                duration-300
              "
            >
              Join Today
            </Link>

          </div>

          {/* Stats */}
          <div className="
            grid
            grid-cols-3
            gap-5
            sm:gap-8
            mt-14
            pt-8
            border-t
            border-white/10
            max-w-xl
          ">

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                10K+
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                5K+
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Premium Products
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                4.9★
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Customer Rating
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="relative lg:pl-4">

          {/* Main Image */}
          <div className="
            relative
            rounded-[2rem]
            p-2
            bg-white/10
            border
            border-white/20
            backdrop-blur-sm
            shadow-2xl
          ">

            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80"
              alt="Shopping"
              className="
                w-full
                h-[380px]
                sm:h-[480px]
                object-cover
                rounded-[1.6rem]
              "
            />

            {/* Image Overlay */}
            <div className="
              absolute inset-2
              rounded-[1.6rem]
              bg-gradient-to-t
              from-slate-950/30
              via-transparent
              to-transparent
              pointer-events-none
            " />

          </div>

          {/* Floating Product Card */}
          <div className="
            absolute
            -left-3
            sm:-left-8
            top-8
            sm:top-12
            bg-white
            text-slate-900
            rounded-2xl
            shadow-2xl
            p-4
            sm:p-5
            w-52
            sm:w-60
            border
            border-gray-100
            hover:-translate-y-2
            transition-transform
            duration-300
          ">

            <div className="flex items-center gap-3">

              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                alt="Sneakers"
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-xl
                  object-cover
                "
              />

              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  Nike Sneakers
                </h3>

                <p className="text-blue-600 font-extrabold mt-1">
                  ₹4,999
                </p>
              </div>

            </div>

          </div>

          {/* Reviews Card */}
          <div className="
            absolute
            -right-3
            sm:-right-6
            bottom-7
            sm:bottom-10
            bg-white
            text-slate-900
            rounded-2xl
            shadow-2xl
            p-4
            sm:p-5
            w-56
            sm:w-64
            border
            border-gray-100
            hover:-translate-y-2
            transition-transform
            duration-300
          ">

            <div className="flex items-center justify-between gap-4">

              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  Customer Reviews
                </h4>

                <div className="flex text-yellow-400 mt-2 gap-0.5">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold">
                4.9
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;

