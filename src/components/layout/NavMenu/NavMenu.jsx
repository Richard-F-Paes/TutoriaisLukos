import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavMenu() {
  const location = useLocation();
  
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">TutoriaisLukos</div>
        
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`hover:text-blue-200 ${location.pathname === '/' ? 'font-bold underline' : ''}`}
            >
              Tutoriais
            </Link>
          </li>
          <li>
            <Link 
              to="/admin" 
              className={`hover:text-blue-200 ${location.pathname === '/admin' ? 'font-bold underline' : ''}`}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}