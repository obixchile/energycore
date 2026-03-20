import React, { useState } from 'react';
import { USUARIOS_DEMO } from '../data/mockData';
import { Zap, TrendingUp, Info } from 'lucide-react';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';

const NOVEDADES = [
  { title: 'Nueva Sección $ Energía', desc: 'Gestión centralizada de precios base con mapa interactivo', icon: Zap, color: '#10b981', bg: '#ecfdf5', date: 'Marzo 2026' },
  { title: 'Gráficos de GWh Mejorados', desc: 'Dashboard con análisis visual de energía ofertada y adjudicada', icon: TrendingUp, color: '#3b82f6', bg: '#eff6ff', date: 'Marzo 2026' },
  { title: 'Gestión de Versiones de Propuestas', desc: 'Edita propuestas y crea nuevas versiones manteniendo el historial', icon: Info, color: '#8b5cf6', bg: '#f3e8ff', date: 'Marzo 2026' },
];

interface Props { onLogin: (u: { nombre: string; email: string; rol: string }) => void }

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const u = USUARIOS_DEMO.find(x => x.email === email && x.password === pw);
    if (u) onLogin({ nombre: u.nombre, email: u.email, rol: u.rol });
    else setErr('Credenciales incorrectas');
  };

  return (<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', fontFamily: "'Roboto', sans-serif", padding: '3rem 1.5rem' }}>
    <div style={{ width: '100%', maxWidth: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <img src={ENEL_LOGO} alt="Enel" style={{ height: 80, filter: 'brightness(0) invert(1)' }} />
      <div style={{ width: '100%', background: 'rgba(59,130,246,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={28} color="white" /></div>
          <h1 style={{ color: 'white', fontSize: 32, fontWeight: 700, margin: 0 }}>EnergyCore</h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: 0 }}>El núcleo inteligente del suministro energético</p>
      </div>
      <div style={{ width: '100%', background: 'white', borderRadius: 20, padding: '2.5rem 2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', textAlign: 'center', margin: '0 0 0.5rem' }}>Iniciar Sesión</h2>
        <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 2rem' }}>Ingresa tus credenciales para acceder al sistema</p>
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} placeholder="demo@enel.com" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 6 }}>Contraseña</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} placeholder="••••••••" required />
          </div>
          {err && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626' }}>{err}</div>}
          <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>Ingresar al Sistema</button>
        </form>
        <p style={{ fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>¿Problemas para acceder? <a href="mailto:soporte@energycore.cl" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Contactar soporte</a></p>
      </div>
      <div style={{ width: '100%', background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
          <Zap size={24} color="#f59e0b" />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>Novedades del Sistema</h3>
        </div>
        <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 1.5rem' }}>Últimas actualizaciones y mejoras</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {NOVEDADES.map((item, i) => (<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '1rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <item.icon size={20} color={item.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 12 }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: 0 }}>{item.title}</h4>
                <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>{item.date}</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  </div>);
}
