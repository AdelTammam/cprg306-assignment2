/*
 * ============================================================
 * File:        StudentCard.tsx
 * Component:   StudentCard  ·  (Server-compatible; rendered in client boundary)
 * Date:        June 14, 2025
 * Description:
 *   Displays a single student's record as a styled card. Shows
 *   the student's full name, ID, date of birth, calculated age,
 *   and current grade as a colour-coded badge.
 *
 *   Inputs:     A Student object (id, firstName, lastName,
 *               dateOfBirth, grade) passed as a prop.
 *   Processing: Calculates the student's age from dateOfBirth.
 *               Selects a Tailwind colour pair for the grade badge
 *               based on the grade number. Formats the DOB string
 *               for human-readable display.
 *   Outputs:    A <div> card showing the student's details with
 *               hover shadow and border effects.
 * ============================================================
 */

import { Student } from '@/types/student';

// ── Types ─────────────────────────────────────────────────────

interface StudentCardProps {
  /** The student record to render. */
  student: Student;
}

// ── Helpers ───────────────────────────────────────────────────

/**
 * Returns Tailwind colour classes for the grade badge.
 * Uses the low-shade background / high-shade text pattern taught
 * in the Tailwind lecture (Colours & Backgrounds slide).
 *
 * @param grade - Grade string such as "Grade 9" or "Kindergarten"
 * @returns A space-separated string of Tailwind classes
 */
function getGradeBadgeClasses(grade: string): string {
  if (grade === 'Kindergarten') return 'bg-yellow-100 text-yellow-800';
  const num = parseInt(grade.replace('Grade ', ''), 10);
  if (num <= 3)  return 'bg-green-100  text-green-800';
  if (num <= 6)  return 'bg-blue-100   text-blue-800';
  if (num <= 9)  return 'bg-indigo-100 text-indigo-800';
  return                 'bg-purple-100 text-purple-800';
}

/**
 * Calculates a person's age in whole years from their date of birth.
 *
 * @param dateOfBirth - ISO date string in YYYY-MM-DD format
 * @returns Current age in complete years
 */
function calculateAge(dateOfBirth: string): number {
  const today     = new Date();
  const birthDate = new Date(dateOfBirth + 'T00:00:00');
  let age         = today.getFullYear() - birthDate.getFullYear();
  const notHadBirthdayYet =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
     today.getDate()  < birthDate.getDate());
  if (notHadBirthdayYet) age--;
  return age;
}

/**
 * Formats an ISO date string for human-readable display.
 * Uses the 'en-CA' locale to ensure consistent server/client output.
 *
 * @param dateString - ISO date string in YYYY-MM-DD format
 * @returns Formatted string such as "March 15, 2010"
 */
function formatDate(dateString: string): string {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-CA', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

// ── Component ─────────────────────────────────────────────────

/**
 * StudentCard — Server-compatible component.
 *
 * Renders all details for one student in a card layout. No hooks
 * or event handlers — pure props-to-JSX mapping.
 * Follows the Campus Hub card pattern from the Tailwind lecture:
 *   bg-white rounded-xl border border-gray-200 p-6 shadow-sm
 *
 * @param student - The student record to display
 */
export default function StudentCard({ student }: StudentCardProps) {
  const age         = calculateAge(student.dateOfBirth);
  const badgeClasses = getGradeBadgeClasses(student.grade);

  return (
    <article
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm
                 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
      aria-label={`Student card for ${student.firstName} ${student.lastName}`}
    >
      {/* ── Header row: name + grade badge ────────────── */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          {/* group-hover pattern from lecture slide 16 */}
          <h3 className="text-lg font-semibold text-gray-900
                         group-hover:text-blue-700 transition-colors duration-200">
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            ID: {student.id}
          </p>
        </div>

        {/* Colour-coded grade badge */}
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClasses}`}>
          {student.grade}
        </span>
      </div>

      {/* ── Student detail rows ────────────────────────── */}
      <dl className="space-y-2.5 text-sm border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <dt className="text-gray-500 font-medium">Date of Birth</dt>
          <dd className="text-gray-700 text-xs font-mono">
            {formatDate(student.dateOfBirth)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-gray-500 font-medium">Age</dt>
          <dd className="text-gray-700">{age} yrs</dd>
        </div>
      </dl>
    </article>
  );
}
