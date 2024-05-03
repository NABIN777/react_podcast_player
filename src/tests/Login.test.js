import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Login from "./Login"; // Adjust the path to the actual location of your Login component

jest.mock("axios"); // Mock axios to control its behavior in tests

describe("Login component", () => {
  it("submits login form successfully", async () => {
    const mockResponse = {
      data: {
        token: "mockToken", // Mock the token you expect from the server
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() =>
      expect(screen.getByText("Login Successful !")).toBeInTheDocument()
    );

    // You can add more assertions as needed
  });

  // You can add more test cases for error scenarios, loading states, etc.
});
