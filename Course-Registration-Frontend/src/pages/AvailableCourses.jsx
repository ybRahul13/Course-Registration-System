import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAvailableCourses } from '../services/api';
import { CardSkeleton, TableSkeleton } from '../components/common/Skeleton';
import { BookOpen, Search, User, Clock, ArrowRight, Filter, LayoutGrid, List, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AvailableCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchAvailableCourses();
      setCourses(res.data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      (c.courseID && c.courseID.toLowerCase().includes(query)) ||
      (c.courseName && c.courseName.toLowerCase().includes(query)) ||
      (c.trainer && c.trainer.toLowerCase().includes(query))
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-12"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Academic Catalog
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Offered Courses</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Browse available course modules, assigned faculty, and total credit hours.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="gradient-primary-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Register Course</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by course ID (e.g. CS101), course name, or faculty trainer..."
          className="w-full bg-transparent border-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        viewMode === 'grid' ? <CardSkeleton count={6} /> : <TableSkeleton rows={6} cols={4} />
      ) : filteredCourses.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No courses match your query</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search criteria or clear the search filter.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.courseID || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-extrabold text-xs tracking-wider">
                    {course.courseID || `CS10${idx + 1}`}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {course.duration ? `${course.duration} Weeks` : '12 Weeks'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.courseName}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium">Faculty:</span>
                  <span>{course.trainer || 'Prof. Faculty Staff'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                  3 - 4 Credits
                </span>

                <button
                  onClick={() => navigate('/register', { state: { courseName: course.courseName } })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                >
                  <span>Select Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table Layout */
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">Course ID</th>
                  <th className="py-3.5 px-6">Course Name</th>
                  <th className="py-3.5 px-6">Faculty Trainer</th>
                  <th className="py-3.5 px-6">Duration</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCourses.map((course, idx) => (
                  <tr key={course.courseID || idx} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-blue-600 dark:text-blue-400">
                      {course.courseID || `CS10${idx + 1}`}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                      {course.courseName}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      {course.trainer || 'Prof. Faculty Staff'}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      {course.duration ? `${course.duration} Weeks` : '12 Weeks'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => navigate('/register', { state: { courseName: course.courseName } })}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        Register
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
