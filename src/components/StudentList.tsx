/*
 * ============================================================
 * File:        StudentList.tsx
 * Component:   StudentList  ·  (Server-compatible; rendered in client boundary)
 * Date:        June 14, 2025
 * Description:
 *   Renders the complete list of enrolled students as a
 *   responsive card grid. Shows the total enrolment count as
 *   a badge and displays an empty state when no students exist.
 *
 *   Inputs:     students — an array of Student objects passed
 *               down from the StudentPortal client component.
 *   Processing: Maps over the students array and renders a
 *               StudentCard for each entry. Uses a CSS grid
 *               with responsive column counts (1 → 2 → 3).
 *               Renders an empty-state placeholder when the
 *               array is empty.
 *   Outputs:    A labelled <section> containing the grid of
 *               StudentCard components.
 * ============================================================
 */

import { Student } from '@/types/student';
import StudentCard from './StudentCard';

// ── Types ─────────────────────────────────────────────────────

interface StudentListProps {
  /** The array of student records to display. */
  students: Student[];
}

// ── Component ─────────────────────────────────────────────────

/**
 * StudentList — Server-compatible component.
 *
 * Accepts a students array via props and maps each entry to a
 * StudentCard. No local state or event handlers — pure rendering.
 *
 * @param students - Array of Student objects to display
 */
export default function StudentList({ students }: StudentListProps) {
  return (
    <section id="students" aria-label="Enrolled students" className="mb-12">

      {/* ── Section header ───────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Enrolled Students</h2>

        {/* Enrolment count badge */}
        <span
          className="text-xs font-semibold bg-blue-50 text-blue-700
                     px-3 py-1 rounded-full border border-blue-100"
          aria-label={`${students.length} students enrolled`}
        >
          {students.length} {students.length === 1 ? 'student' : 'students'}
        </span>
      </div>

      {/* ── Student grid or empty state ──────────────── */}
      {students.length === 0 ? (
        /* Empty state — shown before any students are added */
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <p className="text-4xl mb-3" aria-hidden="true">🎓</p>
          <p className="text-gray-600 font-semibold">No students enrolled yet.</p>
          <p className="text-gray-400 text-sm mt-1">
            Use the form below to add the first student.
          </p>
        </div>
      ) : (
        /*
         * Responsive card grid — 1 column on mobile, 2 on sm, 3 on lg.
         * Uses gap-5 (20px) matching the Campus Hub course-card grid.
         */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {students.map((student: Student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}

    </section>
  );
}
