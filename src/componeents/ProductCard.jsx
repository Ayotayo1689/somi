import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="flip-card h-52 md:h-80 cursor-pointer">
        <div className="flip-card-inner w-full h-full">
          <div className="flip-card-front bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.front || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flip-card-back bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.back || "/placeholder.svg"}
              alt={`${product.name} back`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xs md:text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-xs md:text-sm text-gray-600 mt-1">
          ₦{product.price.toLocaleString()}.00
        </p>
        {product.status === "sold-out" && (
          <p className="text-xs text-red-500 mt-1 font-medium">SOLD OUT</p>
        )}
      </div>
    </Link>
  );
}
