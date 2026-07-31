import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerForCourse, fetchAvailableCourses } from '../services/api';
import { useToast } from '../context/ToastContext';
import { BookOpen, User, Mail, Sparkles, CheckCircle2, ShieldCheck, ArrowLeft, Loader2, Info } from 'lucide-react';

export default function RegisterCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    course_name: location.state?.courseName || 'Java Essentials',
  });

  const [availableCourses, setAvailableCourses] = useState([
    'Java Essentials',
    'Python for ML',
    'Spring Boot',
    'C Programming',
  ]);

  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    async function loadCourseOptions() {
      const res = await fetchAvailableCourses();
      if (res.data && res.data.length > 0) {
        const names = res.data.map(c => c.courseName).filter(Boolean);
        const combined = Array.from(new Set([...names, 'Java Essentials', 'Python for ML', 'Spring Boot', 'C Programming']));
        setAvailableCourses(combined);
      }
    }
    loadCourseOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.course_name) {
      addToast('Please complete all form fields before submitting.', 'error', 'Form Error');
      return;
    }

    setLoading(true);
    setSubmittedMessage('');

    try {
      const result = await registerForCourse(formData.name, formData.email, formData.course_name);
      if (result.success) {
        setSubmittedMessage(result.message);
        addToast(result.message, 'success', 'Enrollment Successful! 🎉');
      } else {
        addToast('Registration failed. Please check backend connection.', 'error', 'Error');
      }
    } catch (err) {
      addToast(err.message || 'An unexpected error occurred.', 'error', 'Submission Failed');
    } finally {
      setLoading(false);
    }
  };

  // Preset Course Specs for interactive right preview card
  const getCourseSpecs = (name) => {
    switch (name) {
      case 'Java Essentials':
        return { code: 'CS101', instructor: 'Dr. Robert Vance', credits: 4, duration: '12 Weeks', level: 'Beginner' };
      case 'Python for ML':
        return { code: 'CS204', instructor: 'Prof. Sophia Chen', credits: 4, duration: '14 Weeks', level: 'Intermediate' };
      case 'Spring Boot':
        return { code: 'CS302', instructor: 'Dr. Michael Scott', credits: 3, duration: '10 Weeks', level: 'Advanced' };
      case 'C Programming':
        return { code: 'CS102', instructor: 'Prof. Alan Turing', credits: 3, duration: '8 Weeks', level: 'Beginner' };
      default:
        return { code: 'CS100', instructor: 'Faculty Instructor', credits: 3, duration: '12 Weeks', level: 'General' };
    }
  };

  const selectedSpecs = getCourseSpecs(formData.course_name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-12"
    >
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Previous
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" /> Course Registration Form
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Semester Enrollment</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Select your course and enter your student credentials to finalize registration.
        </p>
      </div>

      {/* Main Grid: Form + Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Card */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft-lg">
          
          <form onSubmit={handleSubmit} className="space-y-6" action="http://localhost:8080/course/register" method="post">
            
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" /> Enter your name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Alex Johnson"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-all"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600" /> Enter your emailId:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. alex.johnson@university.edu"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-all"
              />
            </div>

            {/* Course Select Dropdown */}
            <div>
              <label htmlFor="course" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" /> Choose a Course
              </label>
              <select
                id="course"
                name="course_name"
                value={formData.course_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-all cursor-pointer"
              >
                {availableCourses.map((courseName) => (
                  <option key={courseName} value={courseName} className="bg-white dark:bg-slate-900 py-2">
                    {courseName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary-btn py-3.5 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 transition-all mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Enrollment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Submit Registration</span>
                </>
              )}
            </button>
          </form>

          {/* Success Banner */}
          {submittedMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Registration Success</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">{submittedMessage}</p>
                <div className="mt-3">
                  <button
                    onClick={() => navigate('/enrolled')}
                    className="text-xs font-bold text-emerald-800 dark:text-emerald-200 underline hover:text-emerald-950"
                  >
                    View in Enrolled Roster →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Selection Preview
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                {selectedSpecs.code}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {formData.course_name}
            </h3>

            <div className="space-y-3 my-6 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Instructor:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSpecs.instructor}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Academic Credits:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedSpecs.credits} Credits</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Course Duration:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSpecs.duration}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Skill Level:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSpecs.level}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>Direct backend sync to Spring Boot REST Endpoint (`/course/register`).</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
