import React from "react";
import { Typography } from "@material-tailwind/react";
import Feature from "./Feature/Feature";

function OnlineCourse() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto grid grid-cols-1 place-items-center lg:grid-cols-3">
        
        {/* Imagem */}
        <div className="col-span-1 rounded-xl lg:mb-0 mb-12">
          <img
            src="/image/online-course.png"
            alt="online course"
            className="h-full max-h-[500px] w-full object-cover scale-110 rounded-xl"
          />
        </div>

        {/* Conteúdo */}
        <div className="col-span-2 lg:pl-24">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Online Course
          </Typography>

          <Typography
            variant="lead"
            className="mb-5 max-w-lg px-4 text-left text-lg !text-gray-500 lg:px-0"
          >
            In this comprehensive React Course, you&apos;ll delve into the world
            of React, from its fundamentals to advanced techniques. Our expert
            instructors will guide you through every step.
          </Typography>

          {/* Cards de Features */}
          <Feature />
        </div>
      </div>
    </section>
  );
}

export default OnlineCourse;
