import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import { GitHubIssueDetail } from "./pages/GitHubIssueDetail";
import { AppContextProvider } from "./contexts/AppContext";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/issues/:issueId" element={<GitHubIssueDetail />} />
      </Routes>
    </AppContextProvider>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
