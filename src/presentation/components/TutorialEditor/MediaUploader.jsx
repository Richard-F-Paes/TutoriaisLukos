// MediaUploader - Upload de imagens/vídeos inline
import React, { useRef } from 'react';
import { Image as ImageIcon, Video } from 'lucide-react';
import { useUploadMedia } from '../../../hooks/useMedia.js';
import toast from 'react-hot-toast';

const MediaUploader = ({ editor, type = 'image' }) => {
  const fileInputRef = useRef(null);
  const uploadMutation = useUploadMedia();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast.loading('Fazendo upload...');
      const response = await uploadMutation.mutateAsync(file);
      const media = response.data;

      if (type === 'image') {
        editor.chain().focus().setImage({ src: media.Url }).run();
      } else if (type === 'video') {
        // Para vídeos, inserir como iframe ou link
        editor.chain().focus().insertContent(`<iframe src="${media.Url}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`).run();
      }

      toast.dismiss();
      toast.success('Mídia adicionada com sucesso!');
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao fazer upload da mídia');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        title={type === 'image' ? 'Inserir imagem' : 'Inserir vídeo'}
      >
        {type === 'image' ? <ImageIcon size={18} /> : <Video size={18} />}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={type === 'image' ? 'image/*' : 'video/*'}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default MediaUploader;
