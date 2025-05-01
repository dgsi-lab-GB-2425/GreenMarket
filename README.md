# 🌱 GreenMarket - Plataforma de Gestión de Productos Agrícolas

**GreenMarket** es una aplicación web desarrollada con **React** que permite a los usuarios gestionar pedidos, rastrear la trazabilidad de productos agrícolas y visualizar rutas logísticas en un mapa interactivo. Incluye un sistema de autenticación simulado (login/registro), protección de rutas, y un diseño moderno y responsivo. Este proyecto es ideal para aprender sobre el manejo de estado en React y enrutamiento.

---

## 📋 Características Principales

- **Gestión de Pedidos**:
  - Crear, editar y eliminar pedidos (solo si están en estado "Pendiente").
  - Buscador interactivo para seleccionar productos con imágenes, nombres y cantidades.
  - Estados de pedidos (`Pendiente`, `Enviado`, `Entregado`).

- **Trazabilidad de Productos**:
  - Lista de productos con su origen, fecha y certificación.
  - Imágenes de productos integradas desde URLs externas.

- **Logística y Mapa**:
  - Mapa interactivo con **Leaflet** que muestra rutas de distribución desde Madrid a diferentes ciudades.
  - Popups con imágenes de productos (50x50 px) y nombres en cada destino.

- **Feedback**:
  - Formulario para enviar feedback sobre productos, con un desplegable que incluye todos los productos de trazabilidad.

- **Autenticación Simulada**:
  - Registro e inicio de sesión con almacenamiento en el estado global (sin backend real).
  - Protección de rutas: solo usuarios autenticados pueden acceder a ciertas páginas.

- **Diseño Responsivo**:
  - Estilizado con CSS puro, con un diseño limpio y moderno.
  - Uso de variables CSS para colores y espaciado consistente.

---

## 📂 Estructura del Proyecto

src/
├── components/              # Componentes reutilizables
│   ├── FeedbackForm.jsx     # Formulario de feedback
│   ├── MapaRutas.jsx        # Mapa interactivo con rutas logísticas
│   ├── Navbar.jsx           # Barra de navegación
│   ├── PedidoForm.jsx       # Formulario para crear/editar pedidos
│   ├── PedidoList.jsx       # Lista de pedidos
│   ├── ProtectedRoute.jsx   # Componente para proteger rutas
│   └── TrazabilidadView.jsx # Vista de trazabilidad de productos
├── context/                 # Contexto para manejo de estado global
│   └── DataContext.jsx      # Contexto y proveedor de datos
├── mocks/                   # Datos simulados
│   └── data.js              # Datos de pedidos y trazabilidad
├── pages/                   # Páginas de la aplicación
│   ├── Home.jsx             # Página principal
│   ├── Login.jsx            # Página de inicio de sesión
│   ├── Logistica.jsx        # Página de logística
│   ├── Pedidos.jsx          # Página de pedidos
│   ├── Register.jsx         # Página de registro
│   └── Trazabilidad.jsx     # Página de trazabilidad
├── App.jsx                  # Componente raíz y enrutamiento
└── index.css                # Estilos globales

📝 **Futuras Mejoras**  
✔ Añadir persistencia de usuarios  
✔ Mostrar cantidades en pedidos  
✔ Mejorar validación de formularios  
✔ Agregar filtrado y paginación  
✔ Implementar backend con Node.js/MongoDB  

🌟 **¡Gracias por usar GreenMarket!** 🌟  
