import Tutorial from '../models/Tutorial.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

// Obter todos os tutoriais
export const getAllTutorials = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filtros
  const filter = { isPublished: true, isActive: true };
  
  if (req.query.category) filter.category = req.query.category;
  if (req.query.difficulty) filter.difficulty = req.query.difficulty;
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Ordenação
  let sort = { createdAt: -1 };
  if (req.query.sort === 'popular') sort = { views: -1, 'rating.average': -1 };
  if (req.query.sort === 'rating') sort = { 'rating.average': -1, 'rating.count': -1 };
  if (req.query.sort === 'recent') sort = { publishedAt: -1 };

  const tutorials = await Tutorial.find(filter)
    .populate('author', 'name avatar')
    .select('-steps') // Não incluir passos na listagem
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Tutorial.countDocuments(filter);

  res.json({
    success: true,
    data: {
      tutorials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// Obter tutorial por ID
export const getTutorialById = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id)
    .populate('author', 'name avatar')
    .populate('prerequisites', 'title difficulty')
    .populate('relatedTutorials', 'title difficulty thumbnail');

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  // Incrementar visualizações se for um usuário autenticado
  if (req.user) {
    await tutorial.incrementViews();
  }

  res.json({
    success: true,
    data: { tutorial }
  });
});

// Criar novo tutorial
export const createTutorial = asyncHandler(async (req, res) => {
  const tutorialData = {
    ...req.body,
    author: req.user._id
  };

  const tutorial = await Tutorial.create(tutorialData);

  res.status(201).json({
    success: true,
    message: 'Tutorial criado com sucesso',
    data: { tutorial }
  });
});

// Atualizar tutorial
export const updateTutorial = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  // Verificar se o usuário é o autor ou tem permissão de admin
  if (tutorial.author.toString() !== req.user._id.toString() && !req.user.isAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Você só pode editar seus próprios tutoriais'
    });
  }

  const updatedTutorial = await Tutorial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('author', 'name avatar');

  res.json({
    success: true,
    message: 'Tutorial atualizado com sucesso',
    data: { tutorial: updatedTutorial }
  });
});

// Deletar tutorial
export const deleteTutorial = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  // Verificar se o usuário é o autor ou tem permissão de admin
  if (tutorial.author.toString() !== req.user._id.toString() && !req.user.isAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Você só pode deletar seus próprios tutoriais'
    });
  }

  // Soft delete
  tutorial.isActive = false;
  await tutorial.save();

  res.json({
    success: true,
    message: 'Tutorial deletado com sucesso'
  });
});

// Obter passos do tutorial
export const getTutorialSteps = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id)
    .select('steps title');

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  res.json({
    success: true,
    data: {
      tutorial: {
        _id: tutorial._id,
        title: tutorial.title,
        steps: tutorial.steps
      }
    }
  });
});

// Criar passo do tutorial
export const createTutorialStep = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  // Verificar se o usuário é o autor ou tem permissão de admin
  if (tutorial.author.toString() !== req.user._id.toString() && !req.user.isAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Você só pode editar seus próprios tutoriais'
    });
  }

  // Adicionar passo
  tutorial.steps.push(req.body);
  await tutorial.save();

  res.status(201).json({
    success: true,
    message: 'Passo criado com sucesso',
    data: {
      step: tutorial.steps[tutorial.steps.length - 1]
    }
  });
});

// Atualizar passo do tutorial
export const updateTutorialStep = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  // Verificar se o usuário é o autor ou tem permissão de admin
  if (tutorial.author.toString() !== req.user._id.toString() && !req.user.isAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Você só pode editar seus próprios tutoriais'
    });
  }

  const step = tutorial.steps.id(req.params.stepId);
  if (!step) {
    return res.status(404).json({
      success: false,
      message: 'Passo não encontrado'
    });
  }

  // Atualizar passo
  Object.assign(step, req.body);
  await tutorial.save();

  res.json({
    success: true,
    message: 'Passo atualizado com sucesso',
    data: { step }
  });
});

// Deletar passo do tutorial
export const deleteTutorialStep = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);

  if (!tutorial) {
    return res.status(404).json({
      success: false,
      message: 'Tutorial não encontrado'
    });
  }

  // Verificar se o usuário é o autor ou tem permissão de admin
  if (tutorial.author.toString() !== req.user._id.toString() && !req.user.isAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Você só pode editar seus próprios tutoriais'
    });
  }

  const step = tutorial.steps.id(req.params.stepId);
  if (!step) {
    return res.status(404).json({
      success: false,
      message: 'Passo não encontrado'
    });
  }

  // Remover passo
  step.remove();
  await tutorial.save();

  res.json({
    success: true,
    message: 'Passo deletado com sucesso'
  });
});
