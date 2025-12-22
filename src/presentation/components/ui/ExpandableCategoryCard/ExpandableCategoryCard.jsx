import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import './ExpandableCategoryCard.css';

const ExpandableCategoryCard = ({ 
  category, 
  isExpanded, 
  onToggle, 
  onSelect, 
  isSelected,
  getTutorialCount,
  expandedCategories,
  level = 0 
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const tutorialCount = getTutorialCount ? getTutorialCount(category) : 0;
  const indentStyle = { paddingLeft: `${level * 24}px` };

  return (
    <div className="expandable-category-wrapper" style={indentStyle}>
      <div 
        className={`expandable-category-card ${isSelected ? 'active' : ''} ${hasChildren ? 'has-children' : ''}`}
        onClick={() => onSelect && onSelect(category)}
      >
        {hasChildren && (
          <button
            className="expand-toggle"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(category.id);
            }}
            aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
        {!hasChildren && <span className="expand-spacer" />}
        
        <div className="category-card-content">
          <div className="category-title">{category.name || category.title}</div>
          <div className="category-count">{tutorialCount} tutoriais</div>
          {category.description && (
            <div className="category-description">{category.description}</div>
          )}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="category-children">
          {category.children.map(child => (
            <ExpandableCategoryCard
              key={child.id}
              category={child}
              isExpanded={expandedCategories?.has(child.id)}
              onToggle={onToggle}
              onSelect={onSelect}
              isSelected={isSelected}
              getTutorialCount={getTutorialCount}
              expandedCategories={expandedCategories}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpandableCategoryCard;

