import React,{useState}from'react';
import{USUARIOS_DEMO}from'../data/mockData';
import{Zap,Info}from'lucide-react';
export default function Login({onLogin}:{onLogin:(u:{nombre:string;email:string;rol:string})=>void}){
  const[email,setEmail]=useState('');
  const[pw,setPw]=useState('');
  const[err,setErr]=useState('');
  const handle=(e:React.FormEvent)=>{
    e.preventDefault();
    const u=USUARIOS_DEMO.find(x=>x.email===email&&x.password===pw);
    if(u)onLogin({nombre:u.nombre,email:u.email,rol:u.rol});
    else setErr('Credenciales incorrectas');
  };
  return(
    <div className="min-h-screen flex items-center justify-center" style={{background:'linear-gradient(135deg,#0d1b2a 0%,#1e3a5f 100%)'}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-light mb-4">enel</h1>
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><Zap size={16} className="text-white"/></div>
              <span className="text-white font-bold text-xl">SIMUPRO</span>
            </div>
            <p className="text-blue-300 text-sm">Sistema de Gestión y Cotización de Suministro Eléctrico</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold mb-1">Iniciar Sesión</h2>
          <p className="text-gray-500 text-sm mb-4">Ingresa tus credenciales para acceder al sistema</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex gap-2">
            <Info size={16} className="text-blue-500 mt-0.5 shrink-0"/>
            <div className="text-xs text-blue-700"><strong>Modo Demo</strong><br/>Email: demo@enel.com<br/>Password: enel2026</div>
          </div>
          <form onSubmit={handle} className="space-y-3">
            <div><label className="text-sm font-medium text-gray-700">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="demo@enel.com"/></div>
            <div><label className="text-sm font-medium text-gray-700">Contraseña</label><input value={pw} onChange={e=>setPw(e.target.value)} type="password" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
            {err&&<p className="text-red-500 text-sm">{err}</p>}
            <button type="submit" className="w-full py-3 rounded-lg text-white font-medium" style={{background:'linear-gradient(135deg,#3b82f6,#06b6d4)"}}>Ingresar al Sistema →</button>
          </form>
        </div>
      </div>
    </div>
  );
}