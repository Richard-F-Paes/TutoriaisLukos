import React, { useState } from "react";
import {
  Home,
  Search,
  Heart,
  Plus,
  User,
} from "lucide-react";

export default function BottomNavModern() {
  const [active, setActive] = useState("home");

  const menuItems = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "search", label: "Buscar", icon: <Search size={22} /> },
    { id: "likes", label: "Favoritos", icon: <Heart size={22} /> },
    { id: "profile", label: "Perfil", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-16 z-50 rounded-t-2xl">
      {/* Ícones laterais */}
      {menuItems.slice(0, 2).map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center text-xs ${
            active === item.id
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          {item.icon}
        </button>
      ))}

      {/* Botão central flutuante */}
      <button
        onClick={() => alert("Ação principal!")}
        className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg -mt-10 border-4 border-white hover:bg-blue-700 transition"
      >
        <Plus size={26} />
      </button>

      {menuItems.slice(2).map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center text-xs ${
            active === item.id
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
