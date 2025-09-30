import React from "react";

function FeatureCard({ icon: Icon, title, children }) {
  return (
    <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <Icon className="h-10 w-10 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );
}

export default FeatureCard;
