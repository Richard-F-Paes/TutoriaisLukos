import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Lock, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória')
});

const AdminPasswordModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      const result = await login(data.username.trim(), data.password);
      
      if (result.success) {
        reset();
        onClose();
      } else {
        setError(result.error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  return (
    <>
      <style>{`
        .lukos-purple-button {
          background: radial-gradient(circle at center, #6c2396 0%, #7d3fa3 60%, #8b4db0 100%);
          transition: all 0.3s ease;
        }
        .lukos-purple-button:hover:not(:disabled) {
          background: radial-gradient(circle at center, #7d3fa3 0%, #8b4db0 60%, #9d5cbf 100%);
        }
      `}</style>
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10 pointer-events-none" />
          
          <div className="relative flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <Dialog.Title className="text-lg font-semibold text-[#5a008f]">
                Acesso Lukos
              </Dialog.Title>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/30 hover:bg-white/50 text-gray-600 hover:text-gray-800 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative px-6 pb-6">
            <div className="mb-5">
              <label htmlFor="admin-username" className="block text-sm font-medium text-gray-600 mb-2">
                Usuário
              </label>
              <input
                id="admin-username"
                type="text"
                {...register('username')}
                className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl text-base transition-all box-border ${
                  errors.username 
                    ? 'border-red-200/60 focus:border-red-400/80 focus:ring-2 focus:ring-red-100/50' 
                    : 'border-gray-200/60 focus:border-gray-400/80 focus:ring-2 focus:ring-gray-100/50'
                } focus:outline-none disabled:bg-gray-100/60 disabled:cursor-not-allowed placeholder:text-gray-500 text-gray-800`}
                placeholder="Digite seu usuário"
                autoFocus
                disabled={loading}
              />
              {errors.username && (
                <span className="mt-1.5 text-sm text-red-500 block">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-600 mb-2">
                Senha
              </label>
              <input
                id="admin-password"
                type="password"
                {...register('password')}
                className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl text-base transition-all box-border ${
                  errors.password 
                    ? 'border-red-200/60 focus:border-red-400/80 focus:ring-2 focus:ring-red-100/50' 
                    : 'border-gray-200/60 focus:border-gray-400/80 focus:ring-2 focus:ring-gray-100/50'
                } focus:outline-none disabled:bg-gray-100/60 disabled:cursor-not-allowed placeholder:text-gray-500 text-gray-800`}
                placeholder="Digite sua senha"
                disabled={loading}
              />
              {errors.password && (
                <span className="mt-1.5 text-sm text-red-500 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3.5 mb-5 bg-red-50/60 backdrop-blur-sm border border-red-200/40 rounded-xl text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-3 justify-end mt-7">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-white/60 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] border border-gray-200/40"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="lukos-purple-button px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-200/40 active:translate-y-0 backdrop-blur-sm"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
    </>
  );
};

export default AdminPasswordModal;
