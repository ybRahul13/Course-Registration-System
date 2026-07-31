import React from 'react';
import { motion } from 'framer-motion';
import { BellRing, Calendar, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function NotificationsSection() {
  const announcements = [
    {
      id: 1,
      title: 'Registration opens tomorrow',
      tag: 'Important',
      tagColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300',
      description: 'Fall 2026 course enrollment window officially opens at 8:00 AM EST. Ensure pre-requisites are fulfilled.',
      date: 'Aug 1, 2026',
      icon: BellRing,
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      id: 2,
      title: 'Course deadline extended',
      tag: 'Update',
      tagColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300',
      description: 'Registration for Spring Boot (CS302) and Java Essentials has been extended through August 15.',
      date: 'Jul 30, 2026',
      icon: Calendar,
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      id: 3,
      title: 'New AI elective added',
      tag: 'New Elective',
      tagColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300',
      description: 'Deep Learning & Neural Nets (AI502) is now available for registration under the AI department.',
      date: 'Jul 29, 2026',
      icon: Sparkles,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Announcements</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Stay updated on university registration news</p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400">3 updates</span>
      </div>

      <div className="space-y-4">
        {announcements.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 flex items-start gap-4 group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
