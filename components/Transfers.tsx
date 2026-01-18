
import React, { useState } from 'react';
import { SendHorizontal, Search, User, CreditCard, AlertCircle, CheckCircle2, Globe, Smartphone, Building2 } from 'lucide-react';
import { User as UserType, Transaction } from '../types';

interface TransfersProps {
  user: UserType;
  onTransfer: (t: Transaction) => void;
}

type TransferMethod = 'IBAN' | 'Orange Money' | 'Western Union';

const Transfers: React.FC<TransfersProps> = ({ user, onTransfer }) => {
  const [transferMethod, setTransferMethod] = useState<TransferMethod>('IBAN');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate transfer process
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'Saída',
        category: `Transferência ${transferMethod}`,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        description: description || `Envio para ${recipient} via ${transferMethod}`,
        receiver: recipient,
        transferMethod: transferMethod
      };
      onTransfer(newTransaction);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setAmount('');
      setRecipient('');
      setDescription('');
    }, 2000);
  };

  const getMethodIcon = (method: TransferMethod) => {
    switch (method) {
      case 'IBAN':
        return <Globe size={20} />;
      case 'Orange Money':
        return <Smartphone size={20} />;
      case 'Western Union':
        return <Building2 size={20} />;
    }
  };

  const getMethodPlaceholder = (method: TransferMethod) => {
    switch (method) {
      case 'IBAN':
        return 'AO06 0001...';
      case 'Orange Money':
        return '923 456 789';
      case 'Western Union':
        return 'Número MTCN ou Nome do destinatário';
    }
  };

  const getMethodLabel = (method: TransferMethod) => {
    switch (method) {
      case 'IBAN':
        return 'IBAN ou Número de Cartão';
      case 'Orange Money':
        return 'Número de Telefone Orange Money';
      case 'Western Union':
        return 'Destinatário';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Transferências</h1>
        <p className="text-slate-500">Envie dinheiro de forma rápida e segura para qualquer conta Orabank ou externa.</p>
      </header>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 animate-in zoom-in duration-300">
          <CheckCircle2 className="text-emerald-500" />
          <p className="font-semibold">Transferência realizada com sucesso!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">Enviar por</label>
              <div className="grid grid-cols-3 gap-3">
                {(['IBAN', 'Orange Money', 'Western Union'] as TransferMethod[]).map((method) => {
                  const getMethodColors = (m: TransferMethod, isActive: boolean) => {
                    if (m === 'IBAN') {
                      return isActive 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-gray-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50';
                    } else if (m === 'Orange Money') {
                      return isActive 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50/50';
                    } else { // Western Union
                      return isActive 
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700' 
                        : 'border-gray-200 bg-white text-slate-600 hover:border-yellow-200 hover:bg-yellow-50/50';
                    }
                  };
                  
                  const getIconColor = (m: TransferMethod, isActive: boolean) => {
                    if (m === 'IBAN') {
                      return isActive ? 'text-emerald-600' : 'text-slate-400';
                    } else if (m === 'Orange Money') {
                      return isActive ? 'text-orange-600' : 'text-slate-400';
                    } else { // Western Union
                      return isActive ? 'text-yellow-600' : 'text-slate-400';
                    }
                  };
                  
                  const isActive = transferMethod === method;
                  
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setTransferMethod(method)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${getMethodColors(method, isActive)}`}
                    >
                      <div className={getIconColor(method, isActive)}>
                        {getMethodIcon(method)}
                      </div>
                      <span className="text-xs font-semibold text-center">{method}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700">Valor da Transferência</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full text-4xl font-bold bg-gray-50 border-none rounded-2xl p-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-200"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="100"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">FCFA</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <AlertCircle size={14} />
                Saldo disponível: {user.balance.toLocaleString()} FCFA
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">{getMethodLabel(transferMethod)}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {transferMethod === 'IBAN' ? <Search size={18} /> : transferMethod === 'Orange Money' ? <Smartphone size={18} /> : <User size={18} />}
                </span>
                <input
                  type={transferMethod === 'Orange Money' ? 'tel' : 'text'}
                  placeholder={getMethodPlaceholder(transferMethod)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
              {transferMethod === 'Orange Money' && (
                <p className="text-xs text-slate-400">Formato: 9XX XXX XXX</p>
              )}
              {transferMethod === 'Western Union' && (
                <p className="text-xs text-slate-400">Insira o nome completo do destinatário ou código MTCN</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Motivo (Opcional)</label>
              <textarea
                placeholder="Ex: Pagamento de renda"
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !amount || !recipient}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-white shadow-lg'
              }`}
              style={!loading ? { backgroundColor: '#014C2E' } : {}}
              onMouseEnter={!loading ? (e) => e.currentTarget.style.backgroundColor = '#013a24' : undefined}
              onMouseLeave={!loading ? (e) => e.currentTarget.style.backgroundColor = '#014C2E' : undefined}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                </>
              ) : (
                <>
                  <SendHorizontal size={20} />
                  Confirmar Envio
                </>
              )}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <User size={18} />
                Contatos Frequentes
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Maria Fernandes', initials: 'MF', iban: '...5678' },
                { name: 'João Carlos', initials: 'JC', iban: '...1234' },
                { name: 'Carlos Luanda', initials: 'CL', iban: '...9988' }
              ].map((contact, i) => (
                <button key={i} onClick={() => setRecipient(contact.iban)} className="flex items-center justify-between w-full p-3 rounded-2xl bg-white hover:border-emerald-500 border border-transparent transition-all group">
                   <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                            {contact.initials}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-slate-900">{contact.name}</p>
                            <p className="text-xs text-slate-500">IBAN {contact.iban}</p>
                        </div>
                   </div>
                   <SendHorizontal size={14} className="text-slate-300 group-hover:text-emerald-500" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard size={18} />
                Cartões Guardados
            </h3>
            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-slate-400">
                <p className="text-xs text-center">Nenhum cartão externo vinculado ainda.</p>
                <button className="mt-2 text-xs font-bold text-emerald-600">Adicionar Novo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
