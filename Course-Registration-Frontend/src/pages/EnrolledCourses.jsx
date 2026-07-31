import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchEnrolledStudents } from '../services/api';
import { TableSkeleton } from '../components/common/Skeleton';
import { ClipboardList, Search, User, Mail, BookOpen, CheckCircle, Download, Users } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function EnrolledCourses() {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchEnrolledStudents();
      setEnrolled(res.data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredEnrolled = enrolled.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.course_name && item.course_name.toLowerCase().includes(query))
    );
  });

  const handleExportCSV = () => {
    if (filteredEnrolled.length === 0) return;
    const headers = ['ID', 'Student Name', 'Email Address', 'Registered Course'];
    const csvRows = [
      headers.join(','),
      ...filteredEnrolled.map(item => `"${item.id}","${item.name}","${item.email}","${item.course_name}"`)
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Enrolled_Students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    addToast('Student enrollment roster exported to CSV successfully.', 'success', 'Export Complete');
  };

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
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
            <ClipboardList className="w-4 h-4" /> Enrollment Roster
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Registered Students</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            View confirmed student course registrations and official records.
          </p>
        </div>

        {/* Export Roster Button */}
        <button
          onClick={handleExportCSV}
          className="gradient-purple-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Roster CSV</span>
        </button>
      </div>

      {/* Roster Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Enrolled Students</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{enrolled.length} Registrations</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Status Verification</p>
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">100% Confirmed</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Semester Period</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fall 2026</h3>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="glass-card p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by student name, email ID, or registered course..."
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

      {/* Roster Table */}
      {loading ? (
        <TableSkeleton rows={6} cols={3} />
      ) : filteredEnrolled.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800">
          <ClipboardList className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No enrollment records found</h3>
          <p className="text-sm text-slate-500 mt-1">There are no registered students matching your search criteria.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" id="enrolledtable">
              <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Enrolled Course</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredEnrolled.map((student, idx) => (
                  <tr key={student.id || idx} className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {student.name ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'ST'}
                      </div>
                      <span>{student.name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {student.email}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold text-xs border border-purple-200 dark:border-purple-800/60 inline-flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        {student.course_name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Enrolled
                      </span>
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
