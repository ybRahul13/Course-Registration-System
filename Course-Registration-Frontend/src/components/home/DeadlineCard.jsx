import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeadlineCard() {
  // Target deadline: August 15, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 18, minutes: 42, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-6 sm:p-8 border border-slate-800 shadow-soft-lg flex flex-col justify-between"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Countdown Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Countdown Active</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Fall Term Deadline</span>
        </div>

        {/* Title & Target Date */}
        <h3 className="text-lg font-bold text-slate-200">Course Registration Ends</h3>
        <div className="mt-1 mb-6 flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
            August 15
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            2026
          </span>
        </div>

        {/* Dynamic Countdown Grid */}
        <div className="grid grid-cols-4 gap-2.5 text-center mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-white block">{timeLeft.days}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Days</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-white block">{timeLeft.hours}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Hours</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-white block">{timeLeft.minutes}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Mins</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block">{timeLeft.seconds}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Secs</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <p className="text-xs text-slate-400">Complete registration before window closes</p>
        <Link
          to="/register"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Register Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
