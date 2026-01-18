
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import OrabankLogo from './OrabankLogo';

interface RegisterProps {
  onRegister: (cardNumber: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState('');

  const formatCard = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onRegister(cardNumber);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-xl border border-gray-100">
        <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Voltar para login
        </Link>

        <div className="flex justify-center mb-8">
          <OrabankLogo size={56} />
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
            <div className="h-[2px] w-12 bg-gray-100"></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            {step === 1 ? 'Valide seu Cartão' : 'Defina sua Senha'}
          </h2>
          <p className="text-slate-500 mt-2">
            {step === 1 
              ? 'Insira o número impresso na frente do seu cartão Orabank.' 
              : 'Quase lá! Agora defina seu PIN de acesso multicaixa.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número do Cartão</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <CreditCard size={20} />
                  </span>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-lg font-medium tracking-wider"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    maxLength={19}
                    required
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 italic">O registo requer apenas o número do seu cartão Orabank ativo.</p>
            </div>
          ) : (
            <div className="space-y-4">
               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Novo PIN de 4 dígitos</label>
                <input
                  type="password"
                  placeholder="••••"
                  className="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-center text-2xl tracking-[1em]"
                  maxLength={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirme o PIN</label>
                <input
                  type="password"
                  placeholder="••••"
                  className="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-center text-2xl tracking-[1em]"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
          >
            {step === 1 ? 'Validar Cartão' : 'Finalizar Registo'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex gap-3 items-start">
            <CheckCircle2 size={20} className="text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-800 leading-relaxed">
                Ao prosseguir, você concorda com os termos de adesão aos serviços bancários digitais do Orabank. Suas informações estão seguras e criptografadas.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
