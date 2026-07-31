import React from 'react';

export function TableSkeleton({ rows = 4, cols = 4 }) {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-8 bg-slate-100 dark:bg-slate-800/60 rounded-lg flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-48 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-300 dark:bg-slate-700" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2" />
            </div>
          </div>
          <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-xl w-full mt-4" />
        </div>
      ))}
    </div>
  );
}
