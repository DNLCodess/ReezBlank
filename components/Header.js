"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search,
  Heart,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "./ui/button";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCartStore();
  const { user, signOut } = useAuthStore();
  const cartItemCount = getItemCount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            ReezBlank
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {["Home", "Products", "LookOut"].map((item, index) => (
              <Link
                key={index}
                href={`/${
                  item === "Home" ? "" : item.toLowerCase().replace(/\s/g, "")
                }`}
                className={`font-medium transition hover:text-gold ${
                  isScrolled ? "text-black" : "text-black"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {[Search, Heart].map((Icon, i) => (
              <button
                key={i}
                className={`transition ${
                  isScrolled
                    ? "text-black hover:text-gold"
                    : "text-black hover:text-gold"
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}

            <Link href="/cart">
              <button
                className={`relative transition ${
                  isScrolled
                    ? "text-black hover:text-gold"
                    : "text-black hover:text-gold"
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-ping-slow">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    isScrolled ? "text-black" : "text-black"
                  }`}
                >
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-gold border border-gold px-3 py-1.5 rounded hover:bg-gold hover:text-black transition"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`px-4 py-2 text-sm ${
                      isScrolled ? "text-black" : "text-black"
                    } hover:text-gold`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gold hover:bg-gold/90 text-black font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden transition ${
              isScrolled ? "text-black" : "text-black"
            }`}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {["Home", "Products", "AI LookOut"].map((item, i) => (
                <Link
                  key={i}
                  href={`/${
                    item === "Home" ? "" : item.toLowerCase().replace(/\s/g, "")
                  }`}
                  className="block font-medium text-black hover:text-gold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/cart"
                className="flex items-center font-medium text-black hover:text-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Cart ({cartItemCount})
              </Link>

              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full text-gold border-gold hover:bg-gold hover:text-black"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gold hover:bg-gold/90 text-black font-semibold">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
