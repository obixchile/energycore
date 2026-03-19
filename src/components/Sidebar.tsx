import React,{useState}from'react';
import{LayoutDashboard,FilePlus,Users,Zap,BarChart3,Settings,LogOut,Menu,X}from'lucide-react';
const NAV=[{key:'dashboard',label:'Dashboard',Icon:LayoutDashboard},{key:'nueva-propuesta',label:'Nueva Propuesta',Icon:FilePlus},{key:'clientes',label:'Clientes',Icon:Users},{key:'energia',label:'Energía',Icon:Zap},{key:'reportes',label:'Reportes',Icon:BarChart3},{key:'configuracion',label:'Configuración',Icon:Settings}];
export default function Sidebar({current,onNavigate,onLogout}:{current:string;onNavigate:(p:string)=>void;onLogout:()=>void}){
  const[open,setOpen]=useState(true);
  return(<>
    <button onClick={()=>setOpen(!open)} className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg md:hidden">{open?<X size={18}/>:<Menu size={18}/>}</button>
    <aside className={`${open?'w-64':'w-0 md:w-16'} sidebar-gradient text-white flex flex-col transition-all duration-300 min-h-screen overflow-hidden`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-lg font-bold">E</div>
          {open&&<div><p className="font-bold text-lg">SIMUPRO</p><p className="text-xs text-gray-400">Gestión Eléctrica</p></div>}
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({key,label,Icon})=>(
          <button key={key} onClick={()=>onNavigate(key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${current===key?'bg-gradient-to-r from-blue-500 to-cyan-500 text-white':'text-gray-300 hover:bg-gray-700'}`}>
            <Icon size={18}/>{open&&label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-700">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 text-sm"><LogOut size={18}/>{open&&'Cerrar Sesión'}</button>
      </div>
    </aside>
  </>);
}