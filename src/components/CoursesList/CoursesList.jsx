import React, { useRef } from "react";

const courses = [
  {
    id: 1,
    title: "Cadastro de Cliente com CPF",
    partner: "Google",
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdavi9xljVb6i8K_h4L77Vh4wWfBiHc-7299ZV3NUHqn_7k9YLoaFx-7GYpT1j6nEc4hN4Yxtr5jKsEaZWAWX3jNTp44hd_l5WEqJKek3EOro4INKz0Ri8ikiJMx0xye0Z3lCUV7J4jskIwECe3GypcwC2Nmq4xnU8Mgc_wV0-T3aJFC_d05ygeYndabO1BVKIN7HxLxbrSD8b1GkuYB6Ge9Hm6vlEeJDPTV=w1280",
    link: "https://www.coursera.org/professional-certificates/google-it-automation",
    status: "Teste gratuito",
    type: "Certificado profissional",
  },
  {
    id: 2,
    title: "Cadastro de Clietnes com CNPJ",
    partner: "Google",
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdYqZWdWwgx68wz-qJzxa3h2Ns2LLSZZn6F0gLCSuyFsp0rclpJlIJWc_7ZTqkbm_3rb7G8Z2brwdFv3Axbkh_33v2NhlPW0kJNTL1-QtBBQiMw-NkbCb02vV8yVJQiYriHorMW34LhZmz-5JL-jm6tkptEuNTIrEuwnYq69PBqitDj1Akgb6WtxoVbPEYQZy69_er3LLMIZjn7snUxd0Wid9R6rmxB9xhOAYCw=w1280",
    link: "https://www.coursera.org/professional-certificates/google-advanced-data-analytics",
    status: "Teste gratuito",
    type: "Certificado profissional",
  },
  {
    id: 3,
    title: "Cadastro de Faturamento",
    partner: "Google",
    image: "hhttps://lh3.googleusercontent.com/sitesv/AICyYda5ZQ6n-aJfKzyregW0Tso-Dq6OcfKCfFnKQ2RYu5Gw7YPtdOv6uSRv-mXmvhcyd_pc7NXZitwLXmh4sUzmRH9My-SdA0QlFAgFu2QK1KgCdpUyuEav-aMU8LiAA9oMZazEjS6txm__oqxhlLxQSGnTKe5I9DhWCQh6zGTj5ARiJmJ3xtw1YrY52NuTDijT3A_AlB0_-aJ6MvX5VJJFoZaTxckk4O9E1ymvRaE=w1280",
    link: "https://www.coursera.org/professional-certificates/google-business-intelligence",
    status: "Teste gratuito",
    type: "Certificado profissional",
  },
  {
    id: 4,
    title: "Cadastro de Frota",
    partner: "Google",
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdZrUpb2F_i1aYJ_63U5AGwzi7BidThD4dRHTgrOfRT7BvofMxBax9742C2XOcpH3hLvvwz91DVtiqPL1-kX2UNg2JLsDSGI_j4UssZZFWBPKkqakUF6QbvtG1AEd2GRm-opWqnL6Uo5xkk-8UyjdQQnZIkyQTKJ3DXr2UH7R73oRRN-ECsSUCvzYJe7KU6hIGw31Exum0XuZb8NEHya9uhCMPXfBfP9O0f8=w1280",
    link: "#",
    status: "Teste gratuito",
    type: "Certificado profissional",
  },
  {
    id: 5,
    title: "Gerar Código de liberação",
    partner: "IBM",
    image: "https://lh3.googleusercontent.com/sitesv/AICyYdahrDN4cE0DRXnO_24npFh_QTgbog7k3gq5STXJMwyFuC0vA5oQUvee_Z8HE1D1W6khVvtO1gUelEXsRsX5Q59QMSJfwj24Fi4Yq2XL2fwgAkj57SOZAbcoAW_3JtOxzqeqcAdNk4FNou6Uxx4cPKBBOHbsMPQ-ql427wt9rUBkVo_szb-slCL1KF_XmotU6F884rSAmEOOgRfp1AVjdhKdzxPUkSaB_FnzimE=w1280",
    link: "#",
    status: "Teste gratuito",
    type: "Certificado profissional",
  },
];

const CourseCard = ({ course }) => {
  return (
    <a
      href={course.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border-1 mb-14 gap-4 mt-10 ml-4 border-black rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[300px] max-w-sm flex-shrink-0 mx-2 "
    >
      <div className="relative flex justify-center p-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover rounded-t-2xl"
        />
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {course.status}
        </span>
      </div>
      <div className="w-[290px] p-2 h-[200   px] ">
        <h3 className="text-lg text-black font-semibold mb-8 p-1">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-6 m-6">{course.partner}</p>
        <p className="text-sm text-gray-700 mb-6 m6">{course.type}</p>
      </div>
    </a>
  );
};

const CourseList = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="max-w-7x1 mx-auto px-4 py-10 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">Avance em sua carreira</h2>

      <div className="relative">
        {/* Botões de navegação */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2 z-10"
        >
          {"<"}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2 z-10"
        >
          {">"}
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-2 justify-center"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
