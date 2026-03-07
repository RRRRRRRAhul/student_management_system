import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ApplicationList from "../../pages/admin/ApplicationList";
import { MemoryRouter } from "react-router-dom";

function renderApplicationList() {
  const applicationsReducer = () => ({
    applications: [
      {
        id: 1,
        full_name: "Rahul",
        email: "rahul@test.com",
        course_name: "BCA",
        status: "approved",
      },
    ],
    loading: false,
    error: "Sorry can't fetch",
  });

  const store = configureStore({
    reducer: {
      application: applicationsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ApplicationList />
      </MemoryRouter>
    </Provider>,
  );
}

describe("applications list testing", () => {
  it.skip("Check if the application data appears in the table.", () => {
    renderApplicationList();
    expect(screen.getByText("Rahul")).toBeInTheDocument();
  });

  it.skip("Check Approve/Reject buttons appear for pending", () => {
    renderApplicationList();
    const aprrove_btn = screen.getByRole("button", {name: "Approve"});
    const reject_btn = screen.getByRole("button", {name: "Reject"})
    expect(aprrove_btn).toBeInTheDocument();
    expect(reject_btn).toBeInTheDocument();
  })

  it.skip("Check Approved status shows correct UI", () => {
    renderApplicationList();
    const approved_text = screen.getByText("Approved");
    expect(approved_text).toBeInTheDocument();
  })

  it("Check empty state message appears", () => {
    renderApplicationList();
    const error_text = screen.getByText("Error: Sorry can't fetch")
    expect(error_text).toBeInTheDocument();
  })
  
});
