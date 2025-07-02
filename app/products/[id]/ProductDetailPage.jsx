"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import ProductCard from "../../../components/ProductCard";
import useCartStore from "../../../store/useCartStore";
import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";

export default function ProductDetailPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem } = useCartStore();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error || !productData) {
        console.error("Error fetching product:", error);
        setProduct(getDummyProduct(productId));
      } else {
        setProduct(productData);
      }
    } catch (error) {
      console.error("Error:", error);
      setProduct(getDummyProduct(productId));
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data: productsData, error } = await supabase
        .from("products")
        .select("*")
        .neq("id", productId)
        .limit(4);

      if (error || !productsData) {
        console.error("Error fetching related products:", error);
        setRelatedProducts(getDummyRelatedProducts());
      } else {
        setRelatedProducts(productsData);
      }
    } catch (error) {
      console.error("Error:", error);
      setRelatedProducts(getDummyRelatedProducts());
    }
  };

  const getDummyProduct = (id) => {
    const products = {
      1: {
        id: 1,
        name: "Classic White Shirt",
        price: 89.99,
        category: "shirts",
        description: "Premium cotton shirt...",
        image_url:
          "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
        stock: 50,
        rating: 4.8,
        reviews_count: 124,
      },
      2: {
        id: 2,
        name: "Premium Denim Jacket",
        price: 159.99,
        category: "jackets",
        description: "A timeless denim jacket...",
        image_url:
          "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
        stock: 30,
        rating: 4.9,
        reviews_count: 87,
      },
    };
    return products[id?.toString()] || products["1"];
  };

  const getDummyRelatedProducts = () => [
    {
      id: 4,
      name: "Casual Chino Pants",
      price: 69.99,
      category: "pants",
      image_url:
        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
    },
    {
      id: 5,
      name: "Leather Handbag",
      price: 199.99,
      category: "accessories",
      image_url:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    },
    {
      id: 6,
      name: "Wool Blazer",
      price: 189.99,
      category: "jackets",
      image_url:
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    },
  ];

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, quantity);
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-cream py-8"
    >
      <div className="container mx-auto px-6 pt-10">
        {/* Product section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div variants={itemVariants}>
            <div className="relative h-96 lg:h-[600px] bg-white rounded-2xl overflow-hidden">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlist}
                className={`absolute top-4 right-4 ${
                  isWishlisted ? "text-red-500" : "text-gray-400"
                } hover:text-red-500`}
              >
                <Heart
                  className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-4xl font-bold text-black">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 4.8)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating || 4.8} ({product.reviews_count || 0} reviews)
              </span>
            </div>

            <p className="text-4xl font-bold">₦{product.price}</p>

            <div>
              <h3 className="text-lg font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? "bg-black text-white hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center gap-3 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <Badge variant={product.stock > 10 ? "success" : "warning"}>
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
            </Badge>

            <Button
              size="lg"
              className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ₦{(product.price * quantity).toFixed(2)}
            </Button>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gold" />
                <span className="text-gray-700">
                  Free shipping on orders over $100
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-gold" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gold" />
                <span className="text-gray-700">2-year warranty included</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16">
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  viewMode="grid"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
