/*
 * ============================================================
 * File:        Navbar.tsx
 * Component:   Navbar  ·  Server Component
 * Date:        June 14, 2025
 * Description:
 *   Static navigation bar for the New Generation High School
 *   student portal. Displays the school brand on the left and
 *   primary anchor links on the right. Sticks to the top of
 *   the viewport so it remains visible while scrolling.
 *
 *   Inputs:     None — this is a fully static component with no
 *               props or external data dependencies.
 *   Processing: Renders the school logo mark, name, and nav links
 *               using Tailwind flex utilities following the Campus
 *               Hub pattern (flex items-center justify-between).
 *   Outputs:    A <header> element containing the sticky navbar.
 * ============================================================
 */

// ── Component ─────────────────────────────────────────────────

/**
 * Navbar — Server Component.
 *
 * A fully static sticky navigation bar. Rendered on the server
 * and sent as HTML — no JavaScript bundle cost for this component.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

        {/* ── School brand ─────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Logo mark: initial "N" in a blue square */}
          <div
            className="w-9 h-9 bg-blue-600 rounded-lg grid place-items-center
                       text-white font-black text-base select-none"
            aria-hidden="true"
          >
            N
          </div>

          {/* School name — two-line stacked layout */}
          <div className="leading-tight">
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              New Generation
            </p>
            <p className="text-xs text-blue-600 font-medium">
              High School
            </p>
          </div>
        </div>

        {/* ── Navigation links ─────────────────────────── */}
        <nav
          className="flex items-center gap-4 sm:gap-6"
          aria-label="Main navigation"
        >
          <a
            href="#students"
            className="text-sm font-medium text-gray-600 hover:text-blue-600
                       transition-colors duration-200"
          >
            Students
          </a>
          <a
            href="#add-student"
            className="text-sm font-medium text-gray-600 hover:text-blue-600
                       transition-colors duration-200"
          >
            Add Student
          </a>

          {/* Admin badge — hidden on small screens to save space */}
          <span
            className="hidden sm:inline-flex text-xs font-semibold
                       bg-blue-600 text-white px-3 py-1.5 rounded-full"
          >
            Admin Portal
          </span>
        </nav>

      </div>
    </header>
  );
}
