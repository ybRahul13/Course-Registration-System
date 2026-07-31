import React, { useState } from 'react';
import { GraduationCap, Mail, ShieldCheck, HelpCircle, X, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span>© 2026 Course Registration System</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500">Apex University Portal</span>
          </div>

          {/* Quick Footer Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setActiveModal('contact')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              Contact
            </button>

            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Privacy Policy
            </button>

            <button
              onClick={() => setActiveModal('help')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-purple-500" />
              Help Center
            </button>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'contact' && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Registrar's Office Contact</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
                  Have questions about your semester enrollment or academic credits?
                </p>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Student Support Desk</span>
                    <span className="text-slate-500 text-xs">registrar@apex.university.edu</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Helpline Hours</span>
                    <span className="text-slate-500 text-xs">Mon – Fri: 9:00 AM – 5:00 PM EST</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Privacy & Data Governance</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  The Apex University Course Registration System safeguards your academic record in accordance with FERPA and institutional data standards. Student enrollment data is restricted exclusively to faculty advisors and accredited administration.
                </p>
              </div>
            )}

            {activeModal === 'help' && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Course Registration FAQs</h3>
                <div className="space-y-3 mt-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Q: How do I drop an enrolled course?</span>
                    <span>Submit a request through the Registrar's portal prior to the drop deadline.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Q: What is the maximum credit limit per semester?</span>
                    <span>Standard full-time enrollment allows up to 18 total credits per semester.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
