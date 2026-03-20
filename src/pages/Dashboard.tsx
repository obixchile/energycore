import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, TrendingUp, Users, CheckCircle, ArrowUpRight } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const ESTADO_LABELS: Record<string, string> = {
  revision_interna: 'En Revisión',
  enviado_cliente: 'Enviado',
  ganado: 'Ganado',
  perdido: 'Perdido',
};

const ESTADO_COLORS: Record<string, string> = {
  revision_interna: '#f59e0b',
  enviado_cliente: '#3b82f6',
  ganado: '#10b981',
  perdido: '#ef4444',
};

export default function Dashboard() {
  const { propuestas } = useApp();

  const stats = [
    { label: 'Total Propuestas', val: propuestas.length, icon: LayoutDashboard, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'En Revisión', val: propuestas.filter(p => p.estado === 'revision_interna').length, icon: TrendingUp, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Ganadas', val: propuestas.filter(p => p.estado === 'ganado').length, icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
    { label: 'Empresas', val: new Set(propuestas.map(p => p.clienteNombre)).size, icon: Users, color: '#6366f1', bg: '#eef2ff' },
  ];

  // Bar chart: monto por cliente
  const barData = propuestas.map(p => ({
    name: p.clienteNombre.split(' ').slice(0, 2).join(' '),
    monto: p.monto / 1_000_000,
  }));

  // Pie chart: propuestas por estado
  const estadoCounts: Record<string, number> = {};
  propuestas.forEach(p => {
    estadoCounts[p.estado] = (estadoCounts[p.estado] || 0) + 1;
  });
  const pieData = Object.entries(estadoCounts).map(([estado, count]) => ({
    name: ESTADO_LABELS[estado] || estado,
    value: count,
    color: ESTADO_COLORS[estado] || '#94a3b8',
  }));

  const totalMonto = propuestas.reduce((s, p) => s + p.monto, 0);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', fontFamily: "'Roboto', sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>EnergyCore Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: 16, margin: 0 }}>Bienvenido al núcleo inteligente del suministro energético</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 36 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: 16,
            padding: '24px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <s.icon size={22} color={s.color} />
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>{s.val}</span>
            <span style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>

        {/* Bar Chart: Montos por propuesta */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#0f172a' }}>Montos por Propuesta</h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94a3b8' }}>En millones de pesos (CLP)</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10b981', fontSize: 13, fontWeight: 600 }}>
              <ArrowUpRight size={16} />
              <span>Total: ${(totalMonto / 1_000_000).toFixed(1)}M</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                formatter={(v: number) => [`$${v.toFixed(1)}M`, 'Monto']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Bar dataKey="monto" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Estado de propuestas */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#0f172a' }}>Estado de Propuestas</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94a3b8' }}>Distribución por estado actual</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, name: string) => [v, name]}
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: '#64748b' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent proposals table */}
      <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#0f172a' }}>Propuestas Recientes</h3>
          <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>Ver todas</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8', fontWeight: 500, fontSize: 12 }}>Cliente</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8', fontWeight: 500, fontSize: 12 }}>Estado</th>
                <th style={{ textAlign: 'right', padding: '8px 12px', color: '#94a3b8', fontWeight: 500, fontSize: 12 }}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {propuestas.slice(0, 5).map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 12px', color: '#0f172a', fontWeight: 500 }}>{p.clienteNombre}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{
                      background: (ESTADO_COLORS[p.estado] || '#94a3b8') + '20',
                      color: ESTADO_COLORS[p.estado] || '#94a3b8',
                      borderRadius: 20,
                      padding: '3px 10px',
                      fontSize: 12,
                      fontWeight: 500,
                    }}>
                      {ESTADO_LABELS[p.estado] || p.estado}
                    </span>
                  </td>
                  <td style={{ padding: '12px 12px', textAlign: 'right', color: '#0f172a', fontWeight: 600 }}>${p.monto.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
