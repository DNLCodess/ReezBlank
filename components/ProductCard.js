"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import useCartStore from "../store/useCartStore";
import { toast } from "sonner";

export default function ProductCard({ product, viewMode = "grid" }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Added to wishlist");
  };

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden"
      >
        <Link href={`/products/${product.id}`}>
          <div className="flex gap-6 p-6">
            <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h3 className="text-xl font-bold text-black mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 4.8)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews_count || 0})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-black">
                  ₦{product.price}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWishlist}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <div className="relative h-80 bg-gray-100">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-white/80 hover:bg-white"
            >
              <Heart className="h-5 w-5" />
            </button>
            {product.stock < 10 && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                Low Stock
              </Badge>
            )}
          </div>

          <div className="p-6">
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 4.8)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews_count || 0})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-black">
                ${product.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-black hover:bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
