"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import useCartStore from "../../store/useCartStore";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Nigeria",
    phone: "",
    deliveryOption: "standard",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      description: "5-7 business days",
      price: 9.99,
    },
    {
      id: "express",
      name: "Express Delivery",
      description: "2-3 business days",
      price: 19.99,
    },
    {
      id: "overnight",
      name: "Overnight Delivery",
      description: "Next business day",
      price: 29.99,
    },
  ];

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const calculateTotal = () => {
    const subtotal = total;
    const selectedDelivery = deliveryOptions.find(
      (option) => option.id === formData.deliveryOption
    );
    const deliveryFee =
      total >= 100 && formData.deliveryOption === "standard"
        ? 0
        : selectedDelivery?.price || 0;
    const tax = subtotal * 0.08;
    return subtotal + deliveryFee + tax;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Simulate Paystack payment integration
      // In production, you would integrate with Paystack's JavaScript SDK
      const paymentData = {
        email: formData.email,
        amount: Math.round(calculateTotal() * 100), // Amount in kobo
        currency: "NGN",
        reference: `reez_${Date.now()}`,
        callback_url: `${window.location.origin}/success`,
      };

      // Simulate payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order in database (would be real Supabase call in production)
      const orderData = {
        user_id: user?.id || null,
        items: items,
        shipping_address: formData,
        total: calculateTotal(),
        status: "pending",
        payment_reference: paymentData.reference,
      };

      console.log("Order created:", orderData);

      // Clear cart and redirect to success
      clearCart();
      router.push(`/success?reference=${paymentData.reference}`);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

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
            Checkout
          </h1>
          <p className="text-xl text-gray-600">Complete your purchase</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                    placeholder="+234 123 456 7890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className={errors.address ? "border-red-500" : ""}
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Delivery Options
              </h2>
              <RadioGroup
                value={formData.deliveryOption}
                onValueChange={(value) =>
                  handleInputChange("deliveryOption", value)
                }
              >
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 p-3 border rounded-lg"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex-1">
                      <Label
                        htmlFor={option.id}
                        className="text-base font-semibold"
                      >
                        {option.name}
                      </Label>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    <span className="font-semibold">
                      {total >= 100 && option.id === "standard"
                        ? "Free"
                        : `₦${option.price}`}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    {total >= 100 && formData.deliveryOption === "standard"
                      ? "Free"
                      : `₦${
                          deliveryOptions.find(
                            (o) => o.id === formData.deliveryOption
                          )?.price || 0
                        }`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">
                    ₦{(total * 0.08).toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₦{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure checkout with Paystack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <span>Your payment information is protected</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {loading
                  ? "Processing..."
                  : `Pay $${calculateTotal().toFixed(2)}`}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
