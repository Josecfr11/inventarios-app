export interface VentasList {
  id: number,
  numero_factura: string,
  fecha: string,
  total: number,
  estado: string,
  tipo_pago: string
}

export interface TiposPago {
  id: number,
  tipoPago: string
}

export interface EstatusVenta {
  id: number,
  estatus: string
}

export const ventasList: VentasList[] = [
  { id: 1, numero_factura: 'FAC-001', fecha: '2024-03-01', total: 150.50, estado: 'Pagado', tipo_pago: 'Tarjeta' },
  { id: 2, numero_factura: 'FAC-002', fecha: '2024-03-01', total: 45.00, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 3, numero_factura: 'FAC-003', fecha: '2024-03-02', total: 890.20, estado: 'Pendiente', tipo_pago: 'Transferencia' },
  { id: 4, numero_factura: 'FAC-004', fecha: '2024-03-02', total: 12.75, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 5, numero_factura: 'FAC-005', fecha: '2024-03-03', total: 320.00, estado: 'Cancelado', tipo_pago: 'Tarjeta' },
  { id: 6, numero_factura: 'FAC-006', fecha: '2024-03-03', total: 55.60, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 7, numero_factura: 'FAC-007', fecha: '2024-03-04', total: 1200.00, estado: 'Pagado', tipo_pago: 'Transferencia' },
  { id: 8, numero_factura: 'FAC-008', fecha: '2024-03-04', total: 85.30, estado: 'Pendiente', tipo_pago: 'Tarjeta' },
  { id: 9, numero_factura: 'FAC-009', fecha: '2024-03-05', total: 210.00, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 10, numero_factura: 'FAC-010', fecha: '2024-03-05', total: 450.75, estado: 'Pagado', tipo_pago: 'Tarjeta' },
  { id: 11, numero_factura: 'FAC-011', fecha: '2024-03-06', total: 30.25, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 12, numero_factura: 'FAC-012', fecha: '2024-03-06', total: 95.00, estado: 'Cancelado', tipo_pago: 'Efectivo' },
  { id: 13, numero_factura: 'FAC-013', fecha: '2024-03-07', total: 15.80, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 14, numero_factura: 'FAC-014', fecha: '2024-03-07', total: 2300.50, estado: 'Pendiente', tipo_pago: 'Transferencia' },
  { id: 15, numero_factura: 'FAC-015', fecha: '2024-03-08', total: 67.40, estado: 'Pagado', tipo_pago: 'Tarjeta' },
  { id: 16, numero_factura: 'FAC-016', fecha: '2024-03-08', total: 110.00, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 17, numero_factura: 'FAC-017', fecha: '2024-03-09', total: 42.10, estado: 'Pagado', tipo_pago: 'Tarjeta' },
  { id: 18, numero_factura: 'FAC-018', fecha: '2024-03-09', total: 8.50, estado: 'Pagado', tipo_pago: 'Efectivo' },
  { id: 19, numero_factura: 'FAC-019', fecha: '2024-03-10', total: 520.00, estado: 'Pagado', tipo_pago: 'Transferencia' },
  { id: 20, numero_factura: 'FAC-020', fecha: '2024-03-10', total: 135.25, estado: 'Pendiente', tipo_pago: 'Tarjeta' },
];


export const tiposPagoList: TiposPago[] = [
  {
    id: 1,
    tipoPago: 'Efectivo'
  },
  {
    id: 2,
    tipoPago: 'Tarjeta'
  },
  {
    id: 3,
    tipoPago: 'Transferencia'
  },
]

export const estatusList: EstatusVenta[] = [
  {
    id: 1,
    estatus: 'Pendiente'
  },
  {
    id: 2,
    estatus: 'Pagado'
  },
  {
    id: 3,
    estatus: 'Cancelado'
  },
]
