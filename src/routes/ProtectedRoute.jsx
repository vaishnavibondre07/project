import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please login first!"); // triggers only once
    return <Navigate to="/login" />; // immediately redirect
  }

  return children; // render page if logged in
};

export default ProtectedRoute;