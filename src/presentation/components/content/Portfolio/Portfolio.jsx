import React from "react";

const portfolioItems = [
  {
    id: 1,
    title: "Best Website Collections",
    category: "Website",
    image:
      "https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&auto=format&fit=crop&w=1565&q=80",
  },
  {
    id: 2,
    title: "Block Of Ui Kit Collections",
    category: "Ui Kit",
    image:
      "https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
  },
  {
    id: 3,
    title: "Ton’s Of Mobile Mockup",
    category: "Mockups",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  },
];

const Portfolio = () => {
  return (
    <section className="bg-[#181f3c] min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-white mb-12">Portfolio</h1>

        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Table of Content */}
          <div className="mb-12 lg:mb-0 lg:w-1/4">
            <h2 className="text-xl font-semibold text-white mb-6">
              Table of Content
            </h2>
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-blue-400 hover:underline">
                Web design
              </a>
              <a href="#" className="text-gray-300 hover:underline">
                App design
              </a>
              <a href="#" className="text-gray-300 hover:underline">
                Branding
              </a>
              <a href="#" className="text-gray-300 hover:underline">
                Animation
              </a>
            </nav>
          </div>

          {/* Portfolio Items */}
          <div className="flex-1 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {portfolioItems.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
                />
                <h3 className="mt-4 text-lg font-semibold text-">
                  {item.title}
                </h3>
                <p className="text-blue-400 uppercase tracking-wider">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
