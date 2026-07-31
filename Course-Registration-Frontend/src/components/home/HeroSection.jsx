import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-10 lg:p-12 shadow-soft-lg mb-10">
      
      {/* Decorative Glow Shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Welcome Text */}
        <div className="lg:col-span-7 space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Fall 2026 Registration Portal Open</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Welcome Back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-indigo-100 to-amber-200">
              Register your semester courses quickly and easily.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-blue-100 text-base sm:text-lg max-w-xl font-normal leading-relaxed opacity-90"
          >
            Manage your academic journey in one place. Explore offered catalog courses, review trainer profiles, and lock in your schedule.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-md transition-all"
            >
              <Calendar className="w-4 h-4 text-blue-200" />
              <span>Browse Catalog</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: University Graphic Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            
            {/* SVG Visual Graphic */}
            <div className="relative p-6 bg-white/10 dark:bg-slate-900/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden group">
              
              {/* Illustration Art */}
              <svg className="w-full h-auto drop-shadow-xl" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Campus Arch */}
                <rect x="20" y="40" width="360" height="220" rx="20" fill="url(#hero_grad_1)" opacity="0.4" />
                <path d="M120 260 V 120 C 120 75, 280 75, 280 120 V 260" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="8 6" opacity="0.6" />
                
                {/* University Pillars */}
                <rect x="100" y="90" width="28" height="150" rx="6" fill="#FFFFFF" fillOpacity="0.85" />
                <rect x="186" y="90" width="28" height="150" rx="6" fill="#FFFFFF" fillOpacity="0.85" />
                <rect x="272" y="90" width="28" height="150" rx="6" fill="#FFFFFF" fillOpacity="0.85" />

                {/* Roof Triangle */}
                <path d="M70 90 L200 25 L330 90 Z" fill="#FFFFFF" fillOpacity="0.95" />
                <circle cx="200" cy="65" r="12" fill="#3B82F6" />

                {/* Graduation Cap Floating */}
                <g className="animate-float">
                  <path d="M200 130 L255 155 L200 180 L145 155 Z" fill="#F59E0B" />
                  <rect x="180" y="172" width="40" height="24" rx="4" fill="#D97706" />
                  <path d="M245 160 L245 200" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="245" cy="202" r="5" fill="#FBBF24" />
                </g>

                {/* Floating Badges */}
                <rect x="40" y="160" width="90" height="42" rx="10" fill="#FFFFFF" />
                <text x="52" y="178" fontSize="10" fontWeight="bold" fill="#1E293B">Credits</text>
                <text x="52" y="193" fontSize="13" fontWeight="800" fill="#2563EB">18 / 18</text>

                <rect x="270" y="170" width="95" height="42" rx="10" fill="#FFFFFF" />
                <text x="282" y="188" fontSize="10" fontWeight="bold" fill="#1E293B">GPA</text>
                <text x="282" y="203" fontSize="13" fontWeight="800" fill="#10B981">3.92</text>

                <defs>
                  <linearGradient id="hero_grad_1" x1="20" y1="40" x2="380" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#312E81" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Status Floating Pill */}
              <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold text-white">Enrollment System Active</span>
                </div>
                <span className="text-blue-100 font-medium">Spring/Fall '26</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
