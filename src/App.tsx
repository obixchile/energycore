import React,{useState}from'react';
import{AppProvider,useApp}from'./context/AppContext';
import Login from'./pages/Login';
import Dashboard from'./pages/Dashboard';
import NuevaPropuesta from'./pages/NuevaPropuesta';
import Clientes from'./pages/Clientes';
import Energia from'./pages/Energia';
import Reportes from'./pages/Reportes';
import Configuracion from'./pages/Configuracion';
import Sidebar from'./components/Sidebar';
type Page='dashboard'|'nueva-propuesta'|'clientes'|'energia'|'reportes'|'configuracion';
function AppInner(){
  const{user,setUser}=useApp();
  const[page,setPage]=useState<Page>('dashboard');
  if(!user)return<Login onLogin={setUser}/>;
  const pages:Record<Page,React.ReactNode>={dashboard:<Dashboard/>,"nueva-propuesta":<NuevaPropuesta/>,clientes:<Clientes/>,energia:<Energia/>,reportes:<Reportes/>,configuracion:<Configuracion/>};
  return(<div className="flex h-screen bg-gray-100 overflow-hidden"><Sidebar current={page} onNavigate={(p)=>setPage(p as Page)} onLogout={()=>setUser(null)}/><main className="flex-1 overflow-y-auto p-6">{pages[page]}</main></div>);
}
export default function App(){return<AppProvider><AppInner/></AppProvider>}