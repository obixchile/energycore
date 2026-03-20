export type PropuestaEstado = 'revision_interna' | 'enviado_cliente' | 'ganado' | 'perdido';
export type UserRole = 'super_admin' | 'administrador' | 'estandar' | 'solo_lectura';

export interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  precioBase: number;
  potencia: number;
  costoActual: number;
  troncal: string;
  subestacion: string;
}

export interface Propuesta {
  id: number;
  clienteNombre: string;
  clienteRut: string;
  clienteEmail: string;
  clienteTel: string;
  clienteDireccion: string;
  estado: PropuestaEstado;
  monto: number;
  gwh: number;
  aniosContrato: number;
  fechaCreacion: string;
  sucursales: Sucursal[];
  serviciosExtras: string[];
  autogeneracion: boolean;
}

export interface Cliente {
  id: string;
  razonSocial: string;
  rut: string;
  email: string;
  telefono: string;
  direccion: string;
  estado: 'Potencial' | 'Activo' | 'Inactivo';
}

export interface PrecioBase {
  id: string;
  troncal: string;
  subestacion: string;
  region: string;
  precioUSD: number;
  propuestas: number;
  ultimaActualizacion: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  activo: boolean;
}

export interface TicketSalesforce {
  id: string;
  codigo: string;
  titulo: string;
  cliente: string;
  prioridad: 'high' | 'medium' | 'low';
  progreso: number;
  totalPasos: number;
  responsable: string;
  monto: number;
  comentarios: number;
  migrado: boolean;
  fechaMigracion?: string;
}