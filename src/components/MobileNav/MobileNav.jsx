import React, { useState } from "react";
import { Home, Fuel, Settings, BarChart, Plus } from "lucide-react";

export default function BottomNavModern() {
  const [active, setActive] = useState("home");
  const [openMenu, setOpenMenu] = useState(false);

  // Menu inferior principal
  const menuItems = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "search", label: "Buscar", icon: <Fuel size={22} /> },
    { id: "likes", label: "Favoritos", icon: <Settings size={22} /> },
    { id: "profile", label: "Perfil", icon: <BarChart size={22} /> },
  ];

  // Menu flutuante central (ícones + nome)
  const floatingItems = [
    { id: "pista", label: "Pista", icon: <Home size={20} /> },
    { id: "conveniencia", label: "Conveniencia", icon: <Fuel size={20} /> },
    { id: "retaguarda", label: "Retaguarda", icon: <Settings size={20} /> },
    { id: "dashboard", label: "Dashboard", icon: <Settings size={20} /> },
    { id: "lukospay", label: "Lukos Pay", icon: <Settings size={20} /> },
    { id: "faturaweb", label: "Fatura Web", icon: <Settings size={20} /> },
    { id: "prevenda", label: "Pré-Venda", icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-16 z-50 rounded-t-2xl">
      {/* Ícones laterais esquerda */}
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
          <span>{item.label}</span>
        </button>
      ))}

      {/* Botão central flutuante */}
      <div className="relative">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg -mt-10 border-4 border-white hover:bg-blue-700 transition"
        >
          <Plus size={26} />
        </button>

        {/* Menu flutuante */}
        {openMenu && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3">
            {floatingItems.map((item) => (
              <button
                key={item.id}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow flex items-center space-x-2 hover:bg-blue-50 transition"
                onClick={() => {
                  alert(`${item.label} clicada!`);
                  setOpenMenu(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ícones laterais direita */}
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
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
