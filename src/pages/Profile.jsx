const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-red-500 font-semibold text-lg">
            Please login first
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-gray-100 p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold mt-4 text-gray-800 capitalize">
            {user.username}
          </h1>

          <p className="text-sm text-gray-500">
            Welcome back 👋
          </p>
        </div>

        {/* Info Cards */}
        <div className="mt-6 space-y-4">

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
            <span className="text-gray-500 text-sm">Username</span>
            <span className="font-medium text-gray-800">
              {user.username}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
            <span className="text-gray-500 text-sm">Email</span>
            <span className="font-medium text-gray-800">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
            <span className="text-gray-500 text-sm">Phone</span>
            <span className="font-medium text-gray-800">
              {user.phone}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;


// const Profile = () => {

//   const user = JSON.parse(localStorage.getItem("user"));

//   // If no user logged in
//   if (!user) {
//     return (
//       <div className="text-center mt-10 text-red-500">
//         <h2>Please login first</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
//           Profile
//         </h2>

//         <div className="space-y-3 text-gray-700">
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phone}</p>
//           {/* <p><strong>Password:</strong> {user.password}</p> */}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;