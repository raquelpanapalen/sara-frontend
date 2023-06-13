import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { RequireToken } from "./components/Auth";
import "./style/App.css";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={
              <RequireToken>
                <Dashboard />
              </RequireToken>
            }
          />
        </Routes>
        <div className="footer">
          <span>Made with 💙 by rachel</span>
        </div>
      </div>
    </>
  );
}
