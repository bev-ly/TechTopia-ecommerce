"use client";

import { motion } from "framer-motion";
import { Award, Shield, Users, Truck, Clock, Link } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const features = [
    {
      icon: <Award size={32} className="text-cyan-600" />,
      title: "Premium Selection",
      description: "We curate only the highest quality laptops from trusted brands"
    },
    {
      icon: <Shield size={32} className="text-blue-600" />,
      title: "Verified Quality",
      description: "Every device undergoes rigorous testing before shipping"
    },
    {
      icon: <Users size={32} className="text-purple-600" />,
      title: "Expert Support",
      description: "Our tech specialists are available 24/7 to assist you"
    },
    {
      icon: <Truck size={32} className="text-emerald-600" />,
      title: "Fast Shipping",
      description: "Free next-day delivery on all in-stock items"
    },
    {
      icon: <Clock size={32} className="text-amber-600" />,
      title: "Quick Warranty",
      description: "1-year warranty with hassle-free replacements"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/team/alex-johnson.jpg",
      alt: "Alex Johnson portrait"
    },
    {
      name: "Sarah Chen",
      role: "Head of Technology",
      image: "/team/sarah-chen.jpg",
      alt: "Sarah Chen portrait"
    },
    {
      name: "Michael Rodriguez",
      role: "Customer Experience",
      image: "/team/michael-rodriguez.jpg",
      alt: "Michael Rodriguez portrait"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section id="about-section" className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6"
          >
            About TechTopia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Your trusted destination for premium laptops and exceptional service since 2025
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/about/office-space.jpg"
                  alt="TechTopia headquarters"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in this year 2025, TechTopia began as a small passion project between tech enthusiasts who believed in bringing the best computing experience to professionals and creatives alike.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                What started as a modest online store has grown into a leading destination for premium laptops, trusted by thousands of customers worldwide for our curated selection and exceptional service.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to uphold our founding principles: quality over quantity, genuine expertise, and customer satisfaction above all else.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white"
          >
            What Sets Us Apart
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white"
          >
            Meet the Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-cyan-600 dark:text-cyan-400 mb-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Our Promise to You
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            We're committed to providing exceptional laptops paired with service that exceeds expectations. Your satisfaction is our top priority.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact" 
              className="inline-flex items-center px-8 py-3 bg-white text-cyan-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}