import express from 'express';
import { getPrisma } from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { authenticate } from '../middleware/auth.middleware.js';
import { authConfig, getRolePermissions } from '../config/auth.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';
import {
  addAccessTokenToBlacklist,
  addRefreshTokenToBlacklist,
  isRefreshTokenBlacklisted,
  calculateTokenTTL,
} from '../utils/tokenBlacklist.js';

const router = express.Router();

// #region agent log
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __agentLogPath = join(__dirname, '../../../.cursor/debug.log');
const __agentLog = () => {};
// #endregion

// Login
router.post('/login', async (req, res) => {
  // #region agent log
  __agentLog({location:'backend/src/routes/auth.routes.js:login:entry',message:'Login endpoint called',data:{hasUsername:!!req.body.username,username:String(req.body.username||''),hasPassword:!!req.body.password},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
  // #endregion
  try {
    const { username, password } = req.body;
    const prisma = getPrisma();

    const user = await prisma.user.findUnique({
      where: { username },
    });
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:user_found',message:'User lookup result',data:{userFound:!!user,userId:user?.id,isActive:user?.isActive},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion

    if (!user || !user.isActive) {
      // #region agent log
      __agentLog({location:'backend/src/routes/auth.routes.js:login:invalid_credentials',message:'Invalid credentials - user not found or inactive',data:{userFound:!!user,isActive:user?.isActive},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:before_password_check',message:'Before password validation',data:{hasPasswordHash:!!user.passwordHash,passwordHashLength:user.passwordHash?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:password_check',message:'Password validation result',data:{isValidPassword},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion
    if (!isValidPassword) {
      // #region agent log
      __agentLog({location:'backend/src/routes/auth.routes.js:login:invalid_password',message:'Invalid password',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
      // #endregion
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Atualizar último login
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:before_update',message:'Before updating lastLoginAt',data:{userId:user.id},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:after_update',message:'After updating lastLoginAt',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion

    // Gerar tokens
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:before_jwt',message:'Before JWT generation',data:{hasJwtSecret:!!process.env.JWT_SECRET,jwtSecretLength:process.env.JWT_SECRET?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion
    const permissions = getRolePermissions(user.role);

    const accessToken = jwt.sign(
      { userId: user.id, username: user.username, role: user.role, permissions },
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn }
    );
    // Compat: `token` era o nome antigo usado pelo frontend
    const token = accessToken;

    const refreshToken = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      authConfig.refreshToken.secret,
      { expiresIn: authConfig.refreshToken.expiresIn }
    );
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:token_generated',message:'JWT token generated',data:{hasToken:!!token,tokenLength:token?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion

    const responseUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      permissions,
    };

    // Criar log de auditoria para login
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId: user.id,
      action: 'LOGIN',
      entityType: 'User',
      entityId: user.id,
      ipAddress,
      userAgent,
    });

    // Compat: manter `token` no formato antigo, e também retornar access/refresh
    const responseData = {
      token: accessToken,
      accessToken,
      refreshToken,
      user: responseUser,
      data: {
        user: responseUser,
        accessToken,
        refreshToken,
      },
    };
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:response_sent',message:'Sending login response',data:{responseKeys:Object.keys(responseData),hasToken:!!responseData.token,hasUser:!!responseData.user},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion
    res.json(responseData);
  } catch (error) {
    // #region agent log
    __agentLog({location:'backend/src/routes/auth.routes.js:login:error',message:'Login error',data:{errorMessage:String(error.message||''),errorStack:String(error.stack||'').substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'});
    // #endregion
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Me (frontend usa /auth/me)
router.get('/me', authenticate, async (req, res) => {
  try {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Usuário inválido' });
    }

    const permissions = getRolePermissions(user.role);
    const responseUser = { ...user, permissions };

    res.json({ data: { user: responseUser } });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Verify (compat)
router.get('/verify', authenticate, async (req, res) => {
  try {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Usuário inválido' });
    }

    const permissions = getRolePermissions(user.role);
    const responseUser = { ...user, permissions };
    res.json({ user: responseUser });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Refresh (frontend interceptor usa /auth/refresh e espera response.data.data)
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'refreshToken é obrigatório' });
    }

    // Verificar se refresh token está na blacklist
    const isBlacklisted = await isRefreshTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      return res.status(401).json({ error: 'Refresh token revogado' });
    }

    const decoded = jwt.verify(refreshToken, authConfig.refreshToken.secret);

    // Adicionar refresh token antigo à blacklist
    const refreshTokenTTL = calculateTokenTTL(authConfig.refreshToken.expiresIn);
    await addRefreshTokenToBlacklist(refreshToken, refreshTokenTTL);

    const permissions = getRolePermissions(decoded.role);
    const accessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username, role: decoded.role, permissions },
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn }
    );

    // Rotacionar refresh token (simples, stateless)
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username, role: decoded.role },
      authConfig.refreshToken.secret,
      { expiresIn: authConfig.refreshToken.expiresIn }
    );

    res.json({
      data: { accessToken, refreshToken: newRefreshToken },
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
});

// Logout (com blacklist de tokens)
router.post('/logout', authenticate, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.substring(7);
      
      // Adicionar access token à blacklist
      const accessTokenTTL = calculateTokenTTL(authConfig.jwt.expiresIn);
      await addAccessTokenToBlacklist(accessToken, accessTokenTTL);
    }

    // Se houver refresh token no body, também adicionar à blacklist
    const { refreshToken } = req.body;
    if (refreshToken) {
      const refreshTokenTTL = calculateTokenTTL(authConfig.refreshToken.expiresIn);
      await addRefreshTokenToBlacklist(refreshToken, refreshTokenTTL);
    }

    // Criar log de auditoria para logout
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId: req.user.id,
      action: 'LOGOUT',
      entityType: 'User',
      entityId: req.user.id,
      ipAddress,
      userAgent,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Erro no logout:', error);
    // Mesmo com erro, retornar sucesso para não quebrar o fluxo do frontend
    res.json({ success: true });
  }
});

export default router;
