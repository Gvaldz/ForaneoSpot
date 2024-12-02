import { Component } from '@angular/core';
import {Product} from '../product.model';

@Component({
  selector: 'app-guia-list',
  templateUrl: './guia-list.component.html',
  styleUrl: './guia-list.component.css'
})
export class GuiaListComponent {

  products: Product[] = [
    {
      id: 1,
      title: "Introducción",
      description: "Bienvenido a ForaneoSpot, una aplicación web diseñada para foráneos, arrendadores y vendedores locales. Aquí puedes encontrar cuartos, pedir comida, agendar citas y mucho más."
    },
    {
      id: 2,
      title: "Requisitos del Sistema",
      description: "Requisitos mínimos: navegador web compatible (Google Chrome, Firefox, Edge) y conexión a internet. Recomendado: navegador actualizado y conexión estable."
    },
    {
      id: 3,
      title: "Instalación y Acceso",
      description: "Accede desde tu navegador favorito ingresando a ForaneoSpot.xyz. Regístrate o inicia sesión para empezar."
    },
    {
      id: 4,
      title: "Registro de Usuario",
      description: "Haz clic en 'Registrarse', llena los campos con datos correctos, verifica y crea tu cuenta. Si no deseas registrarte, haz clic en 'Cancelar'."
    },
    {
      id: 5,
      title: "Navegación por la Plataforma (Foráneo)",
      description: "Inicia sesión desde la página principal, busca cuartos disponibles, agenda visitas, o explora comidas publicadas por vendedores locales."
    },
    {
      id: 6,
      title: "Comidas",
      description: "Explora los platillos recientes en la página principal. Ordena comida especificando tus preferencias en una modal de pedido."
    },
    {
      id: 7,
      title: "Buscar Cuartos",
      description: "Selecciona 'Alojamiento' para ver las opciones disponibles. Consulta detalles del cuarto seleccionado y agenda visitas fácilmente."
    },
    {
      id: 8,
      title: "Perfil",
      description: "Edita tus datos personales o elimina tu cuenta desde la sección de perfil."
    },
    {
      id: 9,
      title: "Funciones para Vendedores",
      description: "Sube platillos con nombre, precio, descripción y fotos. Administra tus productos y recibe calificaciones por parte de los usuarios."
    },
    {
      id: 10,
      title: "Navegación por la Plataforma (Arrendador)",
      description: "Accede a tu cuenta, agrega inmuebles (edificio, casa o unidad), y especifica los servicios disponibles."
    },
    {
      id: 11,
      title: "Preguntas Frecuentes",
      description: "¿Puedo usar ForaneoSpot sin registrarme? No, es necesario crear una cuenta para poder acceder a las funciones principales de la aplicación. ¿Cómo puedo editar o eliminar un inmueble que ya subí? Dirígete a tu perfil, selecciona el inmueble que deseas editar o eliminar, y utiliza las opciones disponibles para hacer cambios. ¿Qué pasa si mi conexión a internet se pierde mientras estoy usando la aplicación? ForaneoSpot guardará tu progreso hasta el último punto sincronizado. Al reconectarte, podrás continuar desde donde te quedaste. ¿Cómo se califica a los arrendadores y vendedores? Los usuarios pueden dejar una calificación y un comentario después de rentar un cuarto o comprar comida, ayudando a otros a conocer la calidad del servicio. ¿Qué métodos de pago se aceptan al ordenar comida? Actualmente aceptamos pagos en efectivo al recibir el pedido o mediante transferencias bancarias según las opciones del vendedor."
    }
  ];

  searchTerm: string = '';

  // Método para filtrar productos
  get filteredProducts(): Product[] {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    return this.products.filter(product =>
      product.title.toLowerCase().includes(lowerSearchTerm) ||
      product.description.toLowerCase().includes(lowerSearchTerm)
    );
  }


}
