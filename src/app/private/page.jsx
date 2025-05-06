'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});


const ToolCard = ({ router }) => (
  <div
    style={{ backgroundImage: 'url(/bgFerramenta.png)' }}
    className="bg-cover w-72 h-40 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 text-[#fff] text-[2rem] text-center font-bold leading-[2rem] flex justify-center items-center text-shadow-2xs text-shadow-black cursor-pointer"
    onClick={() => router.push('/ferramentaUm')}
  >
    Ponto de Equilibrio
  </div>
);

const ToolCard2 = () => (
  <div className="bg-[#000] w-72 h-40 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 text-[#fff] text-[2rem] text-center font-bold leading-[2rem] flex justify-center items-center text-shadow-2xs text-shadow-black cursor-pointer">Novidade</div>
);

const Page = () => {
  const router = useRouter();

  return (
    <div className={poppins.className}>
      <div className="bg-[#f4f4f5] w-full min-h-screen flex flex-col items-center py-10 px-4">
        {/* Logo */}
        <div className="mb-6">
          <Image src="/logo.svg" width={120} height={120} alt="Logo" />
        </div>

        {/* Título */}
        <h2 className="text-xl font-light text-gray-800 mb-8 text-center">
          Veja abaixo as nossas ferramentas disponíveis:
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard router={router} />
          <ToolCard2 />
          <ToolCard2 />
        </div>
      </div>
    </div>
  );
};

export default Page;
