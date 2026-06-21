/*
 * ============================================================
 * File:        Footer.tsx
 * Component:   Footer  ·  Server Component
 * Date:        June 14, 2025
 * Description:
 *   Static footer for the student portal. Displays the school's
 *   name, address, phone number, email, and portal metadata.
 *   Follows the dark-background footer pattern (bg-gray-900)
 *   taught in the Tailwind CSS lecture (Week 2, Day 1).
 *
 *   Inputs:     None — all content is static. The current year
 *               for the copyright notice is derived server-side
 *               via new Date().getFullYear().
 *   Processing: Renders a 3-column responsive grid (stacked on
 *               mobile, 3 columns on sm+) containing school info,
 *               contact details, and portal metadata.
 *   Outputs:    A <footer> element with school information.
 * ============================================================
 */

// ── Component ─────────────────────────────────────────────────

/**
 * Footer — Server Component.
 *
 * Fully static; rendered once on the server with zero client JS.
 * The copyright year is resolved at request time on the server.
 */
export default function Footer() {
  // Resolved server-side — no hydration mismatch risk
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Three-column grid ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Column 1 — School brand and tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 bg-blue-500 rounded grid place-items-center
                           text-white font-bold text-sm"
                aria-hidden="true"
              >
                N
              </div>
              <span className="font-bold text-white text-sm">
                New Generation High School
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students with the knowledge and skills
              to thrive in tomorrow&apos;s world.
            </p>
          </div>

          {/* Column 2 — Contact information */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm text-gray-400">
              <p>📍 123 Academy Drive, Calgary, AB T2P 1J9</p>
              <p>📞 (403) 555-0192</p>
              <p>✉️ admin@newgenhs.edu</p>
            </address>
          </div>

          {/* Column 3 — Portal metadata */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Student Portal
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Version 1.0.0</li>
              <li>Built with Next.js &amp; TypeScript</li>
              <li>CPRG 306 — Web Development 2</li>
              <li>SAIT {currentYear}</li>
            </ul>
          </div>

        </div>

        {/* ── Divider and copyright ─────────────────────── */}
        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {currentYear} New Generation High School. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
