import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("Navbar is rendering", async () => {
    render(<Navbar />);
    // ASSERT
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
});
