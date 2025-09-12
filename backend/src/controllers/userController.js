import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// Obter perfil do usuário
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.json({
    success: true,
    data: {
      user: user.getPublicData()
    }
  });
});

// Atualizar perfil do usuário
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar, preferences } = req.body;
  
  const updateData = {};
  if (name) updateData.name = name;
  if (avatar) updateData.avatar = avatar;
  if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updateData,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Perfil atualizado com sucesso',
    data: {
      user: user.getPublicData()
    }
  });
});

// Alterar senha
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Buscar usuário com senha
  const user = await User.findById(req.user._id).select('+password');

  // Verificar senha atual
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Senha atual incorreta'
    });
  }

  // Atualizar senha
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Senha alterada com sucesso'
  });
});

// Deletar conta
export const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  // Verificar senha antes de deletar
  const user = await User.findById(req.user._id).select('+password');
  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Senha incorreta'
    });
  }

  // Soft delete - marcar como inativo
  user.isActive = false;
  await user.save();

  res.json({
    success: true,
    message: 'Conta desativada com sucesso'
  });
});

// Obter estatísticas do usuário
export const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('tutorialProgress.tutorialId');
  
  const stats = {
    totalTutorials: user.tutorialProgress.length,
    completedTutorials: user.tutorialProgress.filter(t => t.completedAt).length,
    inProgressTutorials: user.tutorialProgress.filter(t => !t.completedAt).length,
    totalStepsCompleted: user.tutorialProgress.reduce((total, tutorial) => {
      return total + tutorial.completedSteps.length;
    }, 0),
    memberSince: user.createdAt,
    lastLogin: user.lastLogin,
    role: user.role
  };

  res.json({
    success: true,
    data: { stats }
  });
});

// Obter progresso dos tutoriais
export const getTutorialProgress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'tutorialProgress.tutorialId',
      select: 'title description category difficulty'
    })
    .populate({
      path: 'tutorialProgress.completedSteps.stepId',
      select: 'title order'
    });

  res.json({
    success: true,
    data: {
      progress: user.tutorialProgress
    }
  });
});

// Atualizar progresso do tutorial
export const updateTutorialProgress = asyncHandler(async (req, res) => {
  const { tutorialId } = req.params;
  const { stepId, completed } = req.body;

  const user = await User.findById(req.user._id);
  
  // Encontrar ou criar progresso do tutorial
  let tutorialProgress = user.tutorialProgress.find(
    tp => tp.tutorialId.toString() === tutorialId
  );

  if (!tutorialProgress) {
    // Criar novo progresso
    tutorialProgress = {
      tutorialId,
      completedSteps: [],
      startedAt: new Date()
    };
    user.tutorialProgress.push(tutorialProgress);
  }

  if (completed) {
    // Adicionar step aos completados se não estiver
    const existingStep = tutorialProgress.completedSteps.find(
      cs => cs.stepId.toString() === stepId
    );
    
    if (!existingStep) {
      tutorialProgress.completedSteps.push({
        stepId,
        completedAt: new Date()
      });
    }
  } else {
    // Remover step dos completados
    tutorialProgress.completedSteps = tutorialProgress.completedSteps.filter(
      cs => cs.stepId.toString() !== stepId
    );
  }

  await user.save();

  res.json({
    success: true,
    message: 'Progresso atualizado com sucesso',
    data: {
      progress: tutorialProgress
    }
  });
});

// Funções administrativas

// Obter todos os usuários (admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';

  const users = await User.find(filter)
    .select('-password -emailVerificationToken -passwordResetToken')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// Atualizar usuário (admin)
export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, email, role, isActive } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (role) updateData.role = role;
  if (isActive !== undefined) updateData.isActive = isActive;

  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password -emailVerificationToken -passwordResetToken');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  res.json({
    success: true,
    message: 'Usuário atualizado com sucesso',
    data: { user }
  });
});

// Deletar usuário (admin)
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  res.json({
    success: true,
    message: 'Usuário desativado com sucesso'
  });
});
