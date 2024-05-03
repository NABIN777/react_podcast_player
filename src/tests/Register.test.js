import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Register from "./Register"; // Adjust the path to the actual location of your Register component

jest.mock("axios"); // Mock axios to control its behavior in tests

describe("Register component", () => {
  it("submits registration form successfully", async () => {
    const mockResponse = {
      data: {
        // Mock the response data you expect from the server
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    render(<Register />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("User Name"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() =>
      expect(screen.getByText("Registeration Successful !")).toBeInTheDocument()
    );

    // You can add more assertions as needed
  });

  // You can add more test cases for error scenarios, loading states, etc.
});
