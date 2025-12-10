// TutorialEditPage - Página de edição de tutorial com TipTap
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTutorial } from "../../../hooks/useTutorials.js";
import { useUpdateTutorial, useCreateTutorial } from "../../../hooks/useTutorials.js";
import TutorialEditor from '../../components/TutorialEditor/TutorialEditor.jsx';
import toast from 'react-hot-toast';

const TutorialEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'novo';

  // Para edição, buscar por ID; para novo, não buscar
  const { data: tutorialData, isLoading } = !isNew
    ? useTutorial(parseInt(id))
    : { data: null, isLoading: false };
  const updateMutation = useUpdateTutorial();
  const createMutation = useCreateTutorial();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (tutorialData?.data) {
      const tutorial = tutorialData.data;
      setTitle(tutorial.Title || '');
      setDescription(tutorial.Description || '');
      setContent(tutorial.Content || '');
      setCategoryId(tutorial.CategoryId);
      setIsPublished(tutorial.IsPublished || false);
    }
  }, [tutorialData]);

  const handleSave = async () => {
    if (!title || !content) {
      toast.error('Título e conteúdo são obrigatórios');
      return;
    }

    try {
      const tutorialData = {
        title,
        description,
        content,
        categoryId,
        isPublished,
      };

      if (isNew) {
        await createMutation.mutateAsync(tutorialData);
        toast.success('Tutorial criado com sucesso!');
        navigate('/admin/tutoriais');
      } else {
        await updateMutation.mutateAsync({ id, data: tutorialData });
        toast.success('Tutorial atualizado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao salvar tutorial');
    }
  };

  if (!isNew && isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="tutorial-edit-page">
      <div className="edit-header">
        <h1>{isNew ? 'Novo Tutorial' : 'Editar Tutorial'}</h1>
        <button onClick={handleSave} className="btn-save-primary">
          Salvar Tutorial
        </button>
      </div>

      <div className="edit-form">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do tutorial"
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição curta do tutorial"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Conteúdo</label>
          <TutorialEditor
            content={content}
            onChange={setContent}
            onSave={handleSave}
          />
        </div>

        <div className="form-actions">
          <label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Publicar tutorial
          </label>
        </div>
      </div>
    </div>
  );
};

export default TutorialEditPage;
