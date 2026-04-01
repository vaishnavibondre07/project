import { useState } from "react";

export const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-blue-600 text-white fixed top-4 left-4 z-50 rounded-md shadow-md"
        >
          ☰
        </button>
      )}

      
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        <div className="p-5 border-b flex items-center justify-between">
          
          
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-blue-300 hover:text-blue-600 transition"
          >
            ← Back
          </button>
        </div>

        
        <ul className="p-4 space-y-3">
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              Home
            </button>
          </li>

          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              Products
            </button>
          </li>
        </ul>
      </div>

      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};