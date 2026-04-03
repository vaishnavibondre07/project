import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sticky top-0 h-full bg-blue-50 p-4 space-y-3 border-r border-blue-200">
    
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-blue-600 hover:bg-blue-100"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-blue-600 hover:bg-blue-100"
          }`
        }
      >
        Cart
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-blue-600 hover:bg-blue-100"
          }`
        }
      >
        Profile
      </NavLink>
    </div>
  );
};

export default Sidebar;