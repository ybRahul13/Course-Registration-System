import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeatureCards from '../components/home/FeatureCards';
import QuickStats from '../components/home/QuickStats';
import NotificationsSection from '../components/home/NotificationsSection';
import DeadlineCard from '../components/home/DeadlineCard';
import { fetchAvailableCourses, fetchEnrolledStudents } from '../services/api';
import { Wifi, WifiOff } from 'lucide-react';

export default function Dashboard() {
  const [coursesCount, setCoursesCount] = useState(6);
  const [enrolledCount, setEnrolledCount] = useState(5);
  const [isLiveApi, setIsLiveApi] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [coursesRes, enrolledRes] = await Promise.all([
        fetchAvailableCourses(),
        fetchEnrolledStudents()
      ]);
      if (coursesRes.data) setCoursesCount(coursesRes.data.length);
      if (enrolledRes.data) setEnrolledCount(enrolledRes.data.length);
      setIsLiveApi(coursesRes.isLive);
    }
    loadStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-10 pb-12"
    >
      {/* Backend API Live Status Badge */}
      <div className="flex justify-end">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
          isLiveApi
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
        }`}>
          {isLiveApi ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              <span>Spring Boot API Connected (127.0.0.1:8080)</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-500" />
              <span>Demo Portal Mode (Live API Offline)</span>
            </>
          )}
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <HeroSection />

      {/* 3 Main Action Feature Cards */}
      <FeatureCards />

      {/* 4 Quick Statistic Cards */}
      <QuickStats coursesCount={coursesCount} enrolledCount={enrolledCount} />

      {/* Grid for Recent Notifications & Upcoming Deadline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <NotificationsSection />
        </div>
        <div className="lg:col-span-5">
          <DeadlineCard />
        </div>
      </div>
    </motion.div>
  );
}
