// TutorialActions - Botões de ação (editar, compartilhar)
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext.js';
import { Edit, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TutorialActions = ({ tutorial }) => {
  const { isAuthenticated, hasPermission } = useAuth();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tutorial.Title,
        text: tutorial.Description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="tutorial-actions">
      {isAuthenticated && hasPermission('edit_tutorial') && (
        <Link
          to={`/admin/tutoriais/${tutorial.Id}/editar`}
          className="btn-edit"
        >
          <Edit size={16} />
          Editar Tutorial
        </Link>
      )}

      <button onClick={handleShare} className="btn-share">
        <Share2 size={16} />
        Compartilhar
      </button>
    </div>
  );
};

export default TutorialActions;
