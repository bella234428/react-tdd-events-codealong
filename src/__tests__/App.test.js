import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Test the initial state of the page
test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  expect(screen.getAllByRole("listitem").length).toBe(1);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

// Test the effect of clicking the checkbox
test("checkbox appears as checked when user clicks it", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("topping appears in toppings list when checked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(screen.getAllByRole("listitem").length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();
});

test("selected topping disappears when checked a second time", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni); // First click → checked
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  userEvent.click(addPepperoni); // Second click → unchecked
  expect(addPepperoni).not.toBeChecked();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});
