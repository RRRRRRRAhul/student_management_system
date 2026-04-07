import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CourseCreate from "../../pages/admin/CourseCreate";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// mock reducers
const mockStudents = [
  { id: 1, name: "Rahul", status: "active" },
  { id: 2, name: "Amit", status: "inactive" },
];

const mockCourses = [
  { id: 1, name: "BCA" },
  { id: 2, name: "MCA" },
];

const mockApplications = [{ id: 1 }, { id: 2 }, { id: 3 }];

// fake reducers
const studentsReducer = () => ({
  students: mockStudents,
});

const coursesReducer = () => ({
  courses: mockCourses,
});

const applicationsReducer = () => ({
  applications: mockApplications,
});

export function renderWithStore() {
  const store = configureStore({
    reducer: {
      students: studentsReducer,
      course: coursesReducer,
      application: applicationsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <CourseCreate />
    </Provider>,
  );
}

describe('course create page testing', () => { 
    it("renders the form fields and submit button", () => {
        renderWithStore();

        const name_label = screen.getByLabelText("Course Name");
        const code_label = screen.getByLabelText("Course Code");
        const duration_label = screen.getByLabelText("Course Duration");
        const submit_btn = screen.getByRole("button", { name: /save course/i });

        expect(name_label).toBeInTheDocument();
        expect(code_label).toBeInTheDocument();
        expect(duration_label).toBeInTheDocument();
        expect(submit_btn).toBeInTheDocument();
    })
 })