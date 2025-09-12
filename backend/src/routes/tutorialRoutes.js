import express from 'express';
import { body } from 'express-validator';
import {
  getAllTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getTutorialSteps,
  createTutorialStep,
  updateTutorialStep,
  deleteTutorialStep
} from '../controllers/tutorialController.js';
import { 
  authenticateToken, 
  requirePermission,
  optionalAuth 
} from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const router = express.Router();

// Validações
const tutorialValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Título deve ter entre 3 e 100 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Descrição deve ter entre 10 e 500 caracteres'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Categoria é obrigatória'),
  body('difficulty')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Dificuldade deve ser: beginner, intermediate ou advanced')
];

const stepValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Título do passo deve ter entre 3 e 100 caracteres'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Conteúdo do passo deve ter pelo menos 10 caracteres'),
  body('order')
    .isInt({ min: 1 })
    .withMessage('Ordem deve ser um número inteiro positivo')
];

// Rotas públicas
router.get('/', optionalAuth, asyncHandler(getAllTutorials));
router.get('/:id', optionalAuth, asyncHandler(getTutorialById));
router.get('/:id/steps', optionalAuth, asyncHandler(getTutorialSteps));

// Rotas protegidas - requerem permissão de gerenciamento de conteúdo
router.use(authenticateToken);

router.post('/', requirePermission('manage_content'), tutorialValidation, asyncHandler(createTutorial));
router.put('/:id', requirePermission('manage_content'), tutorialValidation, asyncHandler(updateTutorial));
router.delete('/:id', requirePermission('manage_content'), asyncHandler(deleteTutorial));

// Rotas de passos
router.post('/:id/steps', requirePermission('manage_content'), stepValidation, asyncHandler(createTutorialStep));
router.put('/:id/steps/:stepId', requirePermission('manage_content'), stepValidation, asyncHandler(updateTutorialStep));
router.delete('/:id/steps/:stepId', requirePermission('manage_content'), asyncHandler(deleteTutorialStep));

export default router;
