'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'


export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const match = storedUsers.find(u => u.user === user && u.password === password);
    if (match) {
      router.push('/private');
    } else {
      alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff]">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
          className="mb-4"
        />
        <div className="bg-[#e3e3e3] rounded-xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[#000]"
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[#000]"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#000] text-white py-2 rounded-md hover:bg-[#161616] transition-colors"
          >
            Entrar
          </button>

          <button
            onClick={() => router.push('/admin')}
            className="mt-4 w-full text-sm text-gray-700 hover:underline text-center"
          >
            Área do Admin
          </button>
        </div>
      </div>
    </div>
  );
}
