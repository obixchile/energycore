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

      <aside className={`${open ? 'w-72' : 'w-0 md:w-20'} bg-[#0d1b2a] text-white flex flex-col transition-all duration-300 min-h-screen overflow-hidden border-r border-white/5 font-['Roboto',sans-serif]`}>

        {/* Header con logo Enel */}
        <div className="px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={ENEL_LOGO}
              alt="Enel Chile"
              style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          {open && (
            <div className="mt-3">
              <p className="text-white font-bold text-base leading-tight">EnergyCore</p>
              <p className="text-gray-400 text-xs leading-snug mt-0.5">El n\u00facleo inteligente del suministro energ\u00e9tico</p>
            </div>
          )}
        </div>

        {/* Nav links */}
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

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-3">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {open && <span>Cerrar Sesi\u00f3n</span>}
          </button>

          {open && (
            <div className="flex justify-center pt-1">
              <a
                href="https://www.obix.cl/"
                target="_blank"
                rel="noopener noreferrer"
                title="Desarrollado por Obix"
              >
                <img
                  src={OBIX_LOGO}
                  alt="Obix"
                  style={{ height: 18, width: 'auto', opacity: 0.5, filter: 'brightness(0) invert(1)' }}
                  onMouseOver={e => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '0.5')}
                />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
