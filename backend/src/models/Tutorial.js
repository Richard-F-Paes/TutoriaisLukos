import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título do passo é obrigatório'],
    trim: true,
    maxlength: [100, 'Título deve ter no máximo 100 caracteres']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo do passo é obrigatório'],
    trim: true
  },
  order: {
    type: Number,
    required: [true, 'Ordem do passo é obrigatória'],
    min: [1, 'Ordem deve ser maior que 0']
  },
  type: {
    type: String,
    enum: {
      values: ['text', 'image', 'video', 'code', 'interactive'],
      message: 'Tipo deve ser: text, image, video, code ou interactive'
    },
    default: 'text'
  },
  media: {
    url: String,
    alt: String,
    caption: String
  },
  code: {
    language: String,
    content: String
  },
  isOptional: {
    type: Boolean,
    default: false
  },
  estimatedTime: {
    type: Number, // em minutos
    default: 5
  }
}, {
  timestamps: true
});

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [100, 'Título deve ter no máximo 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true,
    maxlength: [500, 'Descrição deve ter no máximo 500 caracteres']
  },
  content: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    trim: true,
    enum: {
      values: ['sistema', 'pdv', 'retaguarda', 'configuracao', 'troubleshooting', 'outros'],
      message: 'Categoria deve ser: sistema, pdv, retaguarda, configuracao, troubleshooting ou outros'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Dificuldade é obrigatória'],
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: 'Dificuldade deve ser: beginner, intermediate ou advanced'
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  steps: [stepSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String,
    default: null
  },
  estimatedTime: {
    type: Number, // em minutos
    default: 30
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }],
  relatedTutorials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para melhor performance
tutorialSchema.index({ title: 'text', description: 'text', tags: 'text' });
tutorialSchema.index({ category: 1 });
tutorialSchema.index({ difficulty: 1 });
tutorialSchema.index({ isPublished: 1 });
tutorialSchema.index({ author: 1 });
tutorialSchema.index({ createdAt: -1 });
tutorialSchema.index({ views: -1 });
tutorialSchema.index({ 'rating.average': -1 });

// Virtual para número de passos
tutorialSchema.virtual('stepCount').get(function() {
  return this.steps.length;
});

// Virtual para tempo total estimado
tutorialSchema.virtual('totalEstimatedTime').get(function() {
  return this.steps.reduce((total, step) => total + (step.estimatedTime || 5), 0);
});

// Middleware para atualizar publishedAt quando isPublished muda
tutorialSchema.pre('save', function(next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Middleware para ordenar passos por ordem
tutorialSchema.pre('save', function(next) {
  if (this.steps && this.steps.length > 0) {
    this.steps.sort((a, b) => a.order - b.order);
  }
  next();
});

// Método para incrementar visualizações
tutorialSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Método para atualizar rating
tutorialSchema.methods.updateRating = function(newRating) {
  const currentTotal = this.rating.average * this.rating.count;
  this.rating.count += 1;
  this.rating.average = (currentTotal + newRating) / this.rating.count;
  return this.save({ validateBeforeSave: false });
};

// Método para adicionar like/dislike
tutorialSchema.methods.addReaction = function(type) {
  if (type === 'like') {
    this.likes += 1;
  } else if (type === 'dislike') {
    this.dislikes += 1;
  }
  return this.save({ validateBeforeSave: false });
};

// Método estático para buscar tutoriais por categoria
tutorialSchema.statics.findByCategory = function(category) {
  return this.find({ category, isPublished: true, isActive: true })
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 });
};

// Método estático para buscar tutoriais por dificuldade
tutorialSchema.statics.findByDifficulty = function(difficulty) {
  return this.find({ difficulty, isPublished: true, isActive: true })
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 });
};

// Método estático para buscar tutoriais mais populares
tutorialSchema.statics.findPopular = function(limit = 10) {
  return this.find({ isPublished: true, isActive: true })
    .populate('author', 'name avatar')
    .sort({ views: -1, 'rating.average': -1 })
    .limit(limit);
};

// Método estático para buscar tutoriais recentes
tutorialSchema.statics.findRecent = function(limit = 10) {
  return this.find({ isPublished: true, isActive: true })
    .populate('author', 'name avatar')
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit);
};

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;
