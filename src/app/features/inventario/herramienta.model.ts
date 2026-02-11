export interface Herramienta {
  id?: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: 'DISPONIBLE' | 'EN_USO' | 'MANTENIMIENTO' | 'BAJA';
  stockActual: number;
  stockMinimo: number;
  valorUnitario: number;
}