import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  GraduationCap, 
  Bell, 
  Sun, 
  Moon, 
  BookOpen, 
  ClipboardList, 
  User, 
  Check, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Registration Opens Tomorrow', text: 'Fall 2026 course enrollment window opens at 8:00 AM EST.', time: '10m ago', unread: true },
    { id: 2, title: 'Course Deadline Extended', text: 'CS302 Spring Boot registration deadline extended to Aug 15.', time: '1h ago', unread: true },
    { id: 3, title: 'New AI Elective Added', text: 'Deep Learning & Neural Nets course is now available for preview.', time: '1d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Course Registration System
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Apex University Portal
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1 ml-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
                end
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <BookOpen className="w-4 h-4" />
                Available Courses
              </NavLink>

              <NavLink
                to="/enrolled"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <ClipboardList className="w-4 h-4" />
                Enrolled Students
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white'
                  }`
                }
              >
                <Sparkles className="w-4 h-4" />
                Register Now
              </NavLink>
            </nav>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card rounded-2xl p-4 z-50 border border-slate-200 dark:border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h4>
                      <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      Dismiss
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-2">
                    {notifications.map((item) => (
                      <div key={item.id} className="py-3 px-1 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.title}</h5>
                          <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Student Name */}
            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-3 ml-1">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-blue-500/20">
                    AJ
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight flex items-center gap-1">
                    Alex Johnson
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">CS Senior • Fall '26</span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl p-2 z-50 border border-slate-200 dark:border-slate-800 shadow-xl">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs font-medium text-slate-400">Signed in as</p>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">alex.johnson@university.edu</p>
                  </div>
                  <div className="space-y-0.5">
                    <button className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-500" /> Student Profile
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Academic Transcript
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
