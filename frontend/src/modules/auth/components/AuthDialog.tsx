'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/src/shared/components/dialog';

import { Button } from '@/src/shared/components/button';
import { useAuth } from '../provider/AuthProvider';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from '@/src/shared/components/popover';

export default function AuthDialog() {
  const { user, login, register, logout } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = () => {
    if (mode === 'login') {
      login.mutate(
        {
          email: form.email,
          password: form.password,
        },
        {
          onSuccess: () => setOpen(false),
        },
      );
    } else {
      register.mutate(
        {
          email: form.email,
          password: form.password,
          name: form.name,
        },
        {
          onSuccess: () => setMode('login'),
        },
      );
    }
  };

  if (user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-neutral-900 hover:bg-neutral-800 text-white">
            {user.name || 'Cuenta'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="bg-neutral-900 border border-neutral-800 text-white">
          <PopoverHeader>
            <PopoverTitle>{user.name || 'Usuario'}</PopoverTitle>
            <PopoverDescription className="text-neutral-400">
              {user.email}
            </PopoverDescription>
          </PopoverHeader>

          <div className="flex flex-col gap-2 mt-3">
            {user.role === 'ADMIN' && (
              <button
                onClick={() => router.push('/admin')}
                className="text-left px-3 py-2 rounded-md hover:bg-neutral-800 transition text-sm text-blue-400"
              >
                Ir al panel de administrador
              </button>
            )}

            <button
              onClick={() => {
                setTimeout(() => {
                  logout.mutate();
                }, 50);
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-neutral-800 transition text-sm text-red-400"
            >
              Cerrar sesión
            </button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Iniciar sesión</Button>
      </DialogTrigger>

      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Bienvenido de nuevo' : 'Crear cuenta'}
          </DialogTitle>

          <DialogDescription>
            {mode === 'login'
              ? 'Accede para continuar'
              : 'Regístrate para comprar'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {mode === 'register' && (
            <input
              placeholder="Nombre"
              className="p-2 bg-neutral-800 rounded-md text-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            placeholder="Email"
            className="p-2 bg-neutral-800 rounded-md text-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 bg-neutral-800 rounded-md text-white"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {(login.isError || register.isError) && (
            <span className="text-red-500 text-sm">Algo salió mal...</span>
          )}

          <Button
            onClick={handleSubmit}
            disabled={login.isPending || register.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {login.isPending || register.isPending
              ? 'Cargando...'
              : mode === 'login'
                ? 'Iniciar sesión'
                : 'Registrarse'}
          </Button>

          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-neutral-400 hover:text-white"
          >
            {mode === 'login'
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
