import React, { useState } from "react";

const portfolioItems = [
  {
    id: 1,
    category: "branding",
    title: "Branding Design",
    subtitle: "Branding",
    image:
      "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-01.jpg",
  },
  {
    id: 2,
    category: "marketing",
    title: "Best Marketing tips",
    subtitle: "Marketing",
    image:
      "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-02.jpg",
  },
  {
    id: 3,
    category: "development",
    title: "Web Design Trend",
    subtitle: "Development",
    image:
      "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-03.jpg",
  },
  {
    id: 4,
    category: "design",
    title: "Business Card Design",
    subtitle: "Design",
    image:
      "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-04.jpg",
  },
  {
    id: 5,
    category: "marketing",
    title: "Digital marketing",
    subtitle: "Marketing",
    image:
      "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-05.jpg",
  },
  {
    id: 6,
    category: "branding",
    title: "Creative Agency",
    subtitle: "Branding",
    image:
      "https://cdn.tailgrids.com/assets/images/marketing/portfolio/portfolio-01/image-06.jpg",
  },
];

const categories = [
  { key: "all", label: "All Projects" },
  { key: "branding", label: "Branding" },
  { key: "design", label: "Design" },
  { key: "marketing", label: "Marketing" },
  { key: "development", label: "Development" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const activeClasses = "bg-primary text-white";
  const inactiveClasses =
    "text-body-color dark:text-dark-6 hover:bg-primary hover:text-white";

  return (
    <section className="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] dark:bg-dark">
      <div className="container mx-auto">
        {/* Header */}
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Portfolio
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark sm:text-4xl md:text-[40px]">
                Our Recent Projects
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <ul className="mb-12 flex flex-wrap justify-center space-x-1">
              {categories.map((cat) => (
                <li key={cat.key} className="mb-1">
                  <button
                    onClick={() => setActiveCategory(cat.key)}
                    className={`inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      activeCategory === cat.key ? activeClasses : inactiveClasses
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portfolio Items */}
 {/* Portfolio Items */}
<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
  {portfolioItems
    .filter(
      (item) => activeCategory === "all" || item.category === activeCategory
    )
    .map((item) => (
      <div key={item.id} className="relative">
        <div className="overflow-hidden rounded-[10px]">
          <img src={item.image} alt={item.title} className="w-full" />
        </div>
        <div className="relative z-10 mx-4 -mt-16 rounded-lg bg-white px-3 py-8 text-center shadow-portfolio dark:bg-dark-2 dark:shadow-box-dark">
          <span className="mb-2 block text-sm font-medium text-primary">
            {item.subtitle}
          </span>
          <h3 className="mb-5 text-xl font-bold text-dark dark:text-white">
            {item.title}
          </h3>
          <a
            href="#"
            className="inline-block rounded-md border border-stroke px-7 py-[10px] text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
          >
            View sadfsadf
          </a>
        </div>
      </div>
    ))}
</div>

      </div>
    </section>
  );
};

export default Portfolio;
