import React, { useState } from "react";
import "./Lukossidebar.css";

const Lukossidebar = () => {
  const [expanded, setExpanded] = useState(true); // controla a largura

  const menuItems = [
    { icon: "🏠", label: "Dashboard" },
    { icon: "📊", label: "Revenue" },
    { icon: "🔔", label: "Notifications" },
    { icon: "📈", label: "Analytics" },
    { icon: "📦", label: "Inventory" },
  ];

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {/* Logo */}
      <div className="logo">🦆</div>

      {/* Search */}
      {expanded && (
        <input type="text" placeholder="Search..." className="search" />
      )}

      {/* Menu */}
      <ul className="menu">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <span className="icon">{item.icon}</span>
            {expanded && <span className="label">{item.label}</span>}
          </li>
        ))}
      </ul>

      {/* User */}
      {expanded && (
        <div className="user">
          <div className="avatar">🦆</div>
          <div className="info">
            <p>Duck UI</p>
            <small>Duckui@demo.com</small>
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="footer">
        <button>🌙</button>
        <button>Logout</button>
      </div>

      {/* Toggle sidebar */}
      <button className="toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "«" : "»"}
      </button>
    </div>
  );
};

export default Lukossidebar;
