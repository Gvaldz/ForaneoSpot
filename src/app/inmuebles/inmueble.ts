export interface Inmueble {
    ubicacion: string,
    renta: number,
    calificacion: number,
    codigo_postal: number,
    descripcion: string,
    nombre: string,
    idinmuebles: number,
    tipo_inmueble: string
}

export interface Edificio extends Inmueble {
    rentamax?: number,
    tipo: string,
    cantidad_unidades: number,
    unidades_disponibles: number
}

export interface Casa extends Inmueble {
    tipo: string
    cantidad_cuartos: number
    cuartos_disponibles: number    
}
  
export interface Unidad extends Inmueble {
    descripcion: string;
    tipo: string,
    ocupado: false
}
  