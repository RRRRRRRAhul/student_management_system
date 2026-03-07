import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AdminDashboard from "../../pages/admin/AdminDashboard";

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
      <AdminDashboard />
    </Provider>,
  );
}

describe("AdminDashboard", () => {
  it("shows correct student count", () => {
    renderWithStore();

    const card = screen.getByText("Total Students").closest("div");

    expect(card).toHaveTextContent("2");
  });

  it("shows correct active students count", () => {
    renderWithStore();

    const card = screen.getByText("Active Students").closest("div")

    expect(card).toHaveTextContent("1");
  })

  it("shows correct courses count", () => {
    renderWithStore();

    const card = screen.getByText("Courses").closest("div")

    expect(card).toHaveTextContent("2");
  })

  it("shows correct applications count", () => {
    renderWithStore();

    const card = screen.getByText("Applications").closest("div")

    expect(card).toHaveTextContent("3");
  })
});
