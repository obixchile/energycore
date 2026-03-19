import React, { useState } from 'react';
import { USUARIOS_DEMO } from '../data/mockData';

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0d1b2a,#1e3a5f)' }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ color: 'white', fontSize: 48, fontWeight: 300, margin: '0 0 16px' }}>enel</h1>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 16 }}>
            <p style={{ color: 'white', fontWeight: 700, fontSize: 20, margin: '0 0 4px' }}>SIMUPRO</p>
            <p style={{ color: '#93c5fd', fontSize: 13, margin: 0 }}>Sistema de Gestion de Suministro Electrico</p>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 20 }}>Iniciar Sesion</h2>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 16px' }}>Ingresa tus credenciales</p>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12 }}>
            <strong>Modo Demo</strong><br/>
            Email: demo@enel.com &nbsp;|&nbsp; Password: enel2026
          </div>
          <form onSubmit={handle}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type='email'
                style={{ width: '100%', marginTop: 4, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' }}
                placeholder='demo@enel.com' />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500 }}>Contrasena</label>
              <input value={pw} onChange={e => setPw(e.target.value)} type='password'
                style={{ width: '100%', marginTop: 4, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            {err && <p style={{ color: '#ef4444', fontSize: 12, margin: '0 0 8px' }}>{err}</p>}
            <button type='submit' style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              Ingresar al Sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}