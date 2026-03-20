import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Users, Zap, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

const ENEL_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Enel_Logo.svg/1024px-Enel_Logo.svg.png';
const NAV = [
  { key: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { key: '/nueva-propuesta', label: 'Nueva Propuesta', Icon: FilePlus },
  { key: '/clientes', label: 'Clientes', Icon: Users },
  { key: '/energia', label: 'Energía', Icon: Zap },
  { key: '/reportes', label: 'Reportes', Icon: BarChart3 },
  { key: '/configuracion', label: 'Configuración', Icon: Settings },
];

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg md:hidden">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <aside className={`${open ? 'w-72' : 'w-0 md:w-20'} bg-[#0d1b2a] text-white flex flex-col transition-all duration-300 min-h-screen overflow-hidden border-r border-white/5 font-['Roboto',sans-serif]`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <img src={ENEL_LOGO} alt="Enel" style={{ height: 24 }} />
            {open && <div><p className="font-bold text-lg tracking-tight">EnergyCore</p><p className="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Intelligent Core</p></div>}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {NAV.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => navigate(key)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all ${location.pathname === key ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={20} />
              {open && <span className="font-medium">{label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium">
            <LogOut size={20} />
            {open && 'Cerrar Sesión'}
          </button>
        </div>
      </aside>
    </>
  );
}