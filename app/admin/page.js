"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Plus,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import AdminProductForm from "../../components/AdminProductForm";
import useAuthStore from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    bestSelling: null,
    lowestSelling: null,
  });

  // Admin email check - in production, this would be handled by Supabase RLS
  const adminEmails = ["aboderindaniel482@gmail.com", "support@reezblank.com"];
  const isAdmin = user && adminEmails.includes(user.email);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //     return;
  //   }

  //   if (!isAdmin) {
  //     router.push("/");
  //     return;
  //   }

  //   fetchData();
  // }, [user, isAdmin, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchOrders()]);
      calculateAnalytics();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      let { data: productsData, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        setProducts(getDummyProducts());
      } else {
        setProducts(productsData || getDummyProducts());
      }
    } catch (error) {
      console.error("Error:", error);
      setProducts(getDummyProducts());
    }
  };

  const fetchOrders = async () => {
    try {
      let { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        setOrders(getDummyOrders());
      } else {
        setOrders(ordersData || getDummyOrders());
      }
    } catch (error) {
      console.error("Error:", error);
      setOrders(getDummyOrders());
    }
  };

  const getDummyProducts = () => [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 89.99,
      category: "shirts",
      stock: 50,
      sales: 120,
      active: true,
      created_at: "2024-01-01",
    },
    {
      id: 2,
      name: "Premium Denim Jacket",
      price: 159.99,
      category: "jackets",
      stock: 30,
      sales: 85,
      active: true,
      created_at: "2024-01-02",
    },
    {
      id: 3,
      name: "Elegant Evening Dress",
      price: 129.99,
      category: "dresses",
      stock: 25,
      sales: 45,
      active: true,
      created_at: "2024-01-03",
    },
  ];

  const getDummyOrders = () => [
    {
      id: 1,
      total: 219.98,
      status: "completed",
      created_at: "2024-01-15",
    },
    {
      id: 2,
      total: 159.99,
      status: "pending",
      created_at: "2024-01-14",
    },
    {
      id: 3,
      total: 89.99,
      status: "shipped",
      created_at: "2024-01-13",
    },
  ];

  const calculateAnalytics = () => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    const bestSelling = products.reduce(
      (best, product) =>
        !best || (product.sales || 0) > (best.sales || 0) ? product : best,
      null
    );

    const lowestSelling = products.reduce(
      (lowest, product) =>
        !lowest || (product.sales || 0) < (lowest.sales || 0)
          ? product
          : lowest,
      null
    );

    setAnalytics({
      totalProducts,
      totalOrders,
      totalRevenue,
      bestSelling,
      lowestSelling,
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        console.error("Error deleting product:", error);
      } else {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // if (!isAdmin) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">
  //           Access Denied
  //         </h1>
  //         <p className="text-gray-600">
  //           You don't have permission to access this page.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
  //     </div>
  //   );
  // }

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
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your store, products, and orders
          </p>
        </motion.div>

        {/* Analytics Cards */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-black">
                  {analytics.totalProducts}
                </p>
              </div>
              <Package className="h-8 w-8 text-gold" />
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-black">
                  {analytics.totalOrders}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-gold" />
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-black">
                  ${analytics.totalRevenue.toFixed(2)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-gold" />
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-black">1,234</p>
              </div>
              <Users className="h-8 w-8 text-gold" />
            </div>
          </Card>
        </motion.div>

        {/* Best/Worst Selling */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">
                Best Selling Product
              </h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            {analytics.bestSelling && (
              <div>
                <p className="font-semibold text-black">
                  {analytics.bestSelling.name}
                </p>
                <p className="text-gray-600">
                  {analytics.bestSelling.sales || 0} sales
                </p>
                <p className="text-green-600 font-semibold">
                  ₦{analytics.bestSelling.price}
                </p>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">
                Needs Attention
              </h3>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            {analytics.lowestSelling && (
              <div>
                <p className="font-semibold text-black">
                  {analytics.lowestSelling.name}
                </p>
                <p className="text-gray-600">
                  {analytics.lowestSelling.sales || 0} sales
                </p>
                <p className="text-red-600 font-semibold">
                  ₦{analytics.lowestSelling.price}
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Products Management */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Products</h2>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              className="bg-gold hover:bg-gold/90 text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Sales
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-black">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 text-black">₦{product.price}</td>
                    <td className="py-3 px-4 text-gray-600">{product.stock}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {product.sales || 0}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button>
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product);
                            setShowProductForm(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-2xl font-bold text-black mb-6">Recent Orders</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-black">
                      #{order.id}
                    </td>
                    <td className="py-3 px-4 text-black">${order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button>
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div>
          <AdminProductForm
            product={editingProduct}
            onClose={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            onSave={() => {
              setShowProductForm(false);
              setEditingProduct(null);
              fetchProducts();
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
