import React, { useState } from 'react';
import { Eye, EyeOff, Plus, Check, MoreVertical, Copy, Trash2 } from 'lucide-react';
import { User as UserType, Card } from '../types';

interface CardsProps {
  user: UserType;
  cards: Card[];
  onSetActiveCard: (cardId: string) => void;
  onAddCard: () => void;
}

const Cards: React.FC<CardsProps> = ({ user, cards, onSetActiveCard, onAddCard }) => {
  const [showBalance, setShowBalance] = useState<{ [key: string]: boolean }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const toggleBalanceVisibility = (cardId: string) => {
    setShowBalance(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  };

  const getBankLogo = (bank: string) => {
    switch (bank) {
      case 'Orabank':
        return '/img/oranbak-bissau.jpg';
      case 'Ecobank':
        return '/img/ecobank-logo.jpg';
      case 'Bao':
        return '/img/bao-logo.png';
      default:
        return '/img/oranbak-bissau.jpg';
    }
  };

  const getBankColor = (bank: string) => {
    switch (bank) {
      case 'Orabank':
        return '#014C2E';
      case 'Ecobank':
        return '#005083';
      case 'Bao':
        return '#15B112';
      default:
        return '#014C2E';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meus Cartões</h1>
          <p className="text-slate-500">Gerencie seus cartões e consulte saldos</p>
        </div>
        <button
          onClick={onAddCard}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Adicionar Cartão</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative transition-all duration-300"
            style={{
              width: '340px',
              height: '214px',
              ...(card.isActive ? { 
                outline: '4px solid rgba(1, 76, 46, 0.3)',
                outlineOffset: '8px'
              } : {})
            }}
          >
            <div
              className="relative w-full h-full rounded-2xl p-5 text-white shadow-xl overflow-hidden"
              style={{ backgroundColor: getBankColor(card.bank) }}
            >
              {/* Logo del banco */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center">
                <img
                  src={getBankLogo(card.bank)}
                  alt={card.bank}
                  className="h-12 w-auto max-w-36 object-contain"
                  onError={(e) => {
                    console.error('Error loading image:', getBankLogo(card.bank));
                  }}
                />
              </div>

              {card.isActive && (
                <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{ color: '#014C2E' }}>
                  <Check size={10} />
                  Ativo
                </div>
              )}

              {/* Nombre del banco */}
              <div className="mt-8 mb-4">
                <p className="text-xs opacity-75 mb-1">{card.bank}</p>
                <p className="text-lg font-bold">{card.type}</p>
              </div>

              {/* Número de tarjeta */}
              <div className="mb-4">
                <p className="text-xl font-bold tracking-wider font-mono">
                  {formatCardNumber(card.cardNumber)}
                </p>
              </div>

              {/* Información inferior */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs opacity-75 mb-1">Titular</p>
                    <p className="text-sm font-semibold">{card.cardHolder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75 mb-1">Válido até</p>
                    <p className="text-sm font-semibold">{card.expiryDate}</p>
                  </div>
                </div>

                {/* Saldo */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div>
                    <p className="text-xs opacity-75 mb-1">Saldo</p>
                    <p className="text-base font-bold">
                      {showBalance[card.id] 
                        ? `${card.balance.toLocaleString()} FCFA`
                        : '•••••• FCFA'
                      }
                    </p>
                  </div>
                  <button
                    onClick={() => toggleBalanceVisibility(card.id)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label={showBalance[card.id] ? 'Ocultar saldo' : 'Mostrar saldo'}
                  >
                    {showBalance[card.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Menú de opciones */}
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {selectedCard === card.id && (
                <div className="absolute top-12 left-4 bg-white text-slate-900 rounded-xl shadow-2xl p-2 min-w-[150px] z-10">
                  {!card.isActive && (
                    <button
                      onClick={() => {
                        onSetActiveCard(card.id);
                        setSelectedCard(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm"
                    >
                      <Check size={14} />
                      Usar Este
                    </button>
                  )}
                  <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm">
                    <Copy size={14} />
                    Copiar Número
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-red-600">
                    <Trash2 size={14} />
                    Remover
                  </button>
                </div>
              )}

              {!card.isActive && (
                <button
                  onClick={() => onSetActiveCard(card.id)}
                  className="absolute bottom-5 right-5 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-semibold transition-colors"
                >
                  Usar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(1, 76, 46, 0.1)' }}>
            <Plus size={40} style={{ color: '#014C2E' }} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum cartão cadastrado</h3>
          <p className="text-slate-500 mb-6">Adicione seu primeiro cartão para começar</p>
          <button
            onClick={onAddCard}
            className="px-6 py-3 text-white rounded-xl transition-colors font-semibold flex items-center gap-2"
            style={{ backgroundColor: '#014C2E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#013a24'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#014C2E'}
          >
            <Plus size={18} />
            Adicionar Cartão
          </button>
        </div>
      )}
    </div>
  );
};

export default Cards;
