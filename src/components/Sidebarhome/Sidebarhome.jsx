import React from "react";

export default function Sidebarhome() {
  return (
    <div className="w-full flex gap-4">
      <div className="w-96 p-4 bg-white flex-col justify-start items-start gap-6 inline-flex">
        {/* Header logo + botão */}
        <div className="w-full justify-between items-center gap-2.5 inline-flex">
          <a href="#">
            <img
              src="https://pagedone.io/asset/uploads/1701235273.png"
              alt="Pagedone logo"
              className="w-28"
            />
          </a>

          <a href="#" className="w-6 h-6 relative bg-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Menu">
                <rect width="24" height="24" fill="white" />
                <path
                  id="icon"
                  d="M13 6H21M3 12H21M7 18H21"
                  stroke="#1F2937"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </a>
        </div>

        {/* Menu principal */}
        <div className="w-full flex-col justify-start items-start gap-2 flex">
          <div className="w-full h-8 px-3 items-center flex">
            <h6 className="text-gray-500 text-xs font-semibold leading-4">
              MENU
            </h6>
          </div>

          <a
            href="#"
            className="w-full px-3 py-2.5 rounded-xl justify-start items-center gap-2.5 inline-flex text-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
            >
              <path
                d="M3 12L12 3L21 12H17V21H7V12H3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium leading-5">Dashboard</span>
          </a>

          <a
            href="#"
            className="w-full px-3 py-2.5 rounded-xl justify-start items-center gap-2.5 inline-flex text-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-medium leading-5">Projects</span>
          </a>

          <a
            href="#"
            className="w-full px-3 py-2.5 rounded-xl justify-start items-center gap-2.5 inline-flex text-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
            >
              <path
                d="M5 12H19M12 5V19"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-medium leading-5">Create</span>
          </a>
        </div>

        {/* Configurações */}
        <div className="w-full flex-col justify-start items-start gap-2 flex">
          <div className="w-full h-8 px-3 items-center flex">
            <h6 className="text-gray-500 text-xs font-semibold leading-4">
              SETTINGS
            </h6>
          </div>

          <a
            href="#"
            className="w-full px-3 py-2.5 rounded-xl justify-start items-center gap-2.5 inline-flex text-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
            >
              <path
                d="M12 1V4M12 20V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H4M20 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium leading-5">Preferences</span>
          </a>

          <a
            href="#"
            className="w-full px-3 py-2.5 rounded-xl justify-start items-center gap-2.5 inline-flex text-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
            >
              <path
                d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium leading-5">History</span>
          </a>
        </div>
      </div>
    </div>
  );
}
