/*
 * ============================================================
 * File:        page.tsx
 * Route:       / (homepage)
 * Component:   HomePage  ·  Server Component
 * Date:        June 14, 2025
 * Description:
 *   Main page of the New Generation High School student portal.
 *   Rendered as a Next.js Server Component — no client JavaScript
 *   bundle cost for this file. Orchestrates the full page layout
 *   by composing Navbar, the interactive StudentPortal, and Footer.
 *
 *   Inputs:     students.json — the static seed list of 5 students
 *               imported at build / request time via resolveJsonModule.
 *   Processing: Casts the JSON import to Student[] and passes it as
 *               the initialStudents prop to StudentPortal. The portal
 *               component takes ownership of the list state from that
 *               point onward, enabling client-side additions without
 *               a network round-trip or full page reload.
 *   Outputs:    A full-page HTML document containing the sticky
 *               Navbar, a hero heading, the StudentPortal (which
 *               renders StudentList + AddStudentForm), and the Footer.
 * ============================================================
 */

import Navbar          from '@/components/Navbar';
import Footer          from '@/components/Footer';
import StudentPortal   from '@/components/StudentPortal';
import initialStudents from '@/data/students.json';
import { Student }     from '@/types/student';

// ── Component ─────────────────────────────────────────────────

/**
 * HomePage — Server Component.
 *
 * The entry point for the "/" route. Loads the seed student data
 * at build/request time and delegates interactive rendering to
 * the StudentPortal client component.
 *
 * Server vs Client component decisions:
 *  - Navbar       → Server: fully static, zero JS needed
 *  - Footer       → Server: fully static, zero JS needed
 *  - StudentPortal → Client: manages live student list state
 *  - StudentList   → rendered inside client boundary (no directive needed)
 *  - StudentCard   → rendered inside client boundary (no directive needed)
 *  - AddStudentForm → Client: controlled form + validation hooks
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Static sticky navigation bar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">

        {/* Page hero heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Student Portal
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            View and manage enrolled students at New Generation High School.
          </p>
        </div>

        {/*
          StudentPortal receives the seed data from the server and
          manages all subsequent additions entirely on the client.
          The cast to Student[] is safe — the JSON shape is guaranteed
          to match the Student interface by design.
        */}
        <StudentPortal initialStudents={initialStudents as Student[]} />

      </main>

      {/* Static footer with school information */}
      <Footer />

    </div>
  );
}
