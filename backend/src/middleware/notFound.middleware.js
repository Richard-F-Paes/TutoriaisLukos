// Middleware para rotas não encontradas
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
  });
};
