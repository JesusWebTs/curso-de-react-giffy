import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("Homework as espected", async () => {
  const { findByText } = render(<App />);
  const title = await findByText(/Última búsqueda/i);
  expect(title).toBeInTheDocument();
});
