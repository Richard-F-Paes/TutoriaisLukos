import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Por favor, forneça um email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
    select: false // Não incluir senha nas consultas por padrão
  },
  role: {
    type: String,
    enum: {
      values: ['viewer', 'editor', 'moderator', 'admin', 'super_admin'],
      message: 'Role deve ser: viewer, editor, moderator, admin ou super_admin'
    },
    default: 'viewer'
  },
  avatar: {
    type: String,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    language: {
      type: String,
      default: 'pt-BR'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: false
      }
    }
  },
  tutorialProgress: [{
    tutorialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial'
    },
    completedSteps: [{
      stepId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Step'
      },
      completedAt: {
        type: Date,
        default: Date.now
      }
    }],
    completedAt: {
      type: Date,
      default: null
    },
    startedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para melhor performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual para nome completo
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  // Só executa se a senha foi modificada
  if (!this.isModified('password')) return next();

  try {
    // Hash da senha com salt
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para verificar se usuário tem permissão
userSchema.methods.hasPermission = function(permission) {
  // Super Admin tem todas as permissões
  if (this.role === 'super_admin') return true;
  
  // Definir permissões por role
  const rolePermissions = {
    admin: ['manage_content', 'manage_users', 'view_analytics', 'moderate_content'],
    editor: ['manage_content', 'view_analytics'],
    moderator: ['moderate_content', 'view_analytics'],
    viewer: ['view_content']
  };
  
  return rolePermissions[this.role]?.includes(permission) || false;
};

// Método para verificar se usuário tem role específico
userSchema.methods.hasRole = function(role) {
  return this.role === role;
};

// Método para verificar se usuário é admin
userSchema.methods.isAdmin = function() {
  return ['admin', 'super_admin'].includes(this.role);
};

// Método para obter dados públicos do usuário
userSchema.methods.getPublicData = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

// Método estático para buscar usuário por email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Método estático para buscar usuários ativos
userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Middleware para atualizar lastLogin
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

const User = mongoose.model('User', userSchema);

export default User;
