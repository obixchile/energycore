import React,{createContext,useContext,useState}from 'react';
export interface Propuesta{
id:number;clienteNombre:string;clienteRut:string;clienteEmail:string;clienteTel:string;
estado:'revision_interna'|'enviado_cliente'|'ganado'|'perdido';
monto:number;gwh:number;aniosContrato:number;fechaCreacion:string;
sucursales:any[];serviciosExtras:string[];
}
export interface AppUser{nombre:string;email:string;rol:string;}
interface Ctx{
user:AppUser|null;setUser:(u:AppUser|null)=>void;
propuestas:Propuesta[];setPropuestas:(p:Propuesta[])=>void;
addPropuesta:(p:Propuesta)=>void;
}
const AppContext=createContext<Ctx>({} as Ctx);
export function AppProvider({children}:{children:React.ReactNode}){
const[user,setUser]=useState<AppUser|null>(null);
const[propuestas,setPropuestas]=useState<Propuesta[]>([
{id:1,clienteNombre:'Empresa Demo S.A.',clienteRut:'76.123.456-7',clienteEmail:'contacto@empresademos.a..cl',clienteTel:'+56 2 2345 6789',estado:'enviado_cliente',monto:15000000,gwh:12.5,aniosContrato:3,fechaCreacion:'14-01-2026',sucursales:[],serviciosExtras:[]},
{id:2,clienteNombre:'Comercial XYZ Ltda.',clienteRut:'77.987.654-3',clienteEmail:'contacto@comercialxyzltda..cl',clienteTel:'+56 2 2345 6789',estado:'revision_interna',monto:8500000,gwh:8.3,aniosContrato:2,fechaCreacion:'19-01-2026',sucursales:[],serviciosExtras:[]},
{id:3,clienteNombre:'Industrias ABC',clienteRut:'78.555.666-9',clienteEmail:'contacto@industriasabc.cl',clienteTel:'+56 2 2345 6789',estado:'revision_interna',monto:0,gwh:0,aniosContrato:1,fechaCreacion:'24-01-2026',sucursales:[],serviciosExtras:[]}
]);
const addPropuesta=(p:Propuesta)=>setPropuestas(prev=>[...prev,p]);
return <AppContext.Provider value={{user,setUser,propuestas,setPropuestas,addPropuesta}}>{children}</AppContext.Provider>;
}
export const useApp=()=>useContext(AppContext);
export const USUARIOS_DEMO=[{nombre:'Daniela Lopez',email:'demo@enel.com',password:'enel2026',rol:'comercial'},{nombre:'Admin SimuPro',email:'admin@simupro.cl',password:'admin2026',rol:'admin'}];