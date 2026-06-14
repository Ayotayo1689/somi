"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Checkout({ cart }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "Nigeria",
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Order placed successfully! (This is a demo)")
    navigate("/")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-12">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <input
                type="email"
                name="email"
                placeholder="Email or mobile phone number"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-2 border-blue-500 px-4 py-3 text-sm"
              />
              <label className="flex items-center gap-2 mt-3">
                <input type="checkbox" />
                <span className="text-sm">Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-lg font-bold mb-4">Delivery</h3>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              >
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Kenya</option>
              </select>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name (optional)"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              />

              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              />

              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 text-sm"
                >
                  <option>State</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                </select>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              />

              <label className="flex items-center gap-2 mt-4">
                <input type="checkbox" />
                <span className="text-sm">Save this information for next time</span>
              </label>
            </div>

            {/* Shipping Method */}
            <div>
              <h3 className="text-lg font-bold mb-4">Shipping method</h3>
              <div className="bg-gray-100 p-4 text-sm text-gray-600">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-bold mb-4">Payment</h3>
              <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>

              <div className="border-2 border-blue-500 p-4 mb-4">
                <p className="text-sm font-medium">Paystack</p>
              </div>

              <div className="bg-gray-100 p-6 text-center mb-4">
                <p className="text-sm text-gray-600">
                  After clicking "Pay now", you will be redirected to Paystack to complete your purchase securely.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Billing address</h4>
                <label className="flex items-center gap-3 p-3 border-2 border-blue-500 mb-3">
                  <input type="radio" name="billing" defaultChecked />
                  <span className="text-sm">Same as shipping address</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-300">
                  <input type="radio" name="billing" />
                  <span className="text-sm">Use a different billing address</span>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 font-medium hover:bg-blue-700">
              Pay now
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-4">All rights reserved SOUTIE</p>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-6 rounded sticky top-4">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                    <img
                      src={item.front || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-600">Size: {item.size}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}.00</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal · {cart.length} items</span>
                <span>₦{subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Enter shipping address</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>NGN ₦{subtotal.toLocaleString()}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
