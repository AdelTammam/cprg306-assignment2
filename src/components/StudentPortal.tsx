/*
 * ============================================================
 * File:        StudentPortal.tsx
 * Component:   StudentPortal  ·  Client Component
 * Date:        June 14, 2025
 * Description:
 *   Top-level interactive component that owns the mutable
 *   student list state. Receives the initial five students
 *   from the server-rendered page.tsx and allows new students
 *   to be appended via the AddStudentForm component.
 *
 *   Inputs:     initialStudents — the seed array of 5 Student
 *               records loaded from students.json on the server
 *               and passed as a prop.
 *   Processing: Initialises React state with initialStudents.
 *               Exposes an addStudent callback that appends a new
 *               Student to the array via the functional setState
 *               pattern (prev => [...prev, newStudent]).
 *               Passes the live students array down to StudentList
 *               and the addStudent callback down to AddStudentForm.
 *   Outputs:    Renders StudentList (read view) and AddStudentForm
 *               (write view) as consecutive sections of the portal.
 * ============================================================
 */

'use client';

import { useState } from 'react';
import { Student }   from '@/types/student';
import StudentList   from './StudentList';
import AddStudentForm from './AddStudentForm';

// ── Types ─────────────────────────────────────────────────────

interface StudentPortalProps {
  /** Seed student data passed from the Server Component page. */
  initialStudents: Student[];
}

// ── Component ─────────────────────────────────────────────────

/**
 * StudentPortal — Client Component ('use client').
 *
 * Acts as the "state owner" for the student list, bridging the
 * static server-rendered initial data with the interactive form
 * that allows new entries to be added at runtime.
 *
 * @param initialStudents - The seed array from students.json
 */
export default function StudentPortal({ initialStudents }: StudentPortalProps) {

  // ── State: full mutable student list ──────────────────
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // ── Handlers ──────────────────────────────────────────

  /**
   * Appends a new validated Student to the list.
   * Uses the functional update form of setState to avoid
   * stale-closure issues if multiple updates occur quickly.
   *
   * @param newStudent - A fully validated Student from AddStudentForm
   */
  const addStudent = (newStudent: Student): void => {
    setStudents(prev => [...prev, newStudent]);
  };

  // ── Render ────────────────────────────────────────────
  return (
    <>
      {/* Student list section — reads from state */}
      <StudentList students={students} />

      {/* Add student form — writes to state via addStudent */}
      <AddStudentForm
        onAddStudent={addStudent}
        studentCount={students.length}
      />
    </>
  );
}
