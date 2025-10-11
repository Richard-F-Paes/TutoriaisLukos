import React from "react";

const works = [
  {
    title: "Retaguarda",
    image: "retaguarda.png",
    description:
      "It’s easier to reach your savings goals when you have the right savings account. It’s easier to reach your savings goals when you have the right savings account.",
    category: "Retaguarda",
  },
  {
    title: "PDV",
    image: "CaixaPDV.png",
    description:
      "Vitae bibendum egestas magna sit elit non. Netus volutpat dignissim pharetra felis. Orci commodo mauris digital industry is booming adipiscing semper amet.",
    category: "PDV",
  },
  {
    title: "Dashboard",
    image: "Dashboard.png",
    description:
      "Sed ut in perspiciatis unde omnis iste natus error sit on i tatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
    category: "Dashboard",
  },
];

const Portfolio1 = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0b1727] text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-gray-300 text-sm uppercase tracking-widest mb-2">
            Lukos Tecnologia
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Categoriais de Tutoriais</h2>
        </div>

        {/* Cards - sempre 3 lado a lado */}
        <div className="flex justify-between gap-6">
          {works.map((work, i) => (
            <div
              key={i}
              className="flex-1 bg-[#162231] rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-2">{work.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {work.description}
                </p>
                <button className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-[#0b1727] transition">
                  {work.category}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio1;
