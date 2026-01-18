import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Shield, Bell, Lock, Eye, EyeOff, Edit2, Save, X } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
  onUpdateUser?: (user: UserType) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: 'antonio.silva@email.com',
    phone: '+245 912 345 678',
    address: 'Bissau, Guiné-Bissau',
  });

  const handleSave = () => {
    if (onUpdateUser) {
      onUpdateUser({ ...user, name: formData.name });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: 'antonio.silva@email.com',
      phone: '+245 912 345 678',
      address: 'Bissau, Guiné-Bissau',
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meu Perfil</h1>
          <p className="text-slate-500">Gerencie suas informações pessoais e configurações</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-white rounded-xl transition-colors shadow-sm"
            style={{ backgroundColor: '#014C2E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#013a24'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#014C2E'}
          >
            <Edit2 size={18} />
            <span>Editar Perfil</span>
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Pessoais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card de Informações Pessoais */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <User size={22} className="text-emerald-600" />
                Informações Pessoais
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-slate-900">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  E-mail
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-slate-900">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-slate-900">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Endereço
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-slate-900">{formData.address}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
                  >
                    <Save size={18} />
                    Salvar Alterações
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-slate-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                  >
                    <X size={18} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Card de Informações da Conta */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
              <CreditCard size={22} className="text-emerald-600" />
              Informações da Conta
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número da Conta</label>
                <div className="flex items-center gap-2">
                  <p className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-slate-900 font-mono">{user.accountNumber}</p>
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Eye size={18} className="text-slate-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Conta</label>
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-slate-900">{user.accountType}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Número do Cartão</label>
                <div className="flex items-center gap-2">
                  <p className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-slate-900 font-mono">
                    {user.cardNumber.match(/.{1,4}/g)?.join(' ') || user.cardNumber}
                  </p>
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Eye size={18} className="text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Configurações e Estatísticas */}
        <div className="space-y-6">
          {/* Foto de Perfil */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{user.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{user.accountType}</p>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl transition-colors text-sm font-semibold">
                Alterar Foto
              </button>
            </div>
          </div>

          {/* Configurações de Segurança */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Shield size={20} className="text-emerald-600" />
              Segurança
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <span className="text-sm font-semibold text-slate-700">Alterar PIN</span>
                <Lock size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <span className="text-sm font-semibold text-slate-700">Autenticação 2FA</span>
                <Shield size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Bell size={20} className="text-emerald-600" />
              Notificações
            </h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">Transações</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">Promoções</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">Alertas de Segurança</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

