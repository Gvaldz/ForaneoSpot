export interface UsuarioBase {
    id: number
    nombre: string;
    sexo: string;
    correo: string;
    telefono: string;
    contrasena: string;
    imagenes?: { id: number; file_path: string }[]; 
  }
  
  export interface Foraneo extends UsuarioBase {
    nacimiento: string;
  }
  
  export interface Vendedor extends UsuarioBase {
    ubicacion: string;
  }
  
  export interface Arrendador extends UsuarioBase {
    descripcion: string;
  }
  