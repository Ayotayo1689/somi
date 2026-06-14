"use client"

import { Link } from "react-router-dom"

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">YOUR CART</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/all-products" className="text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-6 border-b border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.front || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">Size: {item.size}</p>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-xs text-gray-600 hover:text-black mt-2"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">₦{(item.price * item.quantity).toLocaleString()}.00</p>
                    <div className="flex items-center gap-2 mt-2 justify-end">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Note */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-2">Add a note to your order</label>
              <textarea
                className="w-full border-2 border-black p-4 text-sm"
                rows="4"
                placeholder="Add any special instructions..."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded sticky top-4">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}.00</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-black text-white py-3 text-center font-medium hover:bg-gray-800 block"
              >
                Check out →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
