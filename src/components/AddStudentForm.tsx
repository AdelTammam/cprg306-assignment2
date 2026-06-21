/*
 * ============================================================
 * File:        AddStudentForm.tsx
 * Component:   AddStudentForm  ·  Client Component
 * Date:        June 14, 2025
 * Description:
 *   Interactive form for adding a new student to the portal.
 *   Validates all fields on submission and displays inline error
 *   messages next to invalid inputs. Resets itself and shows a
 *   success banner after a valid entry is added.
 *
 *   Inputs:     User-typed first name, last name, date of birth,
 *               and grade level selected from a dropdown.
 *   Processing: On submission, runs validateForm() which checks:
 *               — First/last name: required, 2–50 chars, letters
 *                 only (with spaces, hyphens, apostrophes allowed).
 *               — Date of birth: required, not in the future,
 *                 student must be between 4 and 21 years old.
 *               — Grade: required, must be a valid GRADE_OPTION.
 *               If validation passes, a Student record is built
 *               with a generated ID and passed to onAddStudent.
 *               Individual field errors are cleared as the user
 *               corrects them (onChange handler).
 *   Outputs:    Calls onAddStudent(student) with a validated
 *               Student object. Shows a success banner for 5 s
 *               and resets all fields to their empty defaults.
 * ============================================================
 */

'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import {
  Student,
  StudentFormData,
  FormErrors,
  GRADE_OPTIONS,
} from '@/types/student';

// ── Types ─────────────────────────────────────────────────────

interface AddStudentFormProps {
  /** Callback invoked with the new record when the form is valid. */
  onAddStudent: (student: Student) => void;
  /** Total number of students currently in the list (for ID generation). */
  studentCount: number;
}

// ── Constants ─────────────────────────────────────────────────

/** Pattern: letters, spaces, hyphens, and apostrophes only. */
const NAME_PATTERN = /^[a-zA-Z\s'-]+$/;

/** Minimum and maximum student ages accepted by the form. */
const MIN_AGE = 4;
const MAX_AGE = 21;

/** Empty form used for initialisation and post-submit reset. */
const EMPTY_FORM: StudentFormData = {
  firstName:   '',
  lastName:    '',
  dateOfBirth: '',
  grade:       '',
};

// ── Validation ────────────────────────────────────────────────

/**
 * Validates every field in the form data object.
 * Returns an object of error messages keyed by field name.
 * An empty return value means all fields are valid.
 *
 * @param data - Current form field values
 * @returns FormErrors object (empty if all valid)
 */
function validateForm(data: StudentFormData): FormErrors {
  const errors: FormErrors = {};

  // ── First name ─────────────────────────────────────
  const first = data.firstName.trim();
  if (!first) {
    errors.firstName = 'First name is required.';
  } else if (first.length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  } else if (first.length > 50) {
    errors.firstName = 'First name must be 50 characters or fewer.';
  } else if (!NAME_PATTERN.test(first)) {
    errors.firstName =
      'First name may only contain letters, spaces, hyphens, or apostrophes.';
  }

  // ── Last name ──────────────────────────────────────
  const last = data.lastName.trim();
  if (!last) {
    errors.lastName = 'Last name is required.';
  } else if (last.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  } else if (last.length > 50) {
    errors.lastName = 'Last name must be 50 characters or fewer.';
  } else if (!NAME_PATTERN.test(last)) {
    errors.lastName =
      'Last name may only contain letters, spaces, hyphens, or apostrophes.';
  }

  // ── Date of birth ──────────────────────────────────
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  } else {
    const today     = new Date();
    const birthDate = new Date(data.dateOfBirth + 'T00:00:00');

    if (isNaN(birthDate.getTime())) {
      errors.dateOfBirth = 'Please enter a valid date.';
    } else if (birthDate > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
    } else {
      // Calculate exact age in years
      let age = today.getFullYear() - birthDate.getFullYear();
      const notHadBirthdayYet =
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
         today.getDate()  < birthDate.getDate());
      if (notHadBirthdayYet) age--;

      if (age < MIN_AGE) {
        errors.dateOfBirth = `Student must be at least ${MIN_AGE} years old.`;
      } else if (age > MAX_AGE) {
        errors.dateOfBirth = `Student must be ${MAX_AGE} years old or younger.`;
      }
    }
  }

  // ── Grade ──────────────────────────────────────────
  if (!data.grade) {
    errors.grade = 'Please select a grade level.';
  } else if (!(GRADE_OPTIONS as readonly string[]).includes(data.grade)) {
    errors.grade = 'Please select a valid grade level from the list.';
  }

  return errors;
}

// ── ID generation ─────────────────────────────────────────────

/**
 * Generates a sequential student ID string.
 *
 * @param count - Current number of students
 * @returns A zero-padded ID like "S006"
 */
function generateId(count: number): string {
  return `S${String(count + 1).padStart(3, '0')}`;
}

// ── Shared input className helper ─────────────────────────────

/**
 * Returns the Tailwind class string for a form input or select,
 * switching to red ring/border when the field has an error.
 *
 * @param hasError - Whether this field currently has a validation error
 */
