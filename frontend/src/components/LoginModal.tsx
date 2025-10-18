import React from 'react';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2D2D38] text-white p-8 rounded-lg shadow-2xl text-center w-[min(92vw,440px)]">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="mb-6">Please log in to continue to the weather dashboard.</p>
        <button 
          className="bg-purple-500 w-full text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-600 transition-colors"
          onClick={onClose}
        >
          Login (Proceed for now)
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
