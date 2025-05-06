'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(stored);
  }, []);

  const handleAdminLogin = () => {
    if (adminUser === 'admin' && adminPass === 'admin1234') {
      setLoggedIn(true);
    } else {
      alert('Acesso negado.');
    }
  };

  const generateCredentials = () => {
    const newUser = 'user_' + Math.floor(Math.random() * 10000);
    const newPass = Math.random().toString(36).slice(-8);
    const newCredential = { user: newUser, password: newPass };
    const updatedUsers = [...users, newCredential];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff]">
        <div className='flex flex-col items-center'>
          <Image src="/logo.svg" width={200} height={200} alt="Logo" className="mb-4" />
          <div className="bg-[#e3e3e3] rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login Admin</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-700 rounded-md text-[#000]"
                placeholder="Digite seu usuário"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-700 rounded-md text-[#000]"
                placeholder="Digite sua senha"
              />
            </div>
            <button
              onClick={handleAdminLogin}
              className="w-full bg-[#000] text-white py-2 rounded-md hover:bg-[#161616]"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff]">
      <div className="bg-[#e3e3e3] rounded-xl shadow-lg p-8 w-full max-w-md text-gray-900">
        <h1 className="text-2xl font-semibold text-center mb-6">Gerador de Credenciais</h1>

        <button
          onClick={generateCredentials}
          className="w-full bg-[#000] text-white py-2 rounded-md hover:bg-[#161616] transition-colors mb-6"
        >
          Gerar Nova Credencial
        </button>

        <div className="space-y-3 max-h-72 overflow-y-auto">
          {users.map((cred, index) => (
            <div key={index} className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm">
              <div>
                <p className="text-sm"><strong>Usuário:</strong> {cred.user}</p>
                <p className="text-sm"><strong>Senha:</strong> {cred.password}</p>
              </div>
              <button onClick={() => deleteUser(index)} className="text-red-600 hover:text-red-800">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
