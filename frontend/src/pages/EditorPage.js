import React from 'react';
import { motion } from 'framer-motion';
import { EditorProvider } from '../contexts/EditorContext';
import EditorToolbar from '../components/Editor/EditorToolbar';
import ComponentPalette from '../components/Editor/ComponentPalette';
import EditorCanvas from '../components/Editor/EditorCanvas';
import PropertyPanel from '../components/Editor/PropertyPanel';
import './EditorPage.css';

const EditorPage = () => {
  return (
    <EditorProvider>
      <motion.div 
        className="editor-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="editor-layout">
          <motion.div 
            className="editor-sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ComponentPalette />
          </motion.div>
          
          <motion.div 
            className="editor-main"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EditorToolbar />
            <div className="editor-workspace">
              <EditorCanvas />
            </div>
          </motion.div>
          
          <motion.div 
            className="editor-sidebar"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PropertyPanel />
          </motion.div>
        </div>
      </motion.div>
    </EditorProvider>
  );
};

export default EditorPage;
