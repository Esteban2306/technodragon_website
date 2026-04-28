'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/src/shared/components/dialog';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from '@/src/shared/components/popover';

import { Button } from '@/src/shared/components/button';
import { useAuth } from '../provider/AuthProvider';
import { Input } from '@/src/shared/components/input';
import { UserCheck, Eye, EyeOff, CircleUserRound, ShieldCheck, LogOut } from 'lucide-react';

export default function AuthDialog() {
  const { user, login, register, logout } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const validations = useMemo(() => {
    return {
      email: form.email.includes('@'),
      password: form.password.length >= 8,
      confirmPassword:
        mode === 'register'
          ? form.password === form.confirmPassword &&
            form.confirmPassword.length > 0
          : true,
      name: mode === 'register' ? form.name.length >= 3 : true,
    };
  }, [form, mode]);

  const isFormValid =
    validations.email &&
    validations.password &&
    validations.confirmPassword &&
    validations.name;

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (mode === 'login') {
      login.mutate(
        {
          email: form.email,
          password: form.password,
        },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      register.mutate(
        {
          email: form.email,
          password: form.password,
          name: form.name,
        },
        { onSuccess: () => setMode('login') },
      );
    }
  };

  if (user) {
    const isAdmin = user.role === 'ADMIN';

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="
            flex items-center gap-2
            px-3 py-2 rounded-xl
            bg-green-900/30 hover:bg-green-700/50
            border border-green-500/30
            text-green-400
            transition-all cursor-pointer
            shadow-[0_0_10px_rgba(34,197,94,0.3)]
            hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]
          "
          >
            <UserCheck className="w-5 h-5" />

            <span className="text-sm font-medium">
              {user.name || 'Conectado'}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent className="bg-[#0B0B0F] border border-white/10 text-white">
          <PopoverHeader>
            <PopoverTitle>{user.name || 'Usuario'}</PopoverTitle>

            <PopoverDescription>{user.email}</PopoverDescription>
          </PopoverHeader>

          <div className="flex flex-col gap-1 mt-2">
            {isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="
                flex items-center gap-2
                px-3 py-2 rounded-md
                hover:bg-white/10 cursor-pointer
                transition text-sm text-blue-400
              "
              >
                <ShieldCheck className="w-4 h-4" />
                Panel Admin
              </button>
            )}

            <button
              onClick={() => logout.mutate()}
              className="
              flex items-center gap-2
              px-3 py-2 rounded-md
              hover:bg-white/10 cursor-pointer
              transition text-sm text-red-400
            "
            >
              <LogOut className="w-4 h-4" />
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
        <Button className="bg-neutral-900 hover:bg-neutral-800 text-white py-5 cursor-pointer">
          <CircleUserRound className="text-red-700 size-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 border-none bg-transparent shadow-none">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-100 h-100 bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative bg-[#0B0B0F] border border-white/10 rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-xl text-white">
              {mode === 'login' ? 'Bienvenido de nuevo' : 'Crear cuenta'}
            </DialogTitle>

            <DialogDescription className="text-neutral-400 text-sm">
              {mode === 'login'
                ? 'Accede para continuar'
                : 'Únete y empieza a comprar'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {mode === 'register' && (
              <Input
                placeholder="Nombre completo"
                value={form.name}
                isValid={validations.name}
                isError={!validations.name && form.name.length > 0}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            )}

            <Input
              placeholder="Correo electrónico"
              value={form.email}
              isValid={validations.email}
              isError={!validations.email && form.email.length > 0}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña (mínimo 8 caracteres)"
                value={form.password}
                isValid={validations.password}
                isError={!validations.password && form.password.length > 0}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {mode === 'register' && (
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  value={form.confirmPassword}
                  isValid={validations.confirmPassword}
                  isError={
                    !validations.confirmPassword &&
                    form.confirmPassword.length > 0
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {(login.isError || register.isError) && (
              <span className="text-red-500 text-sm text-center">
                Algo salió mal. Intenta nuevamente.
              </span>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || login.isPending || register.isPending}
              className="mt-2 h-11 rounded-xl bg-white text-black hover:bg-neutral-200 transition"
            >
              {login.isPending || register.isPending
                ? 'Cargando...'
                : mode === 'login'
                  ? 'Iniciar sesión'
                  : 'Crear cuenta'}
            </Button>

            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-neutral-400 hover:text-white cursor-pointer text-center mt-2"
            >
              {mode === 'login'
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
