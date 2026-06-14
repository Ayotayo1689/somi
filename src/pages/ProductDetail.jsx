"use client"

import { products } from "@/data/products"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === Number(id))
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "S")
  const [quantity, setQuantity] = useState(1)
  const [showFront, setShowFront] = useState(true)

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    navigate("/cart")
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div
            className="bg-gray-100 h-96 flex items-center justify-center cursor-pointer relative"
            onClick={() => setShowFront(!showFront)}
          >
            <img
              src={showFront ? product.front : product.back}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <p className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white px-2 py-1 rounded">Click to flip</p>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-medium mb-8">₦{product.price.toLocaleString()}.00</p>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Size:</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 font-medium transition-all ${
                      selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.status === "sold-out"}
                className="w-full border-2 border-black py-3 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to cart →
              </button>
              <button
                disabled={product.status === "sold-out"}
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.status === "sold-out" ? "Sold out" : "Buy it now →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div key={p.id} className="flip-card h-80 cursor-pointer">
                <div className="flip-card-inner w-full h-full">
                  <div className="flip-card-front bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={p.front || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flip-card-back bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.back || "/placeholder.svg"}
                      alt={`${p.name} back`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
