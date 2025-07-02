"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import useCartStore from "../../store/useCartStore";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-cream flex items-center justify-center"
      >
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-black mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to get started.
          </p>
          <Link href="/products">
            <button className="bg-black hover:bg-gray-800 text-white">
              Continue Shopping
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-cream py-8"
    >
      <div className="container mx-auto px-6">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-600">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-6 border-b border-gray-100 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-black truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-xl font-bold text-black">
                      ₦{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-semibold px-3">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {total >= 100 ? "Free" : "$9.99"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">
                    ${(total * 0.08).toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>
                    $
                    {(total + (total >= 100 ? 0 : 9.99) + total * 0.08).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>

              {total < 100 && (
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gold font-semibold">
                    Add ${(100 - total).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <Link href="/checkout">
                <button className="w-full bg-black hover:bg-gray-800 text-white mb-4">
                  Proceed to Checkout
                </button>
              </Link>

              <Link href="/products">
                <button className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
