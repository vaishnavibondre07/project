import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const user = JSON.parse(localStorage.getItem("user"));

const handleSubmit = (e) => {
  e.preventDefault();

  if (!user) {
    alert("No user found. Please signup first!");
    return;
  }

  if (user.email === email && user.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful!");
    navigate("/"); // redirect
  } else {
    alert("Invalid credentials!");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-700 cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;