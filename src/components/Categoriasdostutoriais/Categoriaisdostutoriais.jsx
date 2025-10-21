import React from "react";
import { UserPlus, Tag, ShoppingCart, CreditCard, Boxes, FileText, Settings, BarChart3, HeartHandshake, Link as LinkIcon, BookOpen } from "lucide-react";
import CategoryGrid from "./CategoryGrid";

const Categoriaisdostutoriais = ({
  title = "Tutoriais do Sistema",
  subtitle = "Acesse os tutoriais organizados por área do sistema Lukos",
  categories = [],
  data = [],
  highlight = null,
}) => {
  return (
    <CategoryGrid
      title={title}
      subtitle={subtitle}
      categories={categories}
      data={data}
      highlight={highlight}
    />
  );
};

export default Categoriaisdostutoriais;
