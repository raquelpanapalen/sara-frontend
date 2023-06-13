import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "./Auth";
import axios from "axios";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
  });

  const onLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!username) {
      alert("Username is required");
    } else if (!password) {
      alert("Password is required");
    } else {
      console.log(`${process.env.REACT_APP_API_URL}/login`);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err, "ERROR");
        });
    }
  };

  return (
    <div className="block">
      <h1 className="subtitle">Ready to do some work?</h1>
      <div
        className="card"
        style={{ width: "300px", height: "300px", marginTop: "50px" }}
      >
        <form
          className="form"
          onSubmit={onLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <div>
            <div style={{ marginBottom: "20px" }}>
              <label>Username: </label>
              <input type="text" name="username" style={{ width: "100%" }} />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className="button" style={{ width: "70%" }}>
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
