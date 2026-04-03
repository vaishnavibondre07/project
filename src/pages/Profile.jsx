import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // const handleLogout = () => {
  //   localStorage.setItem("isLoggedIn", "false");
  //   navigate("/");
  // };

  // If no user logged in
  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        <h2>Please login first</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Profile
        </h2>

        {/* User Info */}
        <div className="space-y-3 text-gray-700">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          {/* <p><strong>Password:</strong> {user.password}</p> */}
        </div>

        {/* Logout Button */}
        {/* <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Profile;