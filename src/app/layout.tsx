/*
 * ============================================================
 * File:        layout.tsx
 * Date:        June 14, 2025
 * Description:
 *   Root layout for the New Generation High School student
 *   portal. Wraps every route with the outer HTML document
 *   structure, page metadata, and global Tailwind CSS import.
 *
 *   Inputs:     The rendered page content (children prop).
 *   Processing: Applies the <html> and <body> tags with a
 *               consistent gray-50 background and antialiased
 *               text rendering. Exports metadata consumed by
 *               Next.js for <title> and <meta description>.
 *   Outputs:    A complete HTML document shell wrapping the
 *               page component passed as children.
 * ============================================================
 */

import type { Metadata } from 'next';
import './globals.css';

// ── Page metadata ─────────────────────────────────────────────

/** SEO metadata applied to every page in the application. */
export const metadata: Metadata = {
  title: 'New Generation High School — Student Portal',
  description:
    'Administrator portal for New Generation High School. ' +
    'View enrolled students and add new student records.',
};

// ── Types ─────────────────────────────────────────────────────

interface RootLayoutProps {
  /** The active page component rendered by Next.js routing. */
  children: React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────

/**
 * RootLayout — Server Component.
 *
 * The outermost layout wrapping every page. Next.js renders this
 * once and keeps it mounted across client-side navigations.
 *
 * @param children - The page content to render inside the body
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}
