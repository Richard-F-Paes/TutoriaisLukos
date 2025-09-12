import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendEmail } from '../utils/emailService.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// Gerar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Gerar refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

// Registrar novo usuário
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar se usuário já existe
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Usuário já existe com este email'
    });
  }

  // Criar token de verificação de email
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');

  // Criar usuário
  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken
  });

  // Gerar tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Enviar email de verificação
  try {
    await sendEmail({
      to: user.email,
      subject: 'Verifique seu email - TutorialLukos',
      template: 'emailVerification',
      data: {
        name: user.name,
        verificationLink: `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`
      }
    });
  } catch (emailError) {
    console.error('Erro ao enviar email de verificação:', emailError);
    // Não falhar o registro se o email não for enviado
  }

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso. Verifique seu email para ativar a conta.',
    data: {
      user: user.getPublicData(),
      token,
      refreshToken
    }
  });
});

// Login do usuário
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Buscar usuário incluindo senha
  const user = await User.findByEmail(email).select('+password');
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha incorretos'
    });
  }

  // Verificar se conta está ativa
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Conta desativada. Entre em contato com o suporte.'
    });
  }

  // Verificar senha
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha incorretos'
    });
  }

  // Atualizar último login
  await user.updateLastLogin();

  // Gerar tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.json({
    success: true,
    message: 'Login realizado com sucesso',
    data: {
      user: user.getPublicData(),
      token,
      refreshToken
    }
  });
});

// Logout do usuário
export const logout = asyncHandler(async (req, res) => {
  // Em uma implementação mais robusta, você poderia invalidar o token
  // adicionando-o a uma blacklist ou removendo do banco de dados
  
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

// Verificar token
export const verifyToken = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Token válido',
    data: {
      user: req.user.getPublicData()
    }
  });
});

// Refresh token
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token é obrigatório'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado ou inativo'
      });
    }

    // Gerar novo token
    const newToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Token renovado com sucesso',
      data: {
        token: newToken,
        user: user.getPublicData()
      }
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token inválido ou expirado'
    });
  }
});

// Esqueci minha senha
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findByEmail(email);
  if (!user) {
    // Por segurança, não revelar se o email existe ou não
    return res.json({
      success: true,
      message: 'Se o email existir, você receberá instruções para redefinir sua senha'
    });
  }

  // Gerar token de reset
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = Date.now() + 10 * 60 * 1000; // 10 minutos

  user.passwordResetToken = resetToken;
  user.passwordResetExpires = resetExpires;
  await user.save({ validateBeforeSave: false });

  // Enviar email
  try {
    await sendEmail({
      to: user.email,
      subject: 'Redefinir senha - TutorialLukos',
      template: 'passwordReset',
      data: {
        name: user.name,
        resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
      }
    });
  } catch (emailError) {
    console.error('Erro ao enviar email de reset:', emailError);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao enviar email. Tente novamente.'
    });
  }

  res.json({
    success: true,
    message: 'Se o email existir, você receberá instruções para redefinir sua senha'
  });
});

// Redefinir senha
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  }).select('+password');

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }

  // Atualizar senha
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json({
    success: true,
    message: 'Senha redefinida com sucesso'
  });
});

// Verificar email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;

  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Token de verificação inválido'
    });
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  res.json({
    success: true,
    message: 'Email verificado com sucesso'
  });
});

// Reenviar verificação de email
export const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  if (user.emailVerified) {
    return res.status(400).json({
      success: false,
      message: 'Email já foi verificado'
    });
  }

  // Gerar novo token
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = emailVerificationToken;
  await user.save({ validateBeforeSave: false });

  // Enviar email
  try {
    await sendEmail({
      to: user.email,
      subject: 'Verifique seu email - TutorialLukos',
      template: 'emailVerification',
      data: {
        name: user.name,
        verificationLink: `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`
      }
    });
  } catch (emailError) {
    console.error('Erro ao reenviar email de verificação:', emailError);
    return res.status(500).json({
      success: false,
      message: 'Erro ao enviar email. Tente novamente.'
    });
  }

  res.json({
    success: true,
    message: 'Email de verificação reenviado com sucesso'
  });
});
