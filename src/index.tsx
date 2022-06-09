import * as React from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./styles/index.scss"

window.addEventListener("DOMContentLoaded", ():void => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});

export {};