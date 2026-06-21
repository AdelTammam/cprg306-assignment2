/*
 * ============================================================
 * File:        student.ts
 * Date:        June 14, 2025
 * Description:
 *   TypeScript type definitions for the New Generation High
 *   School student portal. Defines the Student entity and all
 *   supporting types used by the form and validation logic.
 *
 *   Inputs:     N/A — this is a type definition module.
 *   Processing: Declares interfaces and constants shared across
 *               components: Student, StudentFormData, FormErrors,
 *               and the GRADE_OPTIONS lookup array.
 *   Outputs:    Exported types consumed by components and the
 *               students.json data file.
 * ============================================================
 */

// ── Core entity ───────────────────────────────────────────────

/** Represents a single student record in the portal. */
export interface Student {
  /** Unique student identifier (e.g., "S001"). */
  id: string;
  /** Student's legal first name. */
  firstName: string;
  /** Student's legal last name. */
  lastName: string;
  /** Date of birth in ISO 8601 format (YYYY-MM-DD). */
  dateOfBirth: string;
  /** Current enrolled grade level (e.g., "Grade 9", "Kindergarten"). */
  grade: string;
}

// ── Form types ────────────────────────────────────────────────

/**
 * Form field values collected before a Student ID is assigned.
 * Mirrors the Student interface minus the generated `id` field.
 */
export interface StudentFormData {
  firstName:   string;
  lastName:    string;
  dateOfBirth: string;
  grade:       string;
}

/**
 * Validation error messages keyed by field name.
 * Only fields with errors will have a value set.
 */
export interface FormErrors {
  firstName?:   string;
  lastName?:    string;
  dateOfBirth?: string;
  grade?:       string;
}

// ── Constants ─────────────────────────────────────────────────

/**
 * All valid grade levels available for selection in the form.
 * Matches the Canadian K–12 school system.
 */
export const GRADE_OPTIONS: readonly string[] = [
  'Kindergarten',
  'Grade 1',  'Grade 2',  'Grade 3',
  'Grade 4',  'Grade 5',  'Grade 6',
  'Grade 7',  'Grade 8',  'Grade 9',
  'Grade 10', 'Grade 11', 'Grade 12',
] as const;
