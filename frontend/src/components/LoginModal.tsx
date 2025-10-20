import React from 'react';
import Link from 'next/link';

const LoginModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2D2D38] text-white p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-6 text-gray-300">You must log in to view the weather dashboard.</p>
        <Link
          href="/api/auth/login"
          className="block bg-purple-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-600 transition-colors"
        >
          Login with Auth0
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
