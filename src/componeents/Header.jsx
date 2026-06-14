import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Search, User, Menu, X } from "lucide-react"
import BigLogo from "../asset/logo.png"

export default function Header({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 bg-white z-[999] border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img
              className="w-[100px] md:w-[150px] aspect-video object-cover"
              src={BigLogo}
              alt="Logo"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-sm font-medium hover:underline">
              Shop +
            </Link>
            <Link to="/all-products" className="text-sm font-medium hover:underline">
              ALL PRODUCTS
            </Link>
            <a href="#" className="text-sm font-medium hover:underline">
              COLLECTIONS
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              LOOK BOOK
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              ABOUT
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-1 md:gap-8">
            {/*  */}
            <button className="p-2 hover:bg-gray-100 rounded">
              <Search size={20} />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-8 border-t pt-4">
            <Link
              to="/"
              className="text-sm font-medium hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop +
            </Link>
            <Link
              to="/all-products"
              className="text-sm font-medium hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              ALL PRODUCTS
            </Link>
            <a href="#" className="text-sm font-medium hover:underline">
              COLLECTIONS
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              LOOK BOOK
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              ABOUT
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
