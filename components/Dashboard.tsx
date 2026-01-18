
import React from 'react';
import { User, Transaction } from '../types';
import { Wallet, TrendingUp, TrendingDown, Clock, ChevronRight, PlusCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AIAssistant from './AIAssistant';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions }) => {
  const chartData = [
    { name: 'Seg', balance: 140000 },
    { name: 'Ter', balance: 142000 },
    { name: 'Qua', balance: 138000 },
    { name: 'Qui', balance: 145000 },
    { name: 'Sex', balance: 154500 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Olá, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-500">Acompanhe sua vida financeira hoje.</p>
        </div>
        <div className="flex gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2.5 text-white rounded-xl transition-colors shadow-sm"
              style={{ backgroundColor: '#014C2E' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#013a24'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#014C2E'}
            >
                <PlusCircle size={18} />
                <span>Depositar</span>
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group" style={{ backgroundColor: '#014C2E' }}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Wallet size={120} />
            </div>
            <div className="relative z-10">
                <p className="text-emerald-100 text-sm font-medium mb-1">Saldo Disponível</p>
                <h2 className="text-3xl font-bold mb-6">{user.balance.toLocaleString('pt-AO')} FCFA</h2>
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>IBAN da Conta</p>
                        <p className="font-mono text-xs">{user.accountNumber.substring(0, 10)}...</p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                        Visa Débito
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} />
                </div>
                <div>
                    <p className="text-slate-500 text-sm">Entradas (Mês)</p>
                    <p className="text-xl font-bold text-slate-900">+85.000 FCFA</p>
                </div>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[65%]"></div>
            </div>
        </div>
 
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                    <TrendingDown size={20} />
                </div>
                <div>
                    <p className="text-slate-500 text-sm">Saídas (Mês)</p>
                    <p className="text-xl font-bold text-slate-900">-25.000 FCFA</p>
                </div>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[30%]"></div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Evolução do Saldo</h3>
                <select className="bg-gray-50 border-none rounded-lg text-sm font-medium px-3 py-1.5 outline-none text-slate-600">
                    <option>Últimos 7 dias</option>
                    <option>Este mês</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => [`${value.toLocaleString()} FCFA`, 'Saldo']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="#059669" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorBalance)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Recentes</h3>
                <button className="text-sm font-bold hover:underline flex items-center gap-1" style={{ color: '#014C2E' }}>
                    Ver tudo
                    <ChevronRight size={14} />
                </button>
            </div>
            <div className="space-y-4 flex-1">
                {transactions.slice(0, 5).map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                t.type === 'Entrada' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{t.description}</p>
                                <p className="text-xs text-slate-500">{t.category}</p>
                            </div>
                        </div>
                        <p className={`text-sm font-bold ${t.type === 'Entrada' ? 'text-blue-600' : 'text-slate-900'}`}>
                            {t.type === 'Entrada' ? '+' : '-'}{t.amount.toLocaleString()} FCFA
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <AIAssistant user={user} transactions={transactions} />
    </div>
  );
};

export default Dashboard;
