import { render, screen } from "@testing-library/react";
import App from "./App.tsx";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(
    /Type your search request here/i
  );
  expect(linkElement).toBeInTheDocument();
});
