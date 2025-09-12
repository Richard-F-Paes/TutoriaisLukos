import express from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getUserStats,
  getTutorialProgress,
  updateTutorialProgress,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin
} from '../controllers/userController.js';
import { 
  authenticateToken, 
  requireOwnershipOrAdmin,
  requirePermission 
} from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const router = express.Router();

// Validações
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nome deve ter entre 2 e 50 caracteres'),
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar deve ser uma URL válida'),
  body('preferences.theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Tema deve ser: light, dark ou auto'),
  body('preferences.language')
    .optional()
    .isLength({ min: 2, max: 10 })
    .withMessage('Idioma inválido')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Senha atual é obrigatória'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Nova senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número')
];

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Rotas de perfil
router.get('/profile', asyncHandler(getProfile));
router.put('/profile', updateProfileValidation, asyncHandler(updateProfile));
router.put('/change-password', changePasswordValidation, asyncHandler(changePassword));
router.delete('/account', asyncHandler(deleteAccount));

// Rotas de estatísticas
router.get('/stats', asyncHandler(getUserStats));

// Rotas de progresso de tutoriais
router.get('/tutorials/progress', asyncHandler(getTutorialProgress));
router.put('/tutorials/:tutorialId/progress', asyncHandler(updateTutorialProgress));

// Rotas administrativas (requerem permissões específicas)
router.get('/admin/users', requirePermission('manage_users'), asyncHandler(getAllUsers));
router.put('/admin/users/:userId', requirePermission('manage_users'), requireOwnershipOrAdmin, asyncHandler(updateUserByAdmin));
router.delete('/admin/users/:userId', requirePermission('manage_users'), requireOwnershipOrAdmin, asyncHandler(deleteUserByAdmin));

export default router;
