import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import AvailableCourses from './pages/AvailableCourses';
import EnrolledCourses from './pages/EnrolledCourses';
import RegisterCourse from './pages/RegisterCourse';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Navbar />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<AvailableCourses />} />
            <Route path="/enrolled" element={<EnrolledCourses />} />
            <Route path="/register" element={<RegisterCourse />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
