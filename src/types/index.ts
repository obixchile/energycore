export type PropuestaEstado='revision_interna'|'enviado_cliente'|'ganado'|'perdido';
export type UserRole='super_admin'|'administrador'|'estandar'|'solo_lectura';
export interface Cliente{id:string;razonSocial:string;rut:string;email:string;telefono:string;direccion:string;estado:'Potencial'|'Activo'|'Inactivo';}
export interface Sucursal{id:string;nombre:string;direccion:string;precioBase:number;potencia:number;costoActualAnual:number;puntoConexion:string;subestacion:string;}
export interface Propuesta{id:number;clienteId:string;clienteNombre:string;estado:PropuestaEstado;monto:number;contrato:number;gwh:number;fechaCreacion:string;sucursales:Sucursal[];autogeneracion:boolean;anosContrato:number;serviciosExtras:string[];}
export interface PrecioBase{id:string;troncal:string;subestacion:string;region:string;precioUSD:number;propuestas:number;ultimaActualizacion:string;}
export interface Usuario{id:string;nombre:string;email:string;rol:UserRole;activo:boolean;}
export interface TicketSalesforce{id:string;codigo:string;titulo:string;cliente:string;prioridad:'high'|'medium'|'low';progreso:number;totalPasos:number;responsable:string;monto:number;comentarios:number;migrado:boolean;fechaMigracion?:string;}