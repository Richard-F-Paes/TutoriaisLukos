import React from "react";

const UISection = () => {
  return (
    // Seção principal com fundo branco e dark mode cinza escuro
    <section className="bg-black dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:-mx-6">
          {/* Coluna principal com imagem e texto */}
          <div className="lg:w-3/4 lg:px-6">
            {/* Imagem principal */}
            <img
              className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
              src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="UI Illustration"
            />

            <div>
              {/* Subtítulo */}
              <p className="mt-6 text-sm text-blue-900 uppercase">Want to know</p>

              {/* Título principal */}
              <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-">
                What do you want to know about UI
              </h1>

              {/* Perfil do autor */}
              <div className="flex items-center mt-6">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt="Author"
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-900 dark:text-gray-900">Amelia. Anderson</h1>
                  <p className="text-sm text-gray-900 dark:text-gray-900">Lead Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna lateral com links */}
          <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
            {/* Bloco 1 */}
            <div>
              <h3 className="text-blue-500 capitalize">Design instrument</h3>
              <a
                href="#"
                className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-900"
              >
                How to raise $100k+ by using blox ui kit on your design
              </a>
            </div>

            <hr className="my-6 border-gray-900 dark:border-gray-700" />

            {/* Bloco 2 */}
            <div>
              <h3 className="text-blue-500 capitalize">UI Resource</h3>
              <a
                href="#"
                className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400"
              >
                Should you create UI Product by using Blox?
              </a>
            </div>

            <hr className="my-6 border-gray-900 dark:border-gray-700" />

            {/* Bloco 3 */}
            <div>
              <h3 className="text-blue-500 capitalize">Premium Collection</h3>
              <a
                href="#"
                className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-900 dark:text-gray-900"
              >
                Top 10 Blocks you can get on Blox's collection.
              </a>
            </div>

            <hr className="my-6 border-gray-900 dark:border-gray-700" />

            {/* Bloco 4 */}
            <div>
              <h3 className="text-blue-500 capitalize">Premium kits</h3>
              <a
                href="#"
                className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400"
              >
                Top 10 Ui kit you can get on Blox's collection.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UISection;
