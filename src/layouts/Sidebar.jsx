import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  return (
    <div
      className="
        sticky top-0 h-[100dvh] overflow-hidden
        bg-blue-50 border-r border-blue-200
        w-[120px] sm:w-[120px] md:w-[140px] lg:w-[180px]
        p-3 md:p-4 space-y-3
      "
    >
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>

      <NavLink to="/cart" className={linkClass}>
        Cart
      </NavLink>

      <NavLink to="/profile" className={linkClass}>
        Profile
      </NavLink>
    </div>
  );
};

export default Sidebar;


// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="sticky top-0 h-full bg-blue-50 p-4 space-y-3 border-r border-blue-200">
    
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//             isActive
//               ? "bg-blue-600 text-white shadow-md"
//               : "text-blue-600 hover:bg-blue-100"
//           }`
//         }
//       >
//         Home
//       </NavLink>

//       <NavLink
//         to="/cart"
//         className={({ isActive }) =>
//           `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//             isActive
//               ? "bg-blue-600 text-white shadow-md"
//               : "text-blue-600 hover:bg-blue-100"
//           }`
//         }
//       >
//         Cart
//       </NavLink>

//       <NavLink
//         to="/profile"
//         className={({ isActive }) =>
//           `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//             isActive
//               ? "bg-blue-600 text-white shadow-md"
//               : "text-blue-600 hover:bg-blue-100"
//           }`
//         }
//       >
//         Profile
//       </NavLink>
//     </div>
//   );
// };

// export default Sidebar;