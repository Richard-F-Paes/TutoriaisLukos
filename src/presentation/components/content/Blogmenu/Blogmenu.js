import React from "react";

export const Blogmenu = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full rounded-xl lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-[#181f3c] text-white">
      <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
        
        {/* Coluna de texto */}
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
              Tutoriais para
              <br className="hidden md:block" />
             {" "}
              <span className="inline-block text-purple-600">
              Retaguarda
              </span>
            </h2>
            <p className="text-base text-gray-300 md:text-lg">
            Com videos explicados e guia com passo a passo.
            </p>
          </div>

          {/* Itens de destaque */}
          <div className="grid gap-8 row-gap-8 sm:grid-cols-2">
            
            {/* Item 1 */}
            <div>
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-teal-500/20">
                <svg
                  className="w-10 h-10 text-teal-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5">
                Facilidade
              </h6>
              <p className="text-sm text-gray-300">
              
              </p>
            </div>

            {/* Item 2 */}
            <div>
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-teal-500/20">
                <svg
                  className="w-10 h-10 text-teal-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5">
             Layout
              </h6>
              <p className="text-sm text-gray-300">
            
              </p>
            </div>
          </div>
        </div>

        {/* Imagem lateral */}
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src="retaguarda.png"
            alt="Content illustration"
          />
        </div>
      </div>
    </div>
  );
};
 export default Blogmenu;