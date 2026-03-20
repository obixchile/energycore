import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Users, Zap, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';
const OBIX_LOGO = 'https://www.obix.cl/wp-content/uploads/2021/08/logo-obix.png';

const NAV = [
  { key: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { key: '/nueva-propuesta', label: 'Nueva Propuesta', Icon: FilePlus },
  { key: '/clientes', label: 'Clientes', Icon: Users },
  { key: '/energia', label: 'Energ\u00eda', Icon: Zap },
  { key: '/reportes', label: 'Reportes', Icon: BarChart3 },
  { key: '/configuracion', label: 'Configuraci\u00f3n', Icon: Settings },
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

      <aside className={`${open ? 'w-72' : 'w-0 md:w-20'} bg-[#0d1b2a] text-white flex flex-col transition-all duration-300 min-h-screen overflow-hidden border-r border-white/5`}>
        <div className="px-4 py-5 border-b border-white/10">
          <img src={ENEL_LOGO} alt="Enel Chile" className="h-9 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          {open && (
            <div className="mt-3">
              <p className="text-white font-bold text-sm">EnergyCore</p>
              <p className="text-gray-400 text-xs mt-0.5">El n\u00facleo inteligente del suministro energ\u00e9tico</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all ${
                location.pathname === key
                  ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-900/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {open && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {open && <span>Cerrar Sesi\u00f3n</span>}
          </button>
          {open && (
            <div className="flex justify-center mt-3">
              <a href="https://www.obix.cl/" target="_blank" rel="noopener noreferrer">
                <img src={OBIX_LOGO} alt="Obix" className="h-4 w-auto opacity-40 hover:opacity-100 transition-opacity" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
