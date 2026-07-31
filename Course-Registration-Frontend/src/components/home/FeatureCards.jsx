import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, ClipboardList, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeatureCards() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'register',
      icon: BookOpen,
      title: 'Register Course',
      description: 'Browse available courses and register instantly.',
      btnText: 'Go',
      btnStyle: 'gradient-primary-btn',
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400',
      badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      borderHover: 'hover:border-blue-500/50 dark:hover:border-blue-500/50',
      route: '/register',
    },
    {
      id: 'available',
      icon: GraduationCap,
      title: 'Available Courses',
      description: 'View all offered courses with faculty and credits.',
      btnText: 'View',
      btnStyle: 'gradient-green-btn',
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-500/50',
      route: '/courses',
    },
    {
      id: 'enrolled',
      icon: ClipboardList,
      title: 'My Enrolled Courses',
      description: 'Check registered courses and total credits.',
      btnText: 'Open',
      btnStyle: 'gradient-purple-btn',
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/80 dark:text-purple-400',
      badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
      borderHover: 'hover:border-purple-500/50 dark:hover:border-purple-500/50',
      route: '/enrolled',
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Quick Navigation</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Select an action to continue your portal tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => navigate(card.route)}
              className={`group cursor-pointer glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 border border-slate-200/80 dark:border-slate-800 ${card.borderHover}`}
            >
              <div>
                {/* Header with Icon Circle */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 duration-300 ${card.iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${card.badgeBg}`}>
                    Portal Action
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Gradient Action Button */}
              <div className="pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(card.route);
                  }}
                  className={`w-full py-3 px-5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm ${card.btnStyle}`}
                >
                  <span>{card.btnText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
