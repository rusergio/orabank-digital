
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, SendHorizontal, CreditCard, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { User as UserType } from '../types';
import OrabankLogo from './OrabankLogo';

interface SidebarProps {
  user: UserType;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Transferências', icon: SendHorizontal, path: '/transfers' },
    { name: 'Meus Cartões', icon: CreditCard, path: '/cards' },
    { name: 'Perfil', icon: User, path: '/profile' },
  ];

  return (
    <div className={`hidden md:flex flex-col bg-white border-r border-gray-200 h-screen fixed left-0 top-0 shadow-sm z-50 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`p-6 transition-all duration-300 ${isCollapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 mb-4 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
          <OrabankLogo size={isCollapsed ? 32 : 40} />
          <h1 
            className={`text-2xl font-bold tracking-tight transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}
            style={{ color: '#014C2E' }}
          >
            Orabank
          </h1>
        </div>

        <div className="relative mb-4">
          <div className="h-px bg-gray-200"></div>
          <button
            onClick={onToggle}
            className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${isCollapsed ? 'right-2' : ''}`}
            style={{ backgroundColor: '#014C2E' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#013a24'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#014C2E'}
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group ${
                  isCollapsed ? 'px-2 justify-center' : 'px-4'
                } ${isActive ? 'font-semibold' : 'text-slate-600 hover:bg-gray-100'}`}
                style={isActive ? { backgroundColor: 'rgba(1, 76, 46, 0.1)', color: '#014C2E' } : {}}
                title={isCollapsed ? item.name : ''}
              >
                <Icon size={20} />
                <span className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={`mt-auto border-t border-gray-100 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-6'}`}>
        <div className={`flex items-center gap-3 mb-6 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0" style={{ backgroundColor: 'rgba(1, 76, 46, 0.1)', color: '#014C2E' }}>
            {user.name.charAt(0)}
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.accountType}</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 ${
            isCollapsed ? 'px-2 justify-center' : 'px-4'
          }`}
          title={isCollapsed ? 'Sair' : ''}
        >
          <LogOut size={20} />
          <span className={`font-medium transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Sair
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
