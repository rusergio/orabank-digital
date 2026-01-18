
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Transfers from './components/Transfers';
import Cards from './components/Cards';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import { User, AuthState, Transaction, Card } from './types';

const MOCK_USER: User = {
  id: '1',
  name: 'António Silva',
  cardNumber: '4532 8901 2345 6789',
  balance: 154500.50,
  accountType: 'Corrente',
  accountNumber: 'AO06 0001 0000 1234 5678 9012 3'
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'Saída', category: 'Alimentação', amount: 4500, date: '2023-10-25', description: 'Supermercado Kero' },
  { id: '2', type: 'Entrada', category: 'Salário', amount: 85000, date: '2023-10-24', description: 'Pagamento Mensal' },
  { id: '3', type: 'Saída', category: 'Lazer', amount: 12000, date: '2023-10-22', description: 'Jantar Restaurante' },
  { id: '4', type: 'Saída', category: 'Serviços', amount: 8500, date: '2023-10-20', description: 'Pagamento Unitel' },
];

const MOCK_CARDS: Card[] = [
  {
    id: '1',
    cardNumber: '4532 8901 2345 6789',
    cardHolder: 'ANTÓNIO SILVA',
    expiryDate: '12/26',
    cvv: '123',
    type: 'Débito',
    brand: 'Visa',
    balance: 154500.50,
    isActive: true,
    accountNumber: 'AO06 0001 0000 1234 5678 9012 3',
    bank: 'Orabank'
  },
  {
    id: '2',
    cardNumber: '5555 1234 5678 9012',
    cardHolder: 'ANTÓNIO SILVA',
    expiryDate: '08/27',
    cvv: '456',
    type: 'Crédito',
    brand: 'Mastercard',
    balance: 250000.00,
    isActive: false,
    accountNumber: 'AO06 0001 0000 1234 5678 9012 3',
    bank: 'Ecobank'
  },
  {
    id: '3',
    cardNumber: '4111 1111 1111 1111',
    cardHolder: 'ANTÓNIO SILVA',
    expiryDate: '03/25',
    cvv: '789',
    type: 'Débito',
    brand: 'Visa',
    balance: 75000.00,
    isActive: false,
    accountNumber: 'AO06 0001 0000 1234 5678 9012 3',
    bank: 'Bao'
  }
];

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [cards, setCards] = useState<Card[]>(MOCK_CARDS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const login = (cardNumber: string) => {
    // Demo logic: login works with any valid-looking card
    if (cardNumber.length >= 16) {
      setAuth({ isAuthenticated: true, user: { ...MOCK_USER, cardNumber } });
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  const addTransaction = (t: Transaction) => {
    setTransactions([t, ...transactions]);
    if (auth.user) {
        const newBalance = t.type === 'Entrada' ? auth.user.balance + t.amount : auth.user.balance - t.amount;
        setAuth({ ...auth, user: { ...auth.user, balance: newBalance } });
    }
  };

  const setActiveCard = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isActive: card.id === cardId
    })));
    const activeCard = cards.find(c => c.id === cardId);
    if (activeCard && auth.user) {
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          cardNumber: activeCard.cardNumber,
          balance: activeCard.balance
        }
      });
    }
  };

  const handleAddCard = () => {
    // Placeholder para agregar nueva tarjeta
    alert('Funcionalidade de adicionar cartão será implementada em breve.');
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {auth.isAuthenticated && (
          <Sidebar 
            user={auth.user!} 
            onLogout={logout}
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}
        
        <main className={`flex-1 transition-all duration-300 ${auth.isAuthenticated ? (sidebarCollapsed ? 'md:ml-16' : 'md:ml-64') : ''}`}>
          <Routes>
            <Route 
              path="/login" 
              element={!auth.isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/register" 
              element={!auth.isAuthenticated ? <Register onRegister={login} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={auth.isAuthenticated ? <Dashboard user={auth.user!} transactions={transactions} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/transfers" 
              element={auth.isAuthenticated ? <Transfers user={auth.user!} onTransfer={addTransaction} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/cards" 
              element={auth.isAuthenticated ? <Cards user={auth.user!} cards={cards} onSetActiveCard={setActiveCard} onAddCard={handleAddCard} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={auth.isAuthenticated ? <Profile user={auth.user!} onUpdateUser={(updatedUser) => setAuth({ ...auth, user: updatedUser })} /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
