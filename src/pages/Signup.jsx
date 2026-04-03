import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (username.length < 4) {
      setError("Username must be at least 4 letters");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setError("Phone must be 10 digits");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = { 
                   username, 
                   email, 
                   phone, 
                   password,
                   isLoggedIn: false
                };
    


    localStorage.setItem("user", JSON.stringify(user));  

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Signup
        </h2>

        <div className="mb-4">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Signup
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-purple-700 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;