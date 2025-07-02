"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export default function AdminProductForm({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "shirts",
    stock: "",
    image_url: "",
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = ["shirts", "pants", "jackets", "dresses", "accessories"];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category: product.category || "shirts",
        stock: product.stock?.toString() || "",
        image_url: product.image_url || "",
        active: product.active !== false,
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image_url: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Valid price is required";
    }
    if (
      !formData.stock ||
      isNaN(formData.stock) ||
      parseInt(formData.stock) < 0
    ) {
      newErrors.stock = "Valid stock quantity is required";
    }
    if (!formData.image_url) newErrors.image_url = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        return formData.image_url; // Return current URL if upload fails
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return formData.image_url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image_url: imageUrl,
        active: formData.active,
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (error) {
          console.error("Error updating product:", error);
          toast.error("Failed to update product");
          return;
        }

        toast.success("Product updated successfully!");
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert([productData]);

        if (error) {
          console.error("Error creating product:", error);
          toast.error("Failed to create product");
          return;
        }

        toast.success("Product created successfully!");
      }

      onSave();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An error occurred while saving the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">
                {product ? "Edit Product" : "Add New Product"}
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Image */}
              <div>
                <Label>Product Image</Label>
                <div className="mt-2">
                  {formData.image_url ? (
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={formData.image_url}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image_url: "" }))
                        }
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No image selected</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-2">
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </Label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  <div className="mt-2">
                    <Input
                      placeholder="Or paste image URL"
                      value={formData.image_url}
                      onChange={(e) =>
                        handleInputChange("image_url", e.target.value)
                      }
                      className={errors.image_url ? "border-red-500" : ""}
                    />
                  </div>

                  {errors.image_url && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image_url}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={errors.description ? "border-red-500" : ""}
                  placeholder="Enter product description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={errors.price ? "border-red-500" : ""}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    className={errors.stock ? "border-red-500" : ""}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    handleInputChange("active", e.target.checked)
                  }
                  className="rounded"
                />
                <Label htmlFor="active">Product is active</Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gold hover:bg-gold/90 text-black"
                >
                  {loading
                    ? "Saving..."
                    : product
                    ? "Update Product"
                    : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
