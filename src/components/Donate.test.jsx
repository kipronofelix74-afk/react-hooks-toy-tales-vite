
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../components/App";

describe("Deleting a Toy", () => {
  it("removes the toy when donate button is clicked", async () => {
    global.setFetchResponse(global.baseToys);

    const { findByText, getAllByText, queryByText } = render(<App />);

    // Confirm Woody is displayed
    await findByText("Woody");

    // Click the first Donate button (Woody's card)
    const donateButton = getAllByText("Donate to GoodWill")[0];
    fireEvent.click(donateButton);

    // Confirm Woody has been removed
    await waitFor(() => {
      expect(queryByText("Woody")).not.toBeInTheDocument();
    });
  });
});
