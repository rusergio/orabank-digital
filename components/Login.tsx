
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import OrabankLogo from './OrabankLogo';

interface LoginProps {
  onLogin: (cardNumber: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(cardNumber);
  };

  const formatCard = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#014C2E' }}>
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <OrabankLogo size={64} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Orabank Digital</h2>
          <p className="text-slate-500 mt-2">Bem-vindo de volta ao seu banco</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Número do Cartão</label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCard(e.target.value))}
              maxLength={19}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">PIN de Acesso</label>
            <input
              type="password"
              placeholder="••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-center tracking-widest"
              maxLength={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: '#014C2E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#013a24'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#014C2E'}
          >
            Aceder à Conta
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Não tem acesso digital? 
            <Link to="/register" className="font-bold ml-1 hover:underline" style={{ color: '#014C2E' }}>Registar Cartão</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
