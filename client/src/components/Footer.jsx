import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:pr-8">

            <Link
              to="/"
              className="inline-block text-3xl lg:text-4xl font-extrabold tracking-tight hover:text-blue-300 transition"
            >
              Shop<span className="text-blue-400">Verse</span>
            </Link>

            <p className="mt-5 text-sm lg:text-base text-slate-300 leading-7">
              Premium online shopping destination offering quality products,
              secure payments, fast delivery, and exceptional customer service.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-7">

              {["📘", "📸", "🐦", "💼"].map((icon, index) => (
                <div
                  key={index}
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-white/10
                    border border-white/10
                    hover:bg-blue-600
                    hover:border-blue-500
                    hover:-translate-y-1
                    cursor-pointer
                    flex items-center justify-center
                    text-lg
                    transition-all duration-300
                  "
                >
                  {icon}
                </div>
              ))}

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer Service */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3 text-slate-300">

              <li className="hover:text-white cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Returns & Refunds
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Shipping Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-slate-300 text-sm">

              <div className="flex gap-3">
                <span>📍</span>
                <p>Pune, Maharashtra, India</p>
              </div>

              <div className="flex gap-3">
                <span>📞</span>
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <span>✉️</span>
                <p>support@shopverse.com</p>
              </div>

              <div className="flex gap-3">
                <span>🕒</span>
                <p>Mon - Sat : 9 AM - 8 PM</p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-sm text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} ShopVerse. All Rights Reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">

            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="Visa"
                className="h-6 w-auto"
              />
            </div>

            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <img
                src="https://img.icons8.com/color/48/mastercard.png"
                alt="Mastercard"
                className="h-6 w-auto"
              />
            </div>

            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <img
                src="https://img.icons8.com/color/48/paypal.png"
                alt="PayPal"
                className="h-6 w-auto"
              />
            </div>

            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <img
                src="https://img.icons8.com/color/48/google-pay.png"
                alt="Google Pay"
                className="h-6 w-auto"
              />
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;