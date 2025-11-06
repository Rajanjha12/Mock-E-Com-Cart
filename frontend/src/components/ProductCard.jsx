
import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart({ product, qty: 1 });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Heart
          className={`w-5 h-5 transition-all duration-200 ${
            isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Rating */}
       

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Product Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.stock && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.stock > 10
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }`}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
            isAdding
              ? 'bg-green-500 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAdding ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;