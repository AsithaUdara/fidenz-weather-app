import React from 'react';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';

const LoginModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-[#2D2D38] to-[#25252F] text-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 border border-white/10">
        <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaLock className="text-purple-400 text-2xl" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
        <p className="mb-8 text-gray-400 text-sm leading-relaxed">
          Please log in to access your personalized weather dashboard and view real-time weather data.
        </p>
        <Link
          href="/api/auth/login"
          className="block bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02]"
        >
          Login with Auth0
        </Link>
        <p className="mt-6 text-xs text-gray-500">
          Secured by Auth0 authentication
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