function inputClasses(hasError: boolean): string {
  const base =
    'w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white ' +
    'transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400';
  return hasError
    ? `${base} border-red-400 focus:border-red-400 focus:ring-red-200`
    : `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;
}

// ── Component ─────────────────────────────────────────────────

/**
 * AddStudentForm — Client Component ('use client').
 *
 * Manages its own controlled form state, validates inputs on
 * submission, and delegates the resulting Student record to the
 * parent StudentPortal component via the onAddStudent callback.
 *
 * @param onAddStudent  - Callback to add a valid student to the list
 * @param studentCount  - Current list length (used for ID generation)
 */
export default function AddStudentForm({
  onAddStudent,
  studentCount,
}: AddStudentFormProps) {

  // ── State ──────────────────────────────────────────
  const [formData, setFormData]     = useState<StudentFormData>(EMPTY_FORM);
  const [errors, setErrors]         = useState<FormErrors>({});
  const [successName, setSuccessName] = useState<string>('');

  // ── Handlers ───────────────────────────────────────

  /**
   * Syncs form field value to state and clears that field's
   * error message as soon as the user starts correcting it.
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear only the changed field's error (others remain visible)
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Validates all fields on submit. If valid, builds the Student
   * record, notifies the parent, and resets the form.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      // Show all errors at once so the user can correct them together
      setErrors(validationErrors);
      return;
    }

    // Build validated student record
    const newStudent: Student = {
      id:          generateId(studentCount),
      firstName:   formData.firstName.trim(),
      lastName:    formData.lastName.trim(),
      dateOfBirth: formData.dateOfBirth,
      grade:       formData.grade,
    };

    // Notify parent, reset form, show success banner
    onAddStudent(newStudent);
    setSuccessName(`${newStudent.firstName} ${newStudent.lastName}`);
    setFormData(EMPTY_FORM);
    setErrors({});

    // Auto-dismiss success banner after 5 seconds
    setTimeout(() => setSuccessName(''), 5000);
  };

  /** Clears all fields and errors without submitting. */
  const handleClear = (): void => {
    setFormData(EMPTY_FORM);
    setErrors({});
  };

  // ── Render ─────────────────────────────────────────
  return (
    <section id="add-student" aria-label="Add new student" className="mb-12">

      {/* Section heading */}
      <h2 className="text-xl font-bold text-gray-900 mb-5">Add New Student</h2>

      {/* ── Success banner (auto-dismisses) ──────────── */}
      {successName && (
        <div
          className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200
                     text-green-800 rounded-xl px-5 py-4 text-sm font-medium"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">✅</span>
          <span>
            <strong>{successName}</strong> has been added to the student list.
          </span>
        </div>
      )}

      {/* ── Form card ────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Add new student form"
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* ── First Name ─────────────────────────── */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              First Name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Jane"
              autoComplete="given-name"
              maxLength={50}
              className={inputClasses(!!errors.firstName)}
              aria-describedby={errors.firstName ? 'error-firstName' : undefined}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p id="error-firstName" role="alert" className="mt-1.5 text-xs text-red-600 flex items-start gap-1">
                <span aria-hidden="true">⚠</span>
                {errors.firstName}
              </p>
            )}
          </div>

          {/* ── Last Name ──────────────────────────── */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Last Name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Smith"
              autoComplete="family-name"
              maxLength={50}
              className={inputClasses(!!errors.lastName)}
              aria-describedby={errors.lastName ? 'error-lastName' : undefined}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p id="error-lastName" role="alert" className="mt-1.5 text-xs text-red-600 flex items-start gap-1">
                <span aria-hidden="true">⚠</span>
                {errors.lastName}
              </p>
            )}
          </div>

          {/* ── Date of Birth ──────────────────────── */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Date of Birth <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={inputClasses(!!errors.dateOfBirth)}
              aria-describedby={errors.dateOfBirth ? 'error-dateOfBirth' : undefined}
              aria-invalid={!!errors.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <p id="error-dateOfBirth" role="alert" className="mt-1.5 text-xs text-red-600 flex items-start gap-1">
                <span aria-hidden="true">⚠</span>
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* ── Grade Level ────────────────────────── */}
          <div>
            <label
              htmlFor="grade"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Grade Level <span className="text-red-500" aria-label="required">*</span>
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className={inputClasses(!!errors.grade)}
              aria-describedby={errors.grade ? 'error-grade' : undefined}
              aria-invalid={!!errors.grade}
            >
              <option value="">— Select grade —</option>
              {GRADE_OPTIONS.map((g: string) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.grade && (
              <p id="error-grade" role="alert" className="mt-1.5 text-xs text-red-600 flex items-start gap-1">
                <span aria-hidden="true">⚠</span>
                {errors.grade}
              </p>
            )}
          </div>

        </div>

        {/* Required field legend */}
        <p className="mt-4 text-xs text-gray-400">
          Fields marked <span className="text-red-500 font-semibold">*</span> are required.
        </p>

        {/* ── Action buttons ───────────────────────────── */}
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold text-sm rounded-lg transition-all duration-200
                       active:scale-95 focus:outline-none focus:ring-2
                       focus:ring-blue-500/40 cursor-pointer"
          >
            Add Student
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2.5 text-sm font-medium text-gray-600
                       hover:text-gray-900 border border-gray-300
                       hover:border-gray-400 rounded-lg
                       transition-all duration-200 cursor-pointer"
          >
            Clear
          </button>
        </div>

      </form>
    </section>
  );
}
