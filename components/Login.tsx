import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Dumbbell } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin') {
      onLogin();
    } else {
      setError('Credenciales inválidas. Pruebe admin/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-brand-600">
          <Dumbbell className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Gimnasio Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingreso exclusivo para administradores
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <div className="mt-1">
                <input
                  id="user"
                  name="user"
                  type="text"
                  autoComplete="username"
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <Button type="submit" className="w-full" size="lg">
                Ingresar
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Demo
                </span>
              </div>
            </div>
            <div className="mt-2 text-center text-xs text-gray-400">
              User: admin / Pass: admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
