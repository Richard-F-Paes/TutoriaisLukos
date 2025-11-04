import React from "react";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: InboxIcon,
    title: "Hands-On Projects",
    description:
      "Apply your knowledge to real-world projects, building a robust portfolio.",
  },
  {
    icon: AcademicCapIcon,
    title: "Career Opportunities",
    description:
      "React developers are in high demand and this course is designed for you!",
  },
  {
    icon: CheckBadgeIcon,
    title: "Flexible Learning",
    description: "Access course materials whenever it suits your schedule.",
  },
];

function Feature() {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
      {FEATURES.map(({ icon, title, description }) => (
        <FeatureCard key={title} icon={icon} title={title}>
          {description}
        </FeatureCard>
      ))}
    </div>
  );
}

export default Feature;
