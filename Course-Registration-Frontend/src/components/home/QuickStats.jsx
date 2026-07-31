import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Award, Calendar, TrendingUp } from 'lucide-react';

export default function QuickStats({ coursesCount = 6, enrolledCount = 5 }) {
  const stats = [
    {
      id: 'total',
      title: 'Total Courses',
      value: coursesCount,
      subtitle: 'Offered this semester',
      icon: BookOpen,
      iconBg: 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400',
      badge: 'Active Catalog',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
      id: 'registered',
      title: 'Registered Courses',
      value: enrolledCount,
      subtitle: 'Confirmed enrollments',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
      badge: 'Completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    },
    {
      id: 'credits',
      title: 'Remaining Credits',
      value: '4 Credits',
      subtitle: 'Max limit: 18 credits',
      icon: Award,
      iconBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
      badge: 'On Track',
      badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    },
    {
      id: 'semester',
      title: 'Current Semester',
      value: 'Fall 2026',
      subtitle: 'Week 4 of 16',
      icon: Calendar,
      iconBg: 'bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400',
      badge: 'Term 7',
      badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Quick Stats</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Overview of your current academic status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-soft-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500 inline" />
                  {stat.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
