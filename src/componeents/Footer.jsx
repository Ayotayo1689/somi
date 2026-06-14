import BigLogo from "../asset/transLogo.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div className="  ">
          {/* Left Section - Brand Info */}
          <div className="flex flex-col gap-2">
            <img
              src={BigLogo || "/placeholder.svg"}
              alt="Logo"
              className="w-[100px] md:w-[150px] aspect-video object-cover filter brightness-0 invert"
            />{" "}
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              At SOUTIEE, we believe that fashion is an expression of
              individuality and artistry.
            </p>
            <a
              href="#"
              className="text-white  mb-14 hover:text-gray-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>
          </div>

          {/* Left-Middle Section - Hours & Address */}
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-3">
                Operating hours: Monday - Saturday (10am -8pm) Sunday (12pm-8pm)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                LEKKI , LAGOS, NIGERIA
              </p>
              <a
                href="#"
                className="text-white text-sm font-semibold underline hover:text-gray-300 transition-colors"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>

        <div className=" ">
          {/* Middle-Right Section - Links */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            <div>
              <h3 className="text-xs font-bold tracking-widest text-gray-300 mb-4">
                QUICK LINK
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors text-sm"
                  >
                    HOME
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors text-sm"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors text-sm"
                  >
                    CONTACT
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors text-sm"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest text-gray-300 mb-4">
                SHOP
              </h3>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors text-sm"
              >
                SHOP ALL
              </a>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="flex flex-col mt-14 gap-4">
            <h3 className="text-xs font-bold tracking-widest text-gray-300">
              GET 10% OFF YOUR NEXT ORDER
            </h3>
            <p className="text-xs text-gray-400">
              *BY SIGNING UP, YOU AGREE TO RECEIVE EMAILS ABOUT HIGHFASHION AND
              OUR OTHER{" "}
              <a href="#" className="underline">
                TERMS
              </a>
              .
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-gray-700 text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 px-8 py-6">
        <p className="text-xs text-gray-500 max-w-7xl mx-auto">
          © 2025 Soutiee, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
