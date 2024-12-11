import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CategoryProvider } from "./context/CategoryContext";  // Import the CategoryProvider

ReactDOM.render(
  <CategoryProvider>
    <App />
  </CategoryProvider>,
  document.getElementById("root")
);
