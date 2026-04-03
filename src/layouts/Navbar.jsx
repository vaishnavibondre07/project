import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false); // update state so UI changes
      // navigate("/login"); // redirect to login page
    } else {
      // Go to login page
      navigate("/login");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h2
          onClick={() => navigate("/list")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          EasyShop
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Cart ({cartItems.length})
          </button>

          <button
            onClick={handleAuthClick}
            className={`border px-4 py-2 rounded-lg transition duration-300 ${
              isLoggedIn
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();

//   // Check if user is logged in
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   const handleAuthClick = () => {
//     if (isLoggedIn) {
//       // Logout
//       localStorage.setItem("isLoggedIn", "false");
//     } else {
//       // Go to login page
//       navigate("/login");
//     }
//   };

//   return (
//     <nav className="w-full bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <h2
//           onClick={() => navigate("/list")}
//           className="text-2xl font-bold text-blue-600 cursor-pointer"
//         >
//           EasyShop
//         </h2>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Cart ({cartItems.length})
//           </button>

//           <button
//             onClick={handleAuthClick}
//             className={`border px-4 py-2 rounded-lg transition duration-300 ${
//               isLoggedIn
//                 ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
//                 : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
//             }`}
//           >
//             {isLoggedIn ? "Logout" : "Login"}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   return (
//     <>
//       <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          
//           <h2 onClick={() => navigate('/list')}
//             className="text-2xl font-bold text-blue-600 cursor-pointer">
//             EasyShop
//           </h2>

//           <div className="flex items-center gap-4">
            
//             <button onClick={() => navigate('/cart')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
//               Cart ({cartItems.length})
//             </button>

//             <button onClick={() => navigate('/login')}
//               className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
//               Login
//             </button>

//           </div>

//         </div>

//       </nav>
//     </>
//   );
// };

// export default Navbar;