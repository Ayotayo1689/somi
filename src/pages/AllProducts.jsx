"use client"

import { useState, useMemo } from "react"
import ProductCard from "@/componeents/ProductCard"
import { products } from "@/data/products"

export default function AllProducts({ addToCart }) {
  const [statusFilter, setStatusFilter] = useState(["in-stock", "sold-out"])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const statusMatch = statusFilter.includes(product.status)
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max
      return statusMatch && priceMatch
    })
  }, [statusFilter, priceRange])

  const toggleStatus = (status) => {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">ALL PRODUCTS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="text-lg font-bold mb-6">FILTERS</h3>

            {/* Status Filter */}
            <div className="mb-8">
              <h4 className="font-medium mb-4">Status</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes("in-stock")}
                    onChange={() => toggleStatus("in-stock")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes("sold-out")}
                    onChange={() => toggleStatus("sold-out")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Sold Out</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-medium mb-4">Price Range</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">From</label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">To</label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
