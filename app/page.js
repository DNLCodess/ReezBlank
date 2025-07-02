"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Users, Award, Star } from "lucide-react";

export default function HomePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: ShoppingBag,
      title: "Premium Quality",
      description: "Crafted from the finest fabrics for timeless elegance.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Tailored experiences designed around your needs.",
    },
    {
      icon: Award,
      title: "Sustainable Fashion",
      description: "Eco-conscious production meets refined design.",
    },
  ];

  const testimonials = [
    {
      name: "Amina O.",
      text: "ReezBlank redefines elegance. Every piece feels elite.",
    },
    { name: "David A.", text: "I felt seen. I felt styled. I felt ReezBlank." },
    {
      name: "Zainab K.",
      text: "The AI LookOut was like having a stylist in my pocket!",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 89.99,
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      name: "Denim Street Jacket",
      price: 159.99,
      category: "Jackets",
      image:
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      name: "Elegant Dress",
      price: 129.99,
      category: "Dresses",
      image:
        "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.div initial="hidden" animate="visible">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-black text-white overflow-hidden flex items-center"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero"
            fill
            className="object-cover opacity-60"
          />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative z-10 px-6 text-center w-full pt-28 pb-20 lg:pt-40"
        >
          <motion.h1
            variants={fadeIn}
            className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            <span className="text-white">Wear Elegance.</span>
            <br />
            <span className="text-gold">Define Luxury</span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg lg:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
          >
            Discover timeless pieces designed for bold statements and subtle
            impact.
          </motion.p>
          <motion.div variants={fadeIn} className="flex justify-center gap-4">
            <Link href="/products">
              <button className="bg-gold text-black px-8 py-4 font-semibold text-lg hover:bg-gold/90 flex items-center gap-2">
                Shop Collection <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/lookout">
              <button className="border border-gold text-gold px-8 py-4 font-semibold text-lg hover:bg-gold hover:text-black">
                Try AI LookOut
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-white text-center px-6">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-4">
          The ReezBlank Philosophy
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="max-w-3xl mx-auto text-lg text-gray-700"
        >
          More than fashion—ReezBlank is a commitment to excellence, expression,
          and empowerment.
        </motion.p>
      </section>

      {/* Features */}
      <section className="bg-cream py-24">
        <div className="container mx-auto grid md:grid-cols-3 gap-10 px-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gold rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto text-center px-6">
          <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-6">
            Featured Collection
          </motion.h2>
          <p className="text-gray-600 text-lg mb-12">
            Bestsellers designed to define your presence.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeIn}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative h-96">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-left">
                  <span className="text-sm text-gold font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Link href={`/products/${product.id}`}>
                      <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream text-center">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-12">
          What Our Clients Are Saying
        </motion.h2>
        <div className="container mx-auto grid md:grid-cols-3 gap-10 px-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl"
            >
              <Star className="text-gold w-6 h-6 mb-4 mx-auto" />
              <p className="text-gray-700 italic mb-4">"{t.text}"</p>
              <h4 className="font-semibold text-lg">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white text-center px-6">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-4">
          Join the ReezBlank Movement
        </motion.h2>
        <p className="text-gray-400 mb-8">
          Your wardrobe deserves more than basics. It deserves brilliance.
        </p>
        <Link href="/register">
          <button className="bg-gold hover:bg-gold/90 text-black px-10 py-4 text-lg font-bold">
            Create Account
          </button>
        </Link>
      </section>
    </motion.div>
  );
}
