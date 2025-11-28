import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './AuthPages.css';

const schema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string({ required_error: 'Confirmação de senha é obrigatória' }),
  terms: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos de uso')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas devem ser iguais',
  path: ['confirmPassword']
});

function RegisterPage() {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    const { confirmPassword, terms, ...userData } = data;
    
    const result = await registerUser(userData);
    
    if (result.success) {
      toast.success('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error(result.error || 'Erro ao criar conta');
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="auth-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/" className="auth-logo">
            <img src="/icons/logo.png" alt="Logo" />
            <span>TutorialLukos</span>
          </Link>
          <h1>Criar nova conta</h1>
          <p>Junte-se à nossa comunidade e comece a aprender!</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="auth-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Digite a senha novamente"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                {...register('terms')}
                className={errors.terms ? 'error' : ''}
              />
              <span>
                Eu aceito os{' '}
                <Link to="/terms" className="terms-link">
                  Termos de Uso
                </Link>{' '}
                e a{' '}
                <Link to="/privacy" className="terms-link">
                  Política de Privacidade
                </Link>
              </span>
            </label>
            {errors.terms && (
              <span className="error-message">{errors.terms.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg auth-submit"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Criar conta
              </>
            )}
          </button>
        </motion.form>

        <motion.div 
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>
            Já tem uma conta? Entre em contato com o administrador.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
