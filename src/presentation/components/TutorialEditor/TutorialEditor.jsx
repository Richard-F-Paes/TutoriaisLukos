// TutorialEditor - Editor TipTap para tutoriais
import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { common } from 'lowlight';
import EditorToolbar from './EditorToolbar.jsx';

// Criar instância do lowlight com grammars comuns
const lowlight = createLowlight(common);
import './TutorialEditor.css';

const TutorialEditor = ({ 
  content = '', 
  onChange, 
  onSave,
  placeholder = 'Comece a escrever seu tutorial...'
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: 'tutorial-image',
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: 'tutorial-editor-content',
      },
    },
  });

  const handleSave = useCallback(() => {
    if (editor && onSave) {
      onSave(editor.getHTML());
    }
  }, [editor, onSave]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tutorial-editor">
      <EditorToolbar editor={editor} onSave={handleSave} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TutorialEditor;
