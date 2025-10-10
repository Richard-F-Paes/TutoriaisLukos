import { useState } from "react";

const Heroteste = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="bg-gray-900">
      <main className="flex flex-col items-center justify-center bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-2.png')] bg-cover text-sm text-white px-6 text-center min-h-screen gap-6">

        {/* Navbar */}
        <nav className="flex items-center justify-between w-full px-4 md:px-16 lg:px-24 xl:px-32 py-4">
        

          

          <button className="max-md:hidden px-6 py-2 bg-white text-black hover:bg-gray-200 transition active:scale-95 rounded-full border border-gray-600">
            Get Started
          </button>

          <button aria-label="menu burger" className="size-6 md:hidden" onClick={() => setMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 18h18M3 6h18" />
            </svg>
          </button>
        </nav>

        {/* Conteúdo Hero */}
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <h1 className="text-4xl md:text-[40px] font-semibold">Procure pelo Tutorial</h1>
          <p className="text-base">.</p>

          <div className="max-w-xl w-full bg-white rounded-xl overflow-hidden mt-4 mx-auto">
            <textarea
              className="w-full p-3 pb-0 resize-none outline-none bg-transparent text-black"
              placeholder="Tell us about your idea"
              rows="3"
            ></textarea>
            <div className="flex items-center justify-between pb-3 px-3">
              <button className="flex items-center justify-center bg-gray-500 p-1 rounded-full size-6" aria-label="Add">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5h9M5.5 1v9" stroke="#CCD5E2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="flex items-center justify-center p-1 rounded size-6 bg-indigo-600" aria-label="Send">
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid de Perguntas */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-slate-400 max-w-xl mx-auto">
            <p className="cursor-pointer">How do I write a resume or cover letter?</p>
            <p className="cursor-pointer">How do I improve my writing skills?</p>
            <p className="cursor-pointer">Can you translate something for me?</p>
            <p className="cursor-pointer">How can I be more productive?</p>
          </div>
        </div>

        {/* Termos */}
        <p className="text-gray-400 pt-6 pb-3 text-sm max-w-xl mx-auto">
          By messaging us, you agree to our <a href="#" className="underline">Terms of Use</a> and confirm you've read our <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </main>
    </section>
  );
};

export default Heroteste;
